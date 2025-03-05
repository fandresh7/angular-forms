import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BaseInputComponent, controlDeps } from '../base-input/base-input.component'

@Component({
  selector: 'radio-field',
  imports: [...controlDeps],
  templateUrl: './radio-field.component.html',
  styleUrl: './radio-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioFieldComponent extends BaseInputComponent {
  override formControl = new FormControl(this.control().value, this.validatorFn)
}
