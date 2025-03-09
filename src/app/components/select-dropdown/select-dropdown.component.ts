/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core'
import { AbstractControl, FormsModule } from '@angular/forms'
import { SelectionModel } from '@angular/cdk/collections'
import { toSignal } from '@angular/core/rxjs-interop'
import { OverlayModule } from '@angular/cdk/overlay'
import { map } from 'rxjs'

type DisplayFn<T> = ((value: T) => unknown) | null
type CompareFn<T> = (item: T, value: string) => boolean

@Component({
  selector: 'select-dropdown',
  standalone: true,
  imports: [OverlayModule, FormsModule],
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'open()'
  }
})
export class SelectDropdownComponent<T> implements OnInit, OnChanges {
  label = input<string | null>()

  options = input.required<T[]>()
  formControl = input.required<AbstractControl>()

  compareWith = input<CompareFn<T>>()
  displayWith = input<DisplayFn<T>>()

  valueHasChanged = output<T[]>()

  get displayWithFn() {
    return this.displayWith() ?? ((option: T) => option!.toString() ?? '')
  }

  selectedOptionsModel = new SelectionModel<T>(true)
  displayOptions = toSignal(this.selectedOptionsModel.changed.pipe(map(() => this.selectedOptionsModel.selected)), { initialValue: [] })

  isOpen = signal<boolean>(false)

  ngOnInit(): void {
    this.selectedOptionsModel.changed.subscribe(() => {
      this.valueHasChanged.emit(this.selectedOptionsModel.selected)
    })
  }

  setSelectedOptions(): void {
    const compare = this.compareWith()
    if (!compare) return

    const formControlValue = this.formControl().value
    this.selectedOptionsModel.clear()

    if (Array.isArray(formControlValue)) {
      this.options().forEach(option => {
        if (formControlValue.some((val: string) => compare(option, val))) {
          this.selectedOptionsModel.select(option)
        }
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.setSelectedOptions()
    }
  }

  open() {
    this.isOpen.set(true)
  }

  close() {
    this.isOpen.set(false)
  }

  toggleSelection(option: any) {
    this.selectedOptionsModel.toggle(option)
  }

  deselectOption(event: MouseEvent, option: any) {
    event.stopPropagation()
    this.selectedOptionsModel.deselect(option)
  }
}
