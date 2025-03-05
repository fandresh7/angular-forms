import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'

@Component({
  selector: 'input-field',
  imports: [...controlDeps],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class InputFieldComponent extends BaseInputComponent {}
