import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { NonNullableFormBuilder } from '@angular/forms'

import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'
import { ControlResolver } from '../../services/control-resolver.service'
import { isGroupControl } from '../../interfaces/forms.interfaces'

@Component({
  selector: 'group-field',
  imports: [...controlDeps, AsyncPipe],
  templateUrl: './group-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [controlProvider]
})
export class GroupFieldComponent extends BaseInputComponent {
  fb = inject(NonNullableFormBuilder)
  controlResolver = inject(ControlResolver)

  override formControl = this.fb.group({})
  controls = computed(() => {
    const ctrl = this.control()
    return isGroupControl(ctrl) ? ctrl.controls : []
  })

  groupValue = computed(() => this.value() as Record<string, unknown> | null)
}
