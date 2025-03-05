import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BaseInputComponent, controlDeps } from '../base-input/base-input.component'

@Component({
  selector: 'checkbox-group-field',
  imports: [...controlDeps],
  templateUrl: './checkbox-group-field.component.html',
  styleUrl: './checkbox-group-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupFieldComponent extends BaseInputComponent {
  override formControl = new FormControl(Array.isArray(this.control().value) ? this.control().value : [], this.validatorFn)

  isSelected(value: unknown) {
    const selectedValues = this.formControl.value as unknown[]
    return selectedValues.includes(value)
  }

  onCheckboxChange(event: Event, value: unknown) {
    const target = event.target as HTMLInputElement
    const isChecked = target.checked

    let selectedValues = this.formControl.value as unknown[]

    if (isChecked && !this.isSelected(value)) {
      selectedValues.push(value)
    } else {
      selectedValues = selectedValues.filter(item => item !== value)
    }

    this.formControl.setValue(selectedValues)
  }
}
