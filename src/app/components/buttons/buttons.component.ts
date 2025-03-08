import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'add-button',
  imports: [],
  template: `<button>Add Item</button>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemButtonComponent {}

@Component({
  selector: 'remove-button',
  imports: [],
  template: `<button>Remove Item</button>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveItemButtonComponent {}
