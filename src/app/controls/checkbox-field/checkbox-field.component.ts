import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'checkbox-field',
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxFieldComponent extends BaseInputComponent {
  formControl = new FormControl(this.control().value || false)

  createControl() {
    return this.formControl
  }
}
