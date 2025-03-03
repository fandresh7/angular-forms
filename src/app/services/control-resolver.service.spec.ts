import { TestBed } from '@angular/core/testing'

import { ControlResolver } from './control-resolver.service'

describe('ControlResolver', () => {
  let service: ControlResolver

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ControlResolver)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
