import { Pipe, PipeTransform } from '@angular/core'
import { Control } from '../interfaces/forms.interfaces'
import { FormGroup } from '@angular/forms'

@Pipe({
  name: 'visibleControls',
  pure: false
})
export class VisibleControlsPipe implements PipeTransform {
  transform(controls: Control[], form: FormGroup): Control[] {
    return controls.filter(control => {
      if (control.visible === undefined) return true

      if (typeof control.visible === 'function') {
        return control.visible(form)
      }

      return control.visible
    })
  }
}
