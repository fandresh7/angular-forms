import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms'

import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'
import { ControlResolver } from '../../services/control-resolver.service'
import { isArrayControl } from '../../interfaces/forms.interfaces'

@Component({
  selector: 'array-field',
  imports: [...controlDeps, AsyncPipe],
  templateUrl: './array-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class ArrayFieldComponent extends BaseInputComponent implements OnInit {
  controlResolver = inject(ControlResolver)
  fb = inject(NonNullableFormBuilder)

  override formControl = new FormArray<FormGroup>([], this.validatorFn)
  controls = computed(() => {
    const ctrl = this.control()
    return isArrayControl(ctrl) ? ctrl.controls : []
  })

  override ngOnInit(): void {
    this.initialize()

    const val = this.value()
    if (Array.isArray(val)) {
      val.forEach(() => {
        const group = this.fb.group({})
        this.formControl.push(group)
      })
    }
  }

  getControlValue(index: number) {
    const val = this.value()
    if (Array.isArray(val)) {
      return val[index] ?? null
    }
    return null
  }

  removeItem(i: number) {
    if (this.isDisabled()) {
      return
    }
    this.formControl.removeAt(i)
  }

  addItem() {
    if (this.isDisabled()) {
      return
    }

    const group = this.fb.group({})
    this.formControl.push(group)
  }
}
