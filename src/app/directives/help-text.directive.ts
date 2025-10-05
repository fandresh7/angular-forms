import { ComponentRef, Directive, ElementRef, inject, input, OnInit, ViewContainerRef } from '@angular/core'
import { HelpTextComponent } from '../components/help-text/help-text.component'

@Directive({
  selector: '[helpMessage]'
})
export class HelpTextDirective implements OnInit {
  helpMessage = input<string>()

  elementRef = inject(ElementRef)
  vcr = inject(ViewContainerRef)

  componentRef: ComponentRef<HelpTextComponent> | null = null

  ngOnInit(): void {
    if (!this.helpMessage()) {
      return
    }

    this.componentRef = this.vcr.createComponent(HelpTextComponent)
    this.componentRef.setInput('message', this.helpMessage())
  }
}
