import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'add-button',
  imports: [],
  template: `Add Item`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemButtonComponent {}

@Component({
  selector: 'remove-button',
  imports: [],
  template: `Remove Item`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveItemButtonComponent {}
