import { InjectionToken, Signal } from '@angular/core'
import { Control } from '../interfaces/forms.interfaces'

export interface ControlData {
  key: string
  control: Control
}

export const CONTROL_DATA = new InjectionToken<Signal<ControlData>>('Control Data')
