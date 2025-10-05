import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core'
import { SelectionModel } from '@angular/cdk/collections'
import { OverlayModule } from '@angular/cdk/overlay'
import { toSignal } from '@angular/core/rxjs-interop'
import { from, map, Observable, of, switchMap } from 'rxjs'
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
  selectedOptionsModel = new SelectionModel<T>(this.control().multiple ?? true)
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
    } else {
      items.forEach(item => {
        if (this.compareWithFn(item, formControlValue)) {
          this.selectedOptionsModel.select(item)
        }
      })
    }
  }

  getItems(): Observable<T[]> {
    return this.parentForm.valueChanges.pipe(
      switchMap(() => {
        const control = this.control() as Control<T>
        const itemsFn = control.items

        if (!itemsFn) {
          return of([])
        }
        if (Array.isArray(itemsFn)) {
          return of(itemsFn)
        }

        const result = itemsFn(this.parentForm)

        if (result instanceof Promise) {
          return from(result)
        }
        if (result instanceof Observable) {
          return result
        }
        if (Array.isArray(result)) {
          return of(result)
        }

        return of([])
      })
    )
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

    const isMultiple = control.multiple !== false

    const values = items.map(item => {
      if (!control.itemValue) {
        return item
      }
      return (item as Record<string, unknown>)[control.itemValue]
    })

    if (isMultiple) {
      this.formControl.setValue(values, { emitEvent: false })
    } else {
      this.formControl.setValue(values.at(0) ?? null, { emitEvent: false })
    }
  }

  open() {
    this.isOpen.set(true)
  }

  close() {
    this.isOpen.set(false)
  }

  trackByFn(index: number, item: T): unknown {
    const ctrl = this.control() as Control<T>
    return ctrl.itemValue ? (item as Record<string, unknown>)[ctrl.itemValue] : index
  }

  toggleSelection(option: T) {
    this.selectedOptionsModel.toggle(option)
  }

  deselectOption(event: MouseEvent, option: T) {
    event.stopPropagation()
    this.selectedOptionsModel.deselect(option)
  }
}
