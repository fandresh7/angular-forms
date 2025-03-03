import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'

import { Control } from './interfaces/forms.interfaces'
import { example } from './data/example'
import { ControlResolver } from './services/control-resolver.service'
import { ControlInjector } from './pipes/control-injector.pipe'
import { VisibleControlsPipe } from './pipes/visible-controls.pipe'

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, AsyncPipe, NgComponentOutlet, ControlInjector, VisibleControlsPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  controlResolver = inject(ControlResolver)
  fb = inject(NonNullableFormBuilder)

  controls = signal<Control[]>(example)
  form = this.fb.group({})

  submit() {
    console.log({ value: this.form.value, valid: this.form.valid })
  }
}
