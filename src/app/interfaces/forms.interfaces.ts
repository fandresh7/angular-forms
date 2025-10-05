import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { Observable } from 'rxjs'

export type ControlType = 'input' | 'group' | 'checkbox' | 'checkbox-group' | 'radio' | 'select' | 'array' | 'multi-select-dropdown' | 'chips-list' | 'autocomplete'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'search'

type CustomValidator = (control: AbstractControl) => ValidationErrors | null
type ValidatorsKeys = keyof Omit<typeof Validators, 'prototype' | 'compose' | 'composeAsync'>
type ValidatorValue = boolean | number | string | RegExp

export type ControlValidators = Partial<Record<ValidatorsKeys, ValidatorValue>> & { customValidation?: CustomValidator | CustomValidator[] }

export type Visible = boolean | ((form: FormGroup) => boolean)
export type Options = Option[] | ((form: FormGroup) => Option[] | Promise<Option[]> | Observable<Option[]>)
export type Disabled = boolean | ((form: FormGroup) => boolean)
export type Items<T> = T[] | ((form: FormGroup) => T[] | Promise<T[]> | Observable<T[]>)
export type AutocompleteOptions<T> = (form: FormGroup, query: string) => T[] | Promise<T[]> | Observable<T[]>

/**
 * Base interface for all form controls with common properties
 */
export interface BaseControl {
  name: string
  controlType: ControlType
  label?: string
  helpText?: string
  validators?: ControlValidators
  visible?: Visible
  disabled?: Disabled
  value?: unknown
  placeholder?: string
  options?: Options
  controls?: Control[]
  type?: InputType
  items?: Items<unknown>
  itemLabel?: string
  itemValue?: string
  multiple?: boolean
  autocompleteOptions?: AutocompleteOptions<unknown>
  resetOnChange?: string[]
}

/**
 * Input control configuration
 */
export interface InputControl extends BaseControl {
  controlType: 'input'
  type?: InputType
  value?: string | number
  placeholder?: string
}

/**
 * Checkbox control configuration
 */
export interface CheckboxControl extends BaseControl {
  controlType: 'checkbox'
  value?: boolean
}

/**
 * Radio control configuration
 */
export interface RadioControl extends BaseControl {
  controlType: 'radio'
  options: Options
  value?: string | number
}

/**
 * Select control configuration
 */
export interface SelectControl extends BaseControl {
  controlType: 'select'
  options: Options
  value?: string | number
}

/**
 * Checkbox group control configuration
 */
export interface CheckboxGroupControl extends BaseControl {
  controlType: 'checkbox-group'
  options: Options
  value?: (string | number)[]
}

/**
 * Group control configuration
 */
export interface GroupControl extends BaseControl {
  controlType: 'group'
  controls: Control[]
}

/**
 * Array control configuration
 */
export interface ArrayControl extends BaseControl {
  controlType: 'array'
  controls: Control[]
  value?: Record<string, unknown>[]
}

/**
 * Chips list control configuration
 */
export interface ChipsListControl extends BaseControl {
  controlType: 'chips-list'
  value?: string[]
  placeholder?: string
}

/**
 * Multi-select dropdown control configuration
 */
export interface MultiSelectDropdownControl<T = unknown> extends BaseControl {
  controlType: 'multi-select-dropdown'
  items: Items<T>
  itemLabel?: string
  itemValue?: string
  multiple?: boolean
  value?: unknown[]
}

/**
 * Autocomplete control configuration
 */
export interface AutocompleteControl<T = unknown> extends BaseControl {
  controlType: 'autocomplete'
  autocompleteOptions: AutocompleteOptions<T>
  itemLabel?: string
  itemValue?: string
  placeholder?: string
  resetOnChange?: string[]
  value?: unknown
}

/**
 * Union type for all control types
 */
export type Control = InputControl | CheckboxControl | RadioControl | SelectControl | CheckboxGroupControl | GroupControl | ArrayControl | ChipsListControl | MultiSelectDropdownControl | AutocompleteControl

/**
 * Type guards for control types
 */
export function isInputControl(control: Control): control is InputControl {
  return control.controlType === 'input'
}

export function isGroupControl(control: Control): control is GroupControl {
  return control.controlType === 'group'
}

export function isArrayControl(control: Control): control is ArrayControl {
  return control.controlType === 'array'
}

export function isMultiSelectControl(control: Control): control is MultiSelectDropdownControl {
  return control.controlType === 'multi-select-dropdown'
}

export function isAutocompleteControl(control: Control): control is AutocompleteControl {
  return control.controlType === 'autocomplete'
}

/**
 * Represents an individual option available for selection in controls such as select, radio groups, or checkboxes.
 */
export interface Option {
  /**
   * The display text for the option.
   */
  label: string

  /**
   * The value associated with the option.
   */
  value: unknown

  /**
   * If set to true, this option will be selected by default.
   */
  selected?: boolean

  /**
   * If set to true, this option will be rendered as disabled.
   */
  disabled?: boolean
}
