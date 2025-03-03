import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { BaseInputComponent, controlDeps } from '../base-input/base-input.component'
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms'
import { ControlResolver } from '../../services/control-resolver.service'

@Component({
  selector: 'array-field',
  imports: [...controlDeps],
  templateUrl: './array-field.component.html',
  styleUrl: './array-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayFieldComponent extends BaseInputComponent {
  controlResolver = inject(ControlResolver)
  fb = inject(NonNullableFormBuilder)
  formArray = new FormArray<FormGroup>([], this.validatorFn)

  controls = computed(() => this.control().controls || [])

  createControl() {
    return this.formArray
  }

  removeItem(i: number) {
    this.formArray.removeAt(i)
  }

  addItem() {
    const group = this.fb.group({})
    this.formArray.push(group)
  }
}
