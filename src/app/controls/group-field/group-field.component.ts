import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { NonNullableFormBuilder } from '@angular/forms'

import { BaseInputComponent, controlDeps, controlProvider } from '../base-input/base-input.component'
import { ControlResolver } from '../../services/control-resolver.service'

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
  controls = computed(() => this.control().controls || [])
}
