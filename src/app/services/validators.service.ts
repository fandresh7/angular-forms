import { Injectable } from '@angular/core'
import { Control, ControlValidators } from '../interfaces/forms.interfaces'
import { ValidatorFn, Validators } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  resolveValidators({ validators = {} }: Control) {
    const validatorsKeys = Object.keys(validators) as (keyof ControlValidators)[]
    const validatorFns: ValidatorFn[] = []

    validatorsKeys.forEach(key => {
      const value = validators[key]

      if (key === 'customValidation' && typeof value === 'function') {
        validatorFns.push(value as ValidatorFn)
      }

      if (key === 'customValidation' && Array.isArray(value)) {
        value.forEach(fn => {
          if (typeof fn === 'function') validatorFns.push(fn)
        })
      }

      if (key === 'pattern' && typeof value === 'string') {
        validatorFns.push(Validators.pattern(value))
      }

      if (key === 'max' && typeof value === 'number') {
        validatorFns.push(Validators.max(value))
      }

      if (key === 'min' && typeof value === 'number') {
        validatorFns.push(Validators.min(value))
      }

      if (key === 'maxLength' && typeof value === 'number') {
        validatorFns.push(Validators.maxLength(value))
      }

      if (key === 'minLength' && typeof value === 'number') {
        validatorFns.push(Validators.minLength(value))
      }

      if (key === 'requiredTrue') {
        validatorFns.push(Validators.requiredTrue)
      }

      if (key === 'email') {
        validatorFns.push(Validators.email)
      }

      if (key === 'required') {
        validatorFns.push(Validators.required)
      }
    })

    return validatorFns.length > 0 ? Validators.compose(validatorFns) : null
  }
}
