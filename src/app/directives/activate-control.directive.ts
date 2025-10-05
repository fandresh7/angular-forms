import { Directive, inject, input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { FormGroupDirective } from '@angular/forms'
import { map, startWith, Subscription } from 'rxjs'

import { Control } from '../interfaces/forms.interfaces'

@Directive({
  selector: '[activateControl]'
})
export class ActivateControlDirective implements OnInit, OnDestroy {
  activateControl = input<Control>()

  private vcr = inject(ViewContainerRef)
  private templateRef = inject(TemplateRef)
  private rootFormGroup = inject(FormGroupDirective).form
  private subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.rootFormGroup.valueChanges
      .pipe(
        startWith(this.rootFormGroup.value),
        map(() => this.isVisible())
      )
      .subscribe(isVisible => {
        if (isVisible) {
          if (this.vcr.length === 0) {
            this.vcr.createEmbeddedView(this.templateRef)
          }
        } else {
          if (this.vcr.length > 0) {
            this.vcr.clear()
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  isVisible() {
    const visible = this.activateControl()?.visible

    if (visible === undefined) {
      return true
    }

    if (typeof visible === 'function') {
      return visible(this.rootFormGroup)
    }

    return visible
  }
}
