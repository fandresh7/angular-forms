import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { Control } from './interfaces/forms.interfaces'
import { example } from './data/example'
import { FieldsComponent } from './components/fields/fields.component'

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FieldsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  fb = inject(NonNullableFormBuilder)

  data = {
    address: {
      'address-line-1': 'sadfsd',
      'address-line-2': 'asdfsdf',
      city: 'ny'
    },
    'first-name': 'sadas',
    'last-name': 'asdAsd',
    email: 'sadas@dsgdf.com',
    subject: 'uk',
    animals: ['oso', 'perro', 'caballo'],
    tasks: [
      {
        name: 'sadf',
        'is-completed': false
      },
      {
        name: 'ggas',
        'is-completed': true
      }
    ],
    terms: true
  }

  controls = signal<Control[]>(example)
  form = this.fb.group({})

  submit() {
    console.log({ value: this.form.value, valid: this.form.valid })
  }
}
