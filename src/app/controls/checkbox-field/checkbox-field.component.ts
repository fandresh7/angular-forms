import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'

@Component({
  selector: 'checkbox-field',
  imports: [...controlDeps],
  templateUrl: './checkbox-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class CheckboxFieldComponent extends BaseInputComponent {}
