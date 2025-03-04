import { ComponentRef, Directive, ElementRef, inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core'
import { ControlContainer, FormGroupDirective, NgControl } from '@angular/forms'
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

  form = inject(FormGroupDirective)

  controlSubscription!: Subscription

  ngOnInit() {
    const control = this.ngControl.control
    if (!control) return

    this.controlSubscription = merge(
      control.statusChanges,
      fromEvent(this.elementRef.nativeElement, 'blur'),
      iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
    )
      .pipe(startWith(control.status))
      .subscribe(() => {
        if (control.errors && this.form?.submitted) {
          if (!this.componentRef) {
            this.componentRef = this.vcr.createComponent(ErrorMessageComponent)
          }

          this.componentRef.setInput('errors', control.errors)
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
