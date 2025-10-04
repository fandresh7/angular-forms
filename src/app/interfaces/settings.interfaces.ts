import { Type } from '@angular/core'

export interface Settings {
  components: {
    addButtonComponent?: Type<unknown>
    removeButtonComponent?: Type<unknown>
    closeButtonComponent?: Type<unknown>
  }
}
