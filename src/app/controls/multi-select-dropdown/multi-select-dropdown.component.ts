import { ChangeDetectionStrategy, Component, signal, effect } from '@angular/core'
import { SelectionModel } from '@angular/cdk/collections'
import { OverlayModule } from '@angular/cdk/overlay'
import { toSignal } from '@angular/core/rxjs-interop'
import { from, map, Observable, of } from 'rxjs'
import { FormControl } from '@angular/forms'

import { BaseInputComponent, controlDeps } from '../base-input/base-input.component'
import { Control } from '../../interfaces/forms.interfaces'

@Component({
  selector: 'multi-select-dropdown',
  imports: [...controlDeps, OverlayModule],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'open()'
  }
})
export class MultiSelectDropdownComponent<T> extends BaseInputComponent {
  override formControl = new FormControl(Array.isArray(this.value()) ? this.value() : [], this.validatorFn)

  items = toSignal(this.getItems(), { initialValue: [] })

  isOpen = signal<boolean>(false)
  selectedOptionsModel = new SelectionModel<T>(true)
  displayOptions = toSignal(this.selectedOptionsModel.changed.pipe(map(() => this.selectedOptionsModel.selected)), { initialValue: [] })

  constructor() {
    super()

    effect(() => {
      this.setSelectedItems(this.items())
    })

    effect(() => {
      const selected = this.displayOptions()
      this.valueHasChanged(selected)
    })
  }

  setSelectedItems(items: T[]): void {
    const formControlValue = this.formControl.value
    this.selectedOptionsModel.clear()

    if (Array.isArray(formControlValue)) {
      items.forEach(item => {
        if (formControlValue.some((val: string) => this.compareWithFn(item, val))) {
          this.selectedOptionsModel.select(item)
        }
      })
    }
  }

  getItems(): Observable<T[]> {
    const control = this.control() as Control<T>
    const items = control.items

    if (!items) return of([])
    if (Array.isArray(items)) return of(items)

    if (items instanceof Promise) return from(items)
    if (items instanceof Observable) return items

    return of([])
  }

  displayWithFn(item: T) {
    const control = this.control() as Control<T>

    if (control.itemLabel) {
      return (item as Record<string, unknown>)[control.itemLabel]
    } else {
      return item as string
    }
  }

  compareWithFn(item: T, value: string) {
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

  open() {
    this.isOpen.set(true)
  }

  close() {
    this.isOpen.set(false)
  }

  toggleSelection(option: T) {
    this.selectedOptionsModel.toggle(option)
  }

  deselectOption(event: MouseEvent, option: T) {
    event.stopPropagation()
    this.selectedOptionsModel.deselect(option)
  }
}
