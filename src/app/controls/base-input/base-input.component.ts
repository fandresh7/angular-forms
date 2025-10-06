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
import { SETTINGS } from '../../utils/settings.token'

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
  settings = inject(SETTINGS)

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

  protected formValue = toSignal(this.parentForm.valueChanges.pipe(startWith(this.parentForm.value)), {
    initialValue: this.parentForm.value
  })

  protected options = computed(() => {
    const _ = this.formValue()

    const optionsFn = this.control().options

    if (!optionsFn) {
      return []
    }

    if (Array.isArray(optionsFn)) {
      return optionsFn
    }

    const result = optionsFn(this.parentForm)

    if (Array.isArray(result)) {
      return result
    }

    return []
  })

  protected isDisabled = computed(() => {
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

  protected initialize() {
    const control = this.control()

    const classes = this.settings.wrapperClasses ?? `field wrapper-${control.name}`

    this.hostClass.set(classes)

    this.parentForm.addControl(control.name, this.formControl)
  }

  protected destroy() {
    const control = this.control()

    if (this.parentForm.contains(control.name)) {
      this.parentForm.removeControl(control.name)
    }
  }
}
