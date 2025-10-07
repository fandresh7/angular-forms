import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'

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
  isPasswordOpen = signal(false)

  eyeComponent = computed(() => (this.isPasswordOpen() ? this.settings.passwordEyeOpenIcon : this.settings.passwordEyeCloseIcon))

  inputType = computed(() => {
    const ctrl = this.control()
    if (!isInputControl(ctrl)) {
      return 'text'
    }

    const type = ctrl.type || 'text'
    if (type === 'password' && this.isPasswordOpen()) {
      return 'text'
    }

    return type
  })

  inputPlaceholder = computed(() => {
    const ctrl = this.control()
    return isInputControl(ctrl) ? (ctrl.placeholder ?? '') : ''
  })

  togglePassword() {
    this.isPasswordOpen.set(!this.isPasswordOpen())
  }
}
