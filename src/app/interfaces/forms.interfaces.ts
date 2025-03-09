/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { Observable } from 'rxjs'

export type ControlType = 'input' | 'group' | 'checkbox' | 'checkbox-group' | 'radio' | 'select' | 'array' | 'multi-select-dropdown'

type CustomValidator = (control: AbstractControl) => ValidationErrors | null
type ValidatorsKeys = keyof Omit<typeof Validators, 'prototype' | 'compose' | 'composeAsync'>
type ValidatorValue = boolean | number | string | RegExp

export type ControlValidators = Partial<Record<ValidatorsKeys, ValidatorValue>> & { customValidation?: CustomValidator | CustomValidator[] }

export type Visible = boolean | ((form: FormGroup) => boolean)
export type Options = Option[] | ((form: FormGroup) => Option[] | Promise<Option[]> | Observable<Option[]>)
export type Disabled = boolean | ((form: FormGroup) => boolean)
export type Items<T> = T[] | ((form: FormGroup) => T[] | Promise<T[]> | Observable<T[]>)

export interface Control<T = any> {
  name: string
  controlType: ControlType
  label?: string
  helpText?: string
  type?: unknown
  value?: unknown
  placeholder?: string
  options?: Options
  controls?: Control[]
  validators?: ControlValidators
  visible?: Visible
  disabled?: Disabled
  items?: Items<T>
  itemLabel?: string
  itemValue?: string
}

export interface Option {
  label: string
  value: unknown
  selected?: boolean
  disabled?: boolean
}
