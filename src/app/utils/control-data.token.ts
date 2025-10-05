import { InjectionToken, Signal } from '@angular/core'

import { Control } from '../interfaces/forms.interfaces'

export interface ControlData {
  control: Control
  initialValue?: unknown
}

export const CONTROL_DATA = new InjectionToken<Signal<ControlData>>('CONTROL_DATA')
