/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { Observable } from 'rxjs'

export type ControlType = 'input' | 'group' | 'checkbox' | 'checkbox-group' | 'radio' | 'select' | 'array' | 'multi-select-dropdown' | 'chips-list'

type CustomValidator = (control: AbstractControl) => ValidationErrors | null
type ValidatorsKeys = keyof Omit<typeof Validators, 'prototype' | 'compose' | 'composeAsync'>
type ValidatorValue = boolean | number | string | RegExp

export type ControlValidators = Partial<Record<ValidatorsKeys, ValidatorValue>> & { customValidation?: CustomValidator | CustomValidator[] }

export type Visible = boolean | ((form: FormGroup) => boolean)
export type Options = Option[] | ((form: FormGroup) => Option[] | Promise<Option[]> | Observable<Option[]>)
export type Disabled = boolean | ((form: FormGroup) => boolean)
export type Items<T> = T[] | ((form: FormGroup) => T[] | Promise<T[]> | Observable<T[]>)

/**
 * Represents a configuration for a form control within the library.
 *
 * @template T - The type of elements for the `items` property.
 */
export interface Control<T = any> {
  /**
   * Unique identifier for the control.
   */
  name: string

  /**
   * The type of control to render (e.g., 'input', 'group', 'checkbox', etc.).
   */
  controlType: ControlType

  /**
   * The display label associated with the control.
   */
  label?: string

  /**
   * Supplementary text providing additional information or guidance about the control.
   */
  helpText?: string

  /**
   * Specifies the underlying HTML input type or a custom type.
   */
  type?: unknown

  /**
   * The default value assigned to the control.
   */
  value?: unknown

  /**
   * Placeholder text shown when the control is empty.
   */
  placeholder?: string

  /**
   * Options for selection-based controls such as dropdowns or radio groups.
   * This can be a static array or a function that returns an array (or Promise/Observable).
   */
  options?: Options

  /**
   * Nested form controls, allowing the creation of control groups.
   */
  controls?: Control[]

  /**
   * Validation rules and constraints applied to the control.
   */
  validators?: ControlValidators

  /**
   * Controls the visibility of the form element. Can be a boolean or a function evaluating the form state.
   */
  visible?: Visible

  /**
   * Determines whether the control is disabled. Can be a boolean or a function evaluating the form state.
   */
  disabled?: Disabled

  /**
   * A collection of items to be displayed by the control.
   * The generic type parameter `T` defines the type for each element in this collection.
   * This property is applicable only for controls of type `multi-select-dropdown`.
   */
  items?: Items<T>

  /**
   * Specifies the property name to be used as the display label for each item in the `items` array.
   * This property is applicable only for controls of type `multi-select-dropdown`.
   */
  itemLabel?: string

  /**
   * Specifies the property name to be used as the underlying value for each item in the `items` array.
   * This property is applicable only for controls of type `multi-select-dropdown`.
   */
  itemValue?: string

  /**
   * Indicates whether the control supports multiple item selections.
   * This property only applies to controls of type `multi-select-dropdown`.
   *
   * @default true
   */
  multiple?: boolean
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
