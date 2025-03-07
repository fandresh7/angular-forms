import { computed, Directive, HostBinding, inject, OnDestroy, OnInit, StaticProvider } from '@angular/core'
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'
import { from, isObservable, of, shareReplay, startWith, Subscription, switchMap } from 'rxjs'

import { CONTROL_DATA } from '../../utils/control-data.token'
import { ValidatorsService } from '../../services/validators.service'
import { ValidatorMessageDirective } from '../../directives/validator-message.directive'
import { ControlInjector } from '../../pipes/control-injector.pipe'
import { HelpTextDirective } from '../../directives/help-text.directive'
import { VisibleControlsPipe } from '../../pipes/visible-controls.pipe'

export const controlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true })
}

export const controlDeps = [ReactiveFormsModule, HelpTextDirective, ValidatorMessageDirective, NgComponentOutlet, AsyncPipe, ControlInjector, VisibleControlsPipe]

@Directive()
export class BaseInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClass = ''

  controlData = inject(CONTROL_DATA)
  validatorsService = inject(ValidatorsService)
  controlContainer = inject(ControlContainer)

  control = computed(() => this.controlData().control)
  value = computed(() => this.controlData().initialValue ?? this.control().value)

  validatorFn = this.validatorsService.resolveValidators(this.control())

  formControl: AbstractControl = new FormControl(this.value(), this.validatorFn)
  parentForm = this.controlContainer.control as FormGroup

  subscription!: Subscription

  options$ = this.parentForm.valueChanges.pipe(
    startWith(this.parentForm.value),
    switchMap(() => {
      const optionsFn = this.control().options

      if (!optionsFn) return of([])
      if (Array.isArray(optionsFn)) return of(optionsFn)

      const result = optionsFn(this.parentForm)

      if (isObservable(result)) return result
      if (result instanceof Promise) return from(result)
      if (Array.isArray(result)) return of(result)

      return of([])
    }),
    shareReplay(1)
  )

  ngOnInit(): void {
    this.initialize()
  }

  ngOnDestroy(): void {
    const control = this.control()

    if (this.parentForm.contains(control.name)) {
      this.parentForm.removeControl(control.name)
    }

    this.subscription.unsubscribe()
  }

  initialize() {
    const control = this.control()
    this.hostClass = `field wrapper-${control.name}`
    this.parentForm.addControl(control.name, this.formControl)

    this.checkVisible()
    this.toggleDisabledState()

    this.subscription = this.parentForm.valueChanges.subscribe(() => {
      this.checkVisible()
      this.toggleDisabledState()
    })
  }

  toggleDisabledState() {
    const isDisabled = this.checkDisabled()

    if (isDisabled && !this.formControl.disabled) {
      this.formControl.disable({ emitEvent: false })
    } else if (!isDisabled && this.formControl.disabled) {
      this.formControl.enable({ emitEvent: false })
    }
  }

  checkDisabled() {
    const control = this.control()

    if (control.disabled === undefined) return false

    if (typeof control.disabled === 'boolean') return control.disabled

    if (typeof control.disabled === 'function') {
      const result = control.disabled(this.parentForm)
      return result
    }

    return false
  }

  checkVisible() {
    const control = this.control()
    const key = this.control().name

    if (control.visible === undefined || control.visible === true || (typeof control.visible === 'function' && control.visible(this.parentForm))) {
      if (!this.parentForm.contains(key)) {
        this.parentForm.addControl(key, this.formControl, { emitEvent: false })
      }
    }

    if (control.visible === false || (typeof control.visible === 'function' && !control.visible(this.parentForm))) {
      if (this.parentForm.contains(key)) {
        this.parentForm.removeControl(key, { emitEvent: false })
      }
    }
  }
}
