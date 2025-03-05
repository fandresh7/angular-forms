/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injector, Pipe, PipeTransform, signal } from '@angular/core'
import { Control } from '../interfaces/forms.interfaces'
import { CONTROL_DATA, ControlData } from '../utils/control-data.token'

@Pipe({
  name: 'controlInjector'
})
export class ControlInjector implements PipeTransform {
  injector = inject(Injector)

  transform(name: string, { control, initialValues }: { control: Control; initialValues?: any }): Injector {
    const controlPatchValue = initialValues?.[control.name]
    const data: ControlData = { key: name, control, value: controlPatchValue }

    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: CONTROL_DATA,
          useValue: signal(data)
        }
      ]
    })
  }
}
