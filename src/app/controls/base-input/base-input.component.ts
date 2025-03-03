import { computed, Directive, inject, OnInit, StaticProvider } from '@angular/core'
import { CONTROL_DATA } from '../../utils/control-data.token'
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms'
import { ValidatorsService } from '../../services/validators.service'

export const controlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true })
}

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
