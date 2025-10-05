import { ChangeDetectionStrategy, Component, computed } from '@angular/core'

import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'
import { isInputControl } from '../../interfaces/forms.interfaces'

@Component({
  selector: 'input-field',
  imports: [...controlDeps],
  templateUrl: './input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class InputFieldComponent extends BaseInputComponent {
  inputType = computed(() => {
    const ctrl = this.control()
    return isInputControl(ctrl) ? ctrl.type || 'text' : 'text'
  })

  inputPlaceholder = computed(() => {
    const ctrl = this.control()
    return isInputControl(ctrl) ? (ctrl.placeholder ?? '') : ''
  })
}
