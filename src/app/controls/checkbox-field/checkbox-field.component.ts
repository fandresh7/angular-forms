import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { ValidatorMessageDirective } from '../../directives/validator-message.directive'

@Component({
  selector: 'checkbox-field',
  imports: [ReactiveFormsModule, ValidatorMessageDirective],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxFieldComponent extends BaseInputComponent {
  formControl = new FormControl(this.control().value || false, this.validatorFn)

  createControl() {
    return this.formControl
  }
}
