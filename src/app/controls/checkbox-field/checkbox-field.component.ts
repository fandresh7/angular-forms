import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BaseInputComponent, controlDeps } from '../base-input/base-input.component'

@Component({
  selector: 'checkbox-field',
  imports: [...controlDeps],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxFieldComponent extends BaseInputComponent {
  override formControl = new FormControl(this.control().value || false, this.validatorFn)
}
