import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'radio-field',
  imports: [ReactiveFormsModule],
  templateUrl: './radio-field.component.html',
  styleUrl: './radio-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioFieldComponent extends BaseInputComponent {
  formControl = new FormControl(this.control().value)

  options = computed(() => this.control().options || [])

  createControl() {
    return this.formControl
  }
}
