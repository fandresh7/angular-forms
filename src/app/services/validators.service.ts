import { Injectable } from '@angular/core'
import { Control, ControlValidators } from '../interfaces/forms.interfaces'
import { ValidatorFn, Validators } from '@angular/forms'

type ValidatorStrategy = (value: unknown) => ValidatorFn[]

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  private readonly validatorStrategies: Partial<Record<keyof ControlValidators, ValidatorStrategy>> = {
    customValidation: (value: unknown): ValidatorFn[] => {
      if (typeof value === 'function') {
        return [value as ValidatorFn]
      }
      if (Array.isArray(value)) {
        return value.filter((fn): fn is ValidatorFn => typeof fn === 'function')
      }
      return []
    },

    pattern: (value: unknown): ValidatorFn[] => {
      if (typeof value === 'string' || value instanceof RegExp) {
        return [Validators.pattern(value)]
      }
      return []
    },

    max: (value: unknown): ValidatorFn[] => {
      return typeof value === 'number' ? [Validators.max(value)] : []
    },

    min: (value: unknown): ValidatorFn[] => {
      return typeof value === 'number' ? [Validators.min(value)] : []
    },

    maxLength: (value: unknown): ValidatorFn[] => {
      return typeof value === 'number' ? [Validators.maxLength(value)] : []
    },

    minLength: (value: unknown): ValidatorFn[] => {
      return typeof value === 'number' ? [Validators.minLength(value)] : []
    },

    requiredTrue: (): ValidatorFn[] => {
      return [Validators.requiredTrue]
    },

    email: (): ValidatorFn[] => {
      return [Validators.email]
    },

    required: (): ValidatorFn[] => {
      return [Validators.required]
    }
  }

  resolveValidators({ validators = {} }: Control): ValidatorFn | null {
    const validatorFns: ValidatorFn[] = []

    for (const key in validators) {
      if (Object.prototype.hasOwnProperty.call(validators, key)) {
        const typedKey = key as keyof ControlValidators
        const strategy = this.validatorStrategies[typedKey]

        if (strategy) {
          const value = validators[typedKey]
          const fns = strategy(value)
          validatorFns.push(...fns)
        }
      }
    }

    return validatorFns.length > 0 ? Validators.compose(validatorFns) : null
  }
}
