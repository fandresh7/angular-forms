import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { ControlContainer, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'

import { ControlInjector } from '../../pipes/control-injector.pipe'
import { Control } from '../../interfaces/forms.interfaces'
import { ControlResolver } from '../../services/control-resolver.service'
import { ActivateControlDirective } from '../../directives/activate-control.directive'

@Component({
  selector: 'fields',
  imports: [ReactiveFormsModule, NgComponentOutlet, ControlInjector, AsyncPipe, ActivateControlDirective],
  template: `
    @for (control of controls(); track control.name) {
      <ng-container
        *activateControl="control"
        [ngComponentOutlet]="controlResolver.resolve(control) | async"
        [ngComponentOutletInjector]="control | controlInjector: data()" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsComponent {
  controls = input.required<Control[]>()
  data = input<Record<string, unknown> | null>()

  fb = inject(FormBuilder)
  controlResolver = inject(ControlResolver)

  controlContainer = inject(ControlContainer)

  get form() {
    return this.controlContainer.control as FormGroup
  }
}
