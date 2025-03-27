import { Injectable, Type } from '@angular/core'
import { from, of, tap } from 'rxjs'
import { Control } from '../interfaces/forms.interfaces'

@Injectable({
  providedIn: 'root'
})
export class ControlResolver {
  private lazyControlComponents = {
    input: () => import('../controls/input-field/input-field.component').then(c => c.InputFieldComponent),
    radio: () => import('../controls/radio-field/radio-field.component').then(c => c.RadioFieldComponent),
    checkbox: () => import('../controls/checkbox-field/checkbox-field.component').then(c => c.CheckboxFieldComponent),
    select: () => import('../controls/select-field/select-field.component').then(c => c.SelectFieldComponent),
    group: () => import('../controls/group-field/group-field.component').then(c => c.GroupFieldComponent),
    array: () => import('../controls/array-field/array-field.component').then(c => c.ArrayFieldComponent),
    autocomplete: () => import('../controls/autocomplete-field/autocomplete-field.component').then(c => c.AutocompleteFieldComponent),
    'checkbox-group': () => import('../controls/checkbox-group-field/checkbox-group-field.component').then(c => c.CheckboxGroupFieldComponent),
    'multi-select-dropdown': () => import('../controls/multi-select-dropdown/multi-select-dropdown.component').then(c => c.MultiSelectDropdownComponent),
    'chips-list': () => import('../controls/chips-list-field/chips-list-field.component').then(c => c.ChipsListFieldComponent)
  }

  private loadedControlComponents = new Map<string, Type<unknown>>()

  resolve(control: Control) {
    const controlType = control.controlType

    const loadedComponent = this.loadedControlComponents.get(controlType)
    if (loadedComponent) return of(loadedComponent)

    return from(this.lazyControlComponents[controlType]()).pipe(tap(component => this.loadedControlComponents.set(controlType, component)))
  }
}
