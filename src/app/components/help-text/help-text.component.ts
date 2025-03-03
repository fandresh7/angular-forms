import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'help-text',
  imports: [],
  templateUrl: './help-text.component.html',
  styleUrl: './help-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpTextComponent {
  message = input<string>()
}
