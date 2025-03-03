import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { ValidatorMessageDirective } from '../../directives/validator-message.directive'

@Component({
  selector: 'select-field',
  imports: [ReactiveFormsModule, ValidatorMessageDirective],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent extends BaseInputComponent {
  formControl = new FormControl(this.control().value, this.validatorFn)

  options = computed(() => this.control().options ?? [])

  createControl() {
    return this.formControl
  }
}
