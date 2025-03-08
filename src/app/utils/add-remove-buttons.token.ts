import { InjectionToken, Type } from '@angular/core'

interface AddRemoveButtons {
  add: Type<unknown>
  remove: Type<unknown>
}

export const ADD_REMOVE_BUTTONS = new InjectionToken<AddRemoveButtons>('AddRemoveButtons')
