// autocomplete-field.component.ts
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl } from '@angular/forms'
import { OverlayModule } from '@angular/cdk/overlay'
import { from, of, Observable } from 'rxjs'
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
export class AutocompleteFieldComponent<T> extends BaseInputComponent {
  // A separate control for the query input.
  queryControl = new FormControl<string>('')

  // Signal to toggle the overlay open/close.
  isOpen = signal(false)

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

  open(): void {
    this.isOpen.set(true)
  }

  close(): void {
    this.isOpen.set(false)
  }
}
