import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { FormArray, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'
import { ControlResolver } from '../../services/control-resolver.service'
import { ControlInjector } from '../../pipes/control-injector.pipe'

@Component({
  selector: 'array-field',
  imports: [ReactiveFormsModule, NgComponentOutlet, ControlInjector, AsyncPipe],
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
