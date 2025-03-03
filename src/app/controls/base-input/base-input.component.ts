import { computed, Directive, inject, OnInit, StaticProvider } from '@angular/core'
import { CONTROL_DATA } from '../../utils/control-data.token'
import { AbstractControl, ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ValidatorsService } from '../../services/validators.service'
import { ValidatorMessageDirective } from '../../directives/validator-message.directive'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'
import { ControlInjector } from '../../pipes/control-injector.pipe'
import { HelpTextDirective } from '../../directives/help-text.directive'

export const controlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true })
}

export const controlDeps = [ReactiveFormsModule, HelpTextDirective, ValidatorMessageDirective, NgComponentOutlet, AsyncPipe, ControlInjector]

@Directive()
export abstract class BaseInputComponent implements OnInit {
  controlData = inject(CONTROL_DATA)
  validatorsService = inject(ValidatorsService)
  controlContainer = inject(ControlContainer)

  key = computed(() => this.controlData().key)
  control = computed(() => this.controlData().control)

  validatorFn = this.validatorsService.resolveValidators(this.control())

  abstract createControl(): AbstractControl
  parentForm = this.controlContainer.control as FormGroup

  ngOnInit(): void {
    this.parentForm.addControl(this.key(), this.createControl())
  }
}
