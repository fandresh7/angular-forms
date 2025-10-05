import { computed, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroupDirective } from '@angular/forms'
import { startWith } from 'rxjs'

import { Control } from '../interfaces/forms.interfaces'

@Directive({
  selector: '[activateControl]'
})
export class ActivateControlDirective {
  activateControl = input<Control>()

  private vcr = inject(ViewContainerRef)
  private templateRef = inject(TemplateRef)
  private rootFormGroup = inject(FormGroupDirective).form

  // ✅ Convertir valueChanges a signal
  private formValue = toSignal(this.rootFormGroup.valueChanges.pipe(startWith(this.rootFormGroup.value)), {
    initialValue: this.rootFormGroup.value
  })

  // ✅ Computed para visibilidad
  private isVisible = computed(() => {
    // Trigger reactivity cuando cambia el form
    const _ = this.formValue()

    const visible = this.activateControl()?.visible

    if (visible === undefined) {
      return true
    }

    if (typeof visible === 'function') {
      return visible(this.rootFormGroup)
    }

    return visible
  })

  constructor() {
    // ✅ Effect para manejar el DOM
    effect(() => {
      const visible = this.isVisible()

      if (visible) {
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

  // ✅ Ya no necesitas ngOnInit ni ngOnDestroy
}
