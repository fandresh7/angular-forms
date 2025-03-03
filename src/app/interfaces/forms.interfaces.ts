import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export type ControlType = 'input' | 'group' | 'checkbox' | 'checkbox-group' | 'radio' | 'select' | 'array'

type CustomValidator = (control: AbstractControl) => ValidationErrors | null
type ValidatorsKeys = keyof Omit<typeof Validators, 'prototype' | 'compose' | 'composeAsync'>
type ValidatorValue = boolean | number | string | RegExp

export type ControlValidators = Partial<Record<ValidatorsKeys, ValidatorValue>> & { customValidation?: CustomValidator | CustomValidator[] }

export interface Control {
  id: number
  label?: string
  name: string
  controlType: ControlType
  helpText?: string
  type?: unknown
  value?: unknown
  placeholder?: string
  options?: Option[]
  controls?: Control[]
  validators?: ControlValidators
}

export interface Option {
  label: string
  value: unknown
  selected?: boolean
  disabled?: boolean
}
