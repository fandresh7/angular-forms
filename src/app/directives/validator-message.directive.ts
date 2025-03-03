import { ComponentRef, Directive, ElementRef, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core'
import { ControlContainer, FormGroupDirective, NgControl, NgForm } from '@angular/forms'
import { EMPTY, fromEvent, iif, merge, startWith, Subscription } from 'rxjs'

import { ErrorMessageComponent } from '../components/error-message/error-message.component'

@Directive({
  selector: '[validatorMessage]'
})
export class ValidatorMessageDirective implements OnInit, OnDestroy {
  ngControl = inject(NgControl, { self: true })
  elementRef = inject(ElementRef)
  vcr = inject(ViewContainerRef)
  parentContainer = inject(ControlContainer, { optional: true })

  private componentRef: ComponentRef<ErrorMessageComponent> | null = null

  get form() {
    return this.parentContainer?.formDirective as NgForm | FormGroupDirective | null
  }

  controlSubscription!: Subscription

  ngOnInit() {
    if (!this.ngControl.control) return

    this.controlSubscription = merge(
      this.ngControl.control.statusChanges,
      fromEvent(this.elementRef.nativeElement, 'blur'),
      iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
    )
      .pipe(startWith(this.ngControl.control.status))
      .subscribe(() => {
        if (this.ngControl.errors && this.form?.submitted) {
          if (!this.componentRef) {
            this.componentRef = this.vcr.createComponent(ErrorMessageComponent)
          }

          this.componentRef.setInput('errors', this.ngControl.errors)
        } else {
          this.componentRef?.destroy()
          this.componentRef = null
        }
      })
  }

  ngOnDestroy() {
    this.controlSubscription.unsubscribe()
  }
}
