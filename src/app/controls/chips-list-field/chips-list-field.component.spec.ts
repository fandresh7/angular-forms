import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChipsListFieldComponent } from './chips-list-field.component'

describe('ChipsListFieldComponent', () => {
  let component: ChipsListFieldComponent
  let fixture: ComponentFixture<ChipsListFieldComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsListFieldComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ChipsListFieldComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
