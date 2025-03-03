import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'select-field',
  imports: [ReactiveFormsModule],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent extends BaseInputComponent {
  formControl = new FormControl(this.control().value)

  options = computed(() => this.control().options ?? [])

  createControl() {
    return this.formControl
  }
}
