import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'

@Component({
  selector: 'radio-field',
  imports: [...controlDeps],
  templateUrl: './radio-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class RadioFieldComponent extends BaseInputComponent {}
