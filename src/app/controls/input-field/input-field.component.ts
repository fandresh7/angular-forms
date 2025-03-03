import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'input-field',
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent extends BaseInputComponent {
  formControl = new FormControl(this.control().value, this.validatorFn)

  createControl() {
    return this.formControl
  }
}
