import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BaseInputComponent, controlDeps } from '../base-input/base-input.component'

@Component({
  selector: 'select-field',
  imports: [...controlDeps],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent extends BaseInputComponent {
  override formControl = new FormControl(this.control().value, this.validatorFn)
}
