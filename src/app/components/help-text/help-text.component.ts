import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { SETTINGS } from '../../utils/settings.token'

@Component({
  selector: 'help-text',
  template: `<p [class]="settings.helpTextClasses">{{ message() }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpTextComponent {
  settings = inject(SETTINGS)

  message = input<string>()
}
