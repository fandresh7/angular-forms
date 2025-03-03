import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ControlResolver } from '../../services/control-resolver.service'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'
import { ControlInjector } from '../../pipes/control-injector.pipe'

@Component({
  selector: 'group-field',
  imports: [ReactiveFormsModule, NgComponentOutlet, AsyncPipe, ControlInjector],
  templateUrl: './group-field.component.html',
  styleUrl: './group-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupFieldComponent extends BaseInputComponent {
  fb = inject(NonNullableFormBuilder)
  controlResolver = inject(ControlResolver)

  formGroup = this.fb.group({})
  controls = computed(() => this.control().controls || [])

  createControl() {
    return this.formGroup
  }
}
