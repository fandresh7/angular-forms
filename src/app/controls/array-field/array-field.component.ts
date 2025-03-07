import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core'
import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms'
import { ControlResolver } from '../../services/control-resolver.service'

@Component({
  selector: 'array-field',
  imports: [...controlDeps],
  templateUrl: './array-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class ArrayFieldComponent extends BaseInputComponent implements OnInit {
  controlResolver = inject(ControlResolver)
  fb = inject(NonNullableFormBuilder)

  override formControl = new FormArray<FormGroup>([], this.validatorFn)
  controls = computed(() => this.control().controls || [])

  override ngOnInit(): void {
    this.initialize()

    if (Array.isArray(this.value())) {
      this.value().forEach(() => {
        const group = this.fb.group({})
        this.formControl.push(group)
      })
    }
  }

  getControlValue(index: number) {
    return this.value()?.[index] ?? null
  }

  removeItem(i: number) {
    if (this.checkDisabled()) return
    this.formControl.removeAt(i)
  }

  addItem() {
    if (this.checkDisabled()) return

    const group = this.fb.group({})
    this.formControl.push(group)
  }
}
