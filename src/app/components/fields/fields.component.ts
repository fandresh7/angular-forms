/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { ControlResolver } from '../../services/control-resolver.service'
import { ControlContainer, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'
import { ControlInjector } from '../../pipes/control-injector.pipe'
import { VisibleControlsPipe } from '../../pipes/visible-controls.pipe'
import { Control } from '../../interfaces/forms.interfaces'

@Component({
  selector: 'fields',
  imports: [ReactiveFormsModule, NgComponentOutlet, ControlInjector, AsyncPipe, VisibleControlsPipe],
  template: `
    @for (control of controls() | visibleControls: form; track control.id) {
      <ng-container
        [ngComponentOutlet]="controlResolver.resolve(control) | async"
        [ngComponentOutletInjector]="control.name | controlInjector: { control, initialValues: data() }">
      </ng-container>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsComponent {
  controls = input.required<Control[]>()
  data = input<any>()

  fb = inject(FormBuilder)
  controlResolver = inject(ControlResolver)

  controlContainer = inject(ControlContainer)

  get form() {
    return this.controlContainer.control as FormGroup
  }
}
