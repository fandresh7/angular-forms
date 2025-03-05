import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms'
import { ControlResolver } from '../../services/control-resolver.service'

@Component({
  selector: 'array-field',
  imports: [...controlDeps],
  templateUrl: './array-field.component.html',
  styleUrl: './array-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class ArrayFieldComponent extends BaseInputComponent {
  controlResolver = inject(ControlResolver)
  fb = inject(NonNullableFormBuilder)

  override formControl = new FormArray<FormGroup>([], this.validatorFn)
  controls = computed(() => this.control().controls || [])

  createControl() {
    return this.formControl
  }

  removeItem(i: number) {
    this.formControl.removeAt(i)
  }

  addItem() {
    const group = this.fb.group({})
    this.formControl.push(group)
  }
}
