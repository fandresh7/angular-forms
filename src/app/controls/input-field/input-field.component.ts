import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BaseInputComponent, controlDeps } from '../base-input/base-input.component'

@Component({
  selector: 'input-field',
  imports: [...controlDeps],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent extends BaseInputComponent {
  override formControl = new FormControl(this.control().value, this.validatorFn)
}
