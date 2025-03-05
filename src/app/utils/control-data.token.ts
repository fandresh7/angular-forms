/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionToken, Signal } from '@angular/core'
import { Control } from '../interfaces/forms.interfaces'

export interface ControlData {
  key: string
  control: Control
  value?: any
}

export const CONTROL_DATA = new InjectionToken<Signal<ControlData>>('Control Data')
