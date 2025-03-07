import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { Observable } from 'rxjs'

export type ControlType = 'input' | 'group' | 'checkbox' | 'checkbox-group' | 'radio' | 'select' | 'array'

type CustomValidator = (control: AbstractControl) => ValidationErrors | null
type ValidatorsKeys = keyof Omit<typeof Validators, 'prototype' | 'compose' | 'composeAsync'>
type ValidatorValue = boolean | number | string | RegExp

export type ControlValidators = Partial<Record<ValidatorsKeys, ValidatorValue>> & { customValidation?: CustomValidator | CustomValidator[] }

type Visible = boolean | ((form: FormGroup) => boolean)
type Options = Option[] | ((form: FormGroup) => Option[] | Promise<Option[]> | Observable<Option[]>)
type Disabled = boolean | ((form: FormGroup) => boolean)

export interface Control {
  label?: string
  name: string
  controlType: ControlType
  helpText?: string
  type?: unknown
  value?: unknown
  placeholder?: string
  options?: Options
  controls?: Control[]
  validators?: ControlValidators
  visible?: Visible
  disabled?: Disabled
}

export interface Option {
  label: string
  value: unknown
  selected?: boolean
  disabled?: boolean
}
