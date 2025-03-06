/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyValue, KeyValuePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { ValidationErrors } from '@angular/forms'
import { VALIDATION_ERROR_MESSAGES } from '../../utils/validation-error-messages.token'

@Component({
  selector: 'error-message',
  imports: [KeyValuePipe],
  template: `
    @for (error of errors() | keyvalue; track error) {
      <p style="margin: 0">{{ getError(error) }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {
  errors = input<ValidationErrors>()

  errorsMap = inject(VALIDATION_ERROR_MESSAGES)

  getError(error: KeyValue<string, any>) {
    if (!this.errorsMap[error.key]) return

    const message = this.errorsMap[error.key](error.value)
    return message
  }
}
