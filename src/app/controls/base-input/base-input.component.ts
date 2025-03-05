import { computed, Directive, HostBinding, inject, OnInit, StaticProvider } from '@angular/core'
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'
import { from, isObservable, of, shareReplay, startWith, switchMap } from 'rxjs'

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
export class BaseInputComponent implements OnInit {
  @HostBinding('class') hostClass = ''

  controlData = inject(CONTROL_DATA)
  validatorsService = inject(ValidatorsService)
  controlContainer = inject(ControlContainer)

  key = computed(() => this.controlData().key)
  control = computed(() => this.controlData().control)
  value = computed(() => this.controlData().value || this.control().value)

  validatorFn = this.validatorsService.resolveValidators(this.control())

  formControl: AbstractControl = new FormControl(this.value(), this.validatorFn)
  parentForm = this.controlContainer.control as FormGroup

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

    this.checkVisible()
    this.parentForm.valueChanges.subscribe(() => this.checkVisible())
  }

  initialize() {
    this.hostClass = `field wrapper-${this.key()}`
    this.parentForm.addControl(this.key(), this.formControl)
  }

  checkVisible() {
    const control = this.control()
    const key = this.key()

    if (control.visible === undefined || control.visible === true || (typeof control.visible === 'function' && control.visible(this.parentForm))) {
      if (!this.parentForm.contains(key)) {
        this.parentForm.addControl(key, this.control)
      }
    }

    if (control.visible === false || (typeof control.visible === 'function' && !control.visible(this.parentForm))) {
      if (this.parentForm.contains(key)) {
        this.parentForm.removeControl(key)
      }
    }
  }
}
