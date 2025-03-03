import { inject, Injector, Pipe, PipeTransform, signal } from '@angular/core'
import { Control } from '../interfaces/forms.interfaces'
import { CONTROL_DATA, ControlData } from '../utils/control-data.token'

@Pipe({
  name: 'controlInjector'
})
export class ControlInjector implements PipeTransform {
  injector = inject(Injector)

  transform(name: string, control: Control): Injector {
    const data: ControlData = { key: name, control }

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
