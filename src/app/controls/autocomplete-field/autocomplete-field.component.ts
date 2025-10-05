// autocomplete-field.component.ts
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormControl } from '@angular/forms'
import { OverlayModule } from '@angular/cdk/overlay'

import { from, Observable, of, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators'

import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'
import { AutocompleteControl } from '../../interfaces/forms.interfaces'

@Component({
  selector: 'autocomplete-field',
  imports: [...controlDeps, OverlayModule, AsyncPipe],
  templateUrl: './autocomplete-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class AutocompleteFieldComponent<T> extends BaseInputComponent implements OnInit, OnDestroy {
  // A separate control for the query input.
  queryControl = new FormControl<string>('')

  isOpen = signal(false)
  loading = signal(false)
  private dependencySubscriptions: Subscription[] = []

  // suggestions$ emits an array of options based on the current query.
  suggestions$: Observable<T[]> = this.queryControl.valueChanges.pipe(
    startWith(this.queryControl.value),
    debounceTime(300),
    map(query => query || ''),
    distinctUntilChanged(),
    switchMap((query: string) => {
      const ctrl = this.control()
      if (!ctrl.autocompleteOptions) {
        return of([]) as Observable<T[]>
      }

      const result = ctrl.autocompleteOptions(this.parentForm, query)

      if (result instanceof Promise) {
        return from(result) as Observable<T[]>
      }
      if (Array.isArray(result)) {
        return of(result) as Observable<T[]>
      }

      return of([]) as Observable<T[]>
    })
  )

  displayWithFn(item: T): string {
    const control = this.control() as AutocompleteControl<T>

    if (control.itemLabel) {
      const label = (item as Record<string, unknown>)[control.itemLabel]
      return label !== null && label !== undefined ? String(label) : ''
    } else {
      return String(item)
    }
  }

  selectOption(option: T): void {
    const ctrl = this.control() as AutocompleteControl<T>
    const valueToStore = ctrl.itemValue ? (option as Record<string, unknown>)[ctrl.itemValue] : option

    this.formControl.setValue(valueToStore)
    this.queryControl.setValue(this.displayWithFn(option))

    this.close()
  }

  isSelected(option: T): boolean {
    const ctrl = this.control() as AutocompleteControl<T>
    const value = this.formControl.value

    const optionValue = ctrl.itemValue ? (option as Record<string, unknown>)[ctrl.itemValue] : option

    if (Array.isArray(value)) {
      return value.includes(optionValue)
    }
    return value === optionValue
  }

  open(): void {
    this.isOpen.set(true)
  }

  close(): void {
    this.isOpen.set(false)
  }

  trackByFn(index: number, item: T): unknown {
    const ctrl = this.control() as AutocompleteControl<T>
    return ctrl.itemValue ? (item as Record<string, unknown>)[ctrl.itemValue] : index
  }

  override ngOnInit(): void {
    this.initialize()

    // If the control configuration has a 'resetOnChange' array, subscribe to each dependency.
    const ctrl = this.control() as AutocompleteControl<T>
    if (ctrl.resetOnChange && Array.isArray(ctrl.resetOnChange)) {
      ctrl.resetOnChange.forEach((depName: string) => {
        const depControl = this.parentForm.get(depName)
        if (depControl) {
          const sub = depControl.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
            this.formControl.reset()
            this.queryControl.reset()
          })
          this.dependencySubscriptions.push(sub)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy()

    this.dependencySubscriptions.forEach(sub => sub.unsubscribe())
  }
}
