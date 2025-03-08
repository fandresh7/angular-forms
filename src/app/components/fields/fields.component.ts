/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { ControlContainer, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'

import { ControlInjector } from '../../pipes/control-injector.pipe'
import { Control } from '../../interfaces/forms.interfaces'
import { ControlResolver } from '../../services/control-resolver.service'
import { ActivateControlDirective } from '../../directives/activate-control.directive'
import { ADD_REMOVE_BUTTONS } from '../../utils/add-remove-buttons.token'
import { AddItemButtonComponent, RemoveItemButtonComponent } from '../buttons/buttons.component'

@Component({
  selector: 'fields',
  imports: [ReactiveFormsModule, NgComponentOutlet, ControlInjector, AsyncPipe, ActivateControlDirective],
  template: `
    @for (control of controls(); track control.name) {
      <ng-container
        *activateControl="control"
        [ngComponentOutlet]="controlResolver.resolve(control) | async"
        [ngComponentOutletInjector]="control | controlInjector: data()">
      </ng-container>
    }
  `,
  providers: [
    {
      provide: ADD_REMOVE_BUTTONS,
      useFactory: () => ({
        add: AddItemButtonComponent,
        remove: RemoveItemButtonComponent
      })
    }
  ],
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
