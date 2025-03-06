import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'help-text',
  imports: [],
  template: `<p style="margin: 0">{{ message() }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpTextComponent {
  message = input<string>()
}
