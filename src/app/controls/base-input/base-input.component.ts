import { computed, Directive, inject, OnInit } from '@angular/core'
import { CONTROL_DATA } from '../../utils/control-data.token'
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms'

@Directive()
export abstract class BaseInputComponent implements OnInit {
  controlData = inject(CONTROL_DATA)
  controlContainer = inject(ControlContainer)

  key = computed(() => this.controlData().key)
  control = computed(() => this.controlData().control)

  abstract createControl(): AbstractControl
  parentForm = this.controlContainer.control as FormGroup

  ngOnInit(): void {
    this.parentForm.addControl(this.key(), this.createControl())
  }
}
