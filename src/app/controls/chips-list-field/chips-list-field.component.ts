import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl } from '@angular/forms'

import { BaseInputComponent, controlDeps } from '../base-input/base-input.component'

@Component({
  selector: 'chips-list-field',
  imports: [...controlDeps],
  templateUrl: './chips-list-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsListFieldComponent extends BaseInputComponent {
  override formControl = new FormControl<string[]>(Array.isArray(this.value()) ? (this.value() as string[]) : [], this.validatorFn)

  inputValue = signal('')

  addChip() {
    const trimmed = this.inputValue().trim()
    if (!trimmed) {
      return
    }

    const currentChips = this.formControl.value || []
    this.formControl.setValue([...currentChips, trimmed])

    this.inputValue.set('')
  }

  removeChip(chipToRemove: string) {
    const currentChips = this.formControl.value || []
    const updatedChips = currentChips.filter(chip => chip !== chipToRemove)
    this.formControl.setValue(updatedChips)
  }
}
