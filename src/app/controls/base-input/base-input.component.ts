import { computed, Directive, effect, inject, OnInit, signal, StaticProvider } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { NgComponentOutlet } from '@angular/common'
import { startWith } from 'rxjs'

import { CONTROL_DATA } from '../../utils/control-data.token'
import { ValidatorsService } from '../../services/validators.service'
import { ValidatorMessageDirective } from '../../directives/validator-message.directive'
import { ControlInjector } from '../../pipes/control-injector.pipe'
import { HelpTextDirective } from '../../directives/help-text.directive'
import { ActivateControlDirective } from '../../directives/activate-control.directive'

export const controlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true })
}

export const controlDeps = [ReactiveFormsModule, HelpTextDirective, ValidatorMessageDirective, NgComponentOutlet, ControlInjector, ActivateControlDirective]

@Directive({
  host: {
    '[class]': 'hostClass()'
  }
})
export class BaseInputComponent implements OnInit {
  // ✅ Signal para la clase del host
  protected hostClass = signal('')

  // Injections
  protected controlData = inject(CONTROL_DATA)
  protected validatorsService = inject(ValidatorsService)
  protected controlContainer = inject(ControlContainer)

  // Computed signals
  protected control = computed(() => this.controlData().control)
  protected value = computed(() => this.controlData().initialValue ?? this.control().value)

  // Form control
  protected validatorFn = this.validatorsService.resolveValidators(this.control())
  formControl: AbstractControl = new FormControl(this.value(), this.validatorFn)
  parentForm = this.controlContainer.control as FormGroup

  // ✅ Convertir valueChanges a signal
  protected formValue = toSignal(this.parentForm.valueChanges.pipe(startWith(this.parentForm.value)), {
    initialValue: this.parentForm.value
  })

  // ✅ Computed para options (reactivo automáticamente)
  protected options = computed(() => {
    // Trigger reactivity cuando cambia el form
    const _ = this.formValue()

    const optionsFn = this.control().options

    if (!optionsFn) {
      return []
    }
    if (Array.isArray(optionsFn)) {
      return optionsFn
    }

    const result = optionsFn(this.parentForm)

    // Para casos síncronos
    if (Array.isArray(result)) {
      return result
    }

    // Para Promises/Observables, mantener el patrón async en casos específicos
    // Nota: En una implementación completa, podrías manejar estos casos con un signal separado
    return []
  })

  // ✅ Computed para disabled state
  protected isDisabled = computed(() => {
    // Trigger reactivity cuando cambia el form
    const _ = this.formValue()

    const control = this.control()

    if (control.disabled === undefined) {
      return false
    }

    if (typeof control.disabled === 'boolean') {
      return control.disabled
    }

    if (typeof control.disabled === 'function') {
      return control.disabled(this.parentForm)
    }

    return false
  })

  constructor() {
    // ✅ Effect para manejar disabled state (reemplaza subscription)
    effect(() => {
      const disabled = this.isDisabled()

      if (disabled && !this.formControl.disabled) {
        this.formControl.disable({ emitEvent: false })
      } else if (!disabled && this.formControl.disabled) {
        this.formControl.enable({ emitEvent: false })
      }
    })
  }

  ngOnInit(): void {
    this.initialize()
  }

  // ✅ Ya no necesitas ngOnDestroy - los effects se limpian automáticamente

  protected initialize() {
    const control = this.control()

    // ✅ Usar signal.set en lugar de mutación directa
    this.hostClass.set(`field wrapper-${control.name}`)

    this.parentForm.addControl(control.name, this.formControl)
  }

  protected destroy() {
    const control = this.control()

    if (this.parentForm.contains(control.name)) {
      this.parentForm.removeControl(control.name)
    }

    // ✅ Ya no necesitas unsubscribe
  }
}
