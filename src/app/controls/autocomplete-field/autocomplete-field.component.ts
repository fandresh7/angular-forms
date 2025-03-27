// autocomplete-field.component.ts
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core'
import { FormControl } from '@angular/forms'
import { OverlayModule } from '@angular/cdk/overlay'
import { from, of, Observable, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators'

import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'
import { Control } from '../../interfaces/forms.interfaces'

@Component({
  selector: 'autocomplete-field',
  standalone: true,
  imports: [...controlDeps, OverlayModule],
  templateUrl: './autocomplete-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class AutocompleteFieldComponent<T> extends BaseInputComponent implements OnInit, OnDestroy {
  // A separate control for the query input.
  queryControl = new FormControl<string>('')

  isOpen = signal(false)
  private dependencySubscriptions: Subscription[] = []

  // suggestions$ emits an array of options based on the current query.
  suggestions$: Observable<T[]> = this.queryControl.valueChanges.pipe(
    startWith(this.queryControl.value),
    debounceTime(300),
    map(query => query || ''),
    distinctUntilChanged(),
    switchMap((query: string) => {
      const ctrl = this.control()
      if (!ctrl.autocompleteOptions) return of([])

      const result = ctrl.autocompleteOptions(this.parentForm, query)

      if (result instanceof Observable) return result
      if (result instanceof Promise) return from(result)
      if (Array.isArray(result)) return of(result)

      return of([])
    })
  )

  displayWithFn(item: T): string {
    const control = this.control() as Control<T>

    if (control.itemLabel) {
      const label = (item as Record<string, unknown>)[control.itemLabel]
      return label != null ? String(label) : ''
    } else {
      return String(item)
    }
  }

  selectOption(option: T): void {
    const ctrl = this.control() as Control<T>
    const valueToStore = ctrl.itemValue ? (option as Record<string, unknown>)[ctrl.itemValue] : option

    this.formControl.setValue(valueToStore)
    this.queryControl.setValue(this.displayWithFn(option))

    this.close()
  }

  isSelected(option: T): boolean {
    const ctrl = this.control() as Control<T>
    const value = this.formControl.value

    const optionValue = ctrl.itemValue ? (option as Record<string, unknown>)[ctrl.itemValue] : option

    if (Array.isArray(value)) return value.includes(optionValue)
    return value === optionValue
  }

  open(): void {
    this.isOpen.set(true)
  }

  close(): void {
    this.isOpen.set(false)
  }

  override ngOnInit(): void {
    this.initialize()

    // If the control configuration has a 'resetOnChange' array, subscribe to each dependency.
    const ctrl = this.control() as Control<T> & { resetOnChange?: string[] }
    if (ctrl.resetOnChange && Array.isArray(ctrl.resetOnChange)) {
      ctrl.resetOnChange.forEach(depName => {
        const depControl = this.parentForm.get(depName)
        if (depControl) {
          const sub = depControl.valueChanges.subscribe(() => {
            this.formControl.reset()
            this.queryControl.reset()
          })
          this.dependencySubscriptions.push(sub)
        }
      })
    }
  }

  override ngOnDestroy(): void {
    this.destroy()

    this.dependencySubscriptions.forEach(sub => sub.unsubscribe())
  }
}
