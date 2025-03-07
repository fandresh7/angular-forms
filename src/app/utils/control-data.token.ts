/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionToken, Signal } from '@angular/core'
import { Control } from '../interfaces/forms.interfaces'

export interface ControlData {
  control: Control
  initialValue?: any
}

export const CONTROL_DATA = new InjectionToken<Signal<ControlData>>('Control Data')
