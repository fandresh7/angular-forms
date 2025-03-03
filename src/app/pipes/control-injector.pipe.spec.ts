import { ControlInjector } from './control-injector.pipe'

describe('ControlInjector', () => {
  it('create an instance', () => {
    const pipe = new ControlInjector()
    expect(pipe).toBeTruthy()
  })
})
