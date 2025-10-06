import { InjectionToken } from '@angular/core'
import { Settings } from '../interfaces/settings.interfaces'

export const SETTINGS = new InjectionToken<Settings>('Settings')
