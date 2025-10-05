import { InjectionToken } from '@angular/core'

type ValidationErrorArgs = Record<string, unknown> | undefined

export const ERROR_MESSAGES: Record<string, (args?: ValidationErrorArgs) => string> = {
  required: () => `This field is required`,
  requiredTrue: () => `This field is required`,
  pattern: () => `Does not match the pattern`,
  email: () => `Must be a valid email`,
  minlength: args => `Length must be at least ${(args as Record<string, unknown>)?.['requiredLength']} characters`,
  maxlength: args => `Length must not exceed ${(args as Record<string, unknown>)?.['requiredLength']} characters. Currently, it has ${(args as Record<string, unknown>)?.['actualLength']} characters.`,
  min: args => `The value must be at least ${(args as Record<string, unknown>)?.['min']}`,
  max: args => `The value must not exceed ${(args as Record<string, unknown>)?.['max']}`,
  custom: error => String(error)
}

export const SPANISH_ERROR_MESSAGES: Record<string, (args?: ValidationErrorArgs) => string> = {
  required: () => `Este campo es obligatorio`,
  requiredTrue: () => `Este campo es obligatorio`,
  pattern: () => `No coincide con el patrón`,
  email: () => `Debe ser un correo electrónico válido`,
  minlength: args => `La longitud debe ser al menos ${(args as Record<string, unknown>)?.['requiredLength']} caracteres`,
  maxlength: args => `La longitud no debe exceder los ${(args as Record<string, unknown>)?.['requiredLength']} caracteres. Actualmente tiene ${(args as Record<string, unknown>)?.['actualLength']} caracteres.`,
  min: args => `El valor debe ser al menos ${(args as Record<string, unknown>)?.['min']}`,
  max: args => `El valor no debe exceder ${(args as Record<string, unknown>)?.['max']}`,
  custom: error => String(error)
}

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation Messages', {
  providedIn: 'root',
  factory: () => ERROR_MESSAGES
})
