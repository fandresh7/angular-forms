import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SelectDropdownComponent } from '../../components/select-dropdown/select-dropdown.component'
import { BaseInputComponent } from '../base-input/base-input.component'
import { FormControl } from '@angular/forms'
import { Control } from '../../interfaces/forms.interfaces'
import { from, Observable, of } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'multi-select-dropdown',
  imports: [SelectDropdownComponent],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectDropdownComponent<T> extends BaseInputComponent {
  override formControl = new FormControl(Array.isArray(this.value()) ? this.value() : [], this.validatorFn)

  items = toSignal(this.getItems(), { initialValue: [] })

  getItems(): Observable<T[]> {
    const control = this.control() as Control<T>
    const items = control.items

    if (!items) return of([])
    if (Array.isArray(items)) return of(items)

    if (items instanceof Promise) return from(items)
    if (items instanceof Observable) return items

    return of([])
  }

  displayWithFn = (item: T) => {
    const control = this.control() as Control<T>

    if (control.itemLabel) {
      return (item as Record<string, unknown>)[control.itemLabel]
    } else {
      return item as string
    }
  }

  compareWithFn = (item: T, value: string) => {
    const control = this.control() as Control<T>

    if (control.itemValue) {
      const itemValue = (item as Record<string, unknown>)[control.itemValue]
      return itemValue === value
    } else {
      return (item as string) === value
    }
  }

  valueHasChanged(items: T[]) {
    const control = this.control() as Control<T>

    const values = items.map(item => {
      if (control.itemValue) {
        const itemValue = (item as Record<string, unknown>)[control.itemValue]
        return itemValue
      } else {
        return item
      }
    })

    this.formControl.setValue(values)
  }
}
