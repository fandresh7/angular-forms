import { KeyValue, KeyValuePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { ValidationErrors } from '@angular/forms'
import { VALIDATION_ERROR_MESSAGES } from '../../utils/validation-error-messages.token'
import { SETTINGS } from '../../utils/settings.token'

@Component({
  selector: 'error-message',
  imports: [KeyValuePipe],
  template: `
    @for (error of errors() | keyvalue; track error.key) {
      <p [class]="settings.errorClasses">{{ getError(error) }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {
  settings = inject(SETTINGS)
  errorsMap = inject(VALIDATION_ERROR_MESSAGES)

  errors = input<ValidationErrors>()

  getError(error: KeyValue<string, unknown>) {
    if (!this.errorsMap[error.key]) {
      return
    }

    const message = this.errorsMap[error.key](error.value as Record<string, unknown>)
    return message
  }
}
