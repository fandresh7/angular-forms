import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BaseInputComponent, controlProvider } from '../base-input/base-input.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { ValidatorMessageDirective } from '../../directives/validator-message.directive'

@Component({
  selector: 'input-field',
  imports: [ReactiveFormsModule, ValidatorMessageDirective],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class InputFieldComponent extends BaseInputComponent {
  formControl = new FormControl(this.control().value, this.validatorFn)

  createControl() {
    return this.formControl
  }
}
