import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'

@Component({
  selector: 'select-field',
  imports: [...controlDeps],
  templateUrl: './select-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class SelectFieldComponent extends BaseInputComponent {}
