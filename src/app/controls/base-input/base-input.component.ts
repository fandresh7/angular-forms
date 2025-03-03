import { computed, Directive, inject, OnInit, StaticProvider } from '@angular/core'
import { CONTROL_DATA } from '../../utils/control-data.token'
import { AbstractControl, ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ValidatorsService } from '../../services/validators.service'
import { ValidatorMessageDirective } from '../../directives/validator-message.directive'
import { AsyncPipe, NgComponentOutlet } from '@angular/common'
import { ControlInjector } from '../../pipes/control-injector.pipe'
import { HelpTextDirective } from '../../directives/help-text.directive'
import { VisibleControlsPipe } from '../../pipes/visible-controls.pipe'

export const controlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true })
}

export const controlDeps = [ReactiveFormsModule, HelpTextDirective, ValidatorMessageDirective, NgComponentOutlet, AsyncPipe, ControlInjector, VisibleControlsPipe]

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
    this.checkVisible()

    this.parentForm.valueChanges.subscribe(() => this.checkVisible())
  }

  checkVisible() {
    const control = this.control()

    if (control.visible === undefined || control.visible === true || (typeof control.visible === 'function' && control.visible(this.parentForm))) {
      this.addControl()
    }

    if (control.visible === false || (typeof control.visible === 'function' && !control.visible(this.parentForm))) {
      this.removeControl()
    }
  }

  protected addControl(): void {
    const key = this.key()

    if (!this.parentForm.contains(key)) {
      this.parentForm.addControl(key, this.createControl())
    }
  }

  protected removeControl(): void {
    const key = this.key()

    if (this.parentForm.contains(key)) {
      this.parentForm.removeControl(key)
    }
  }
}
