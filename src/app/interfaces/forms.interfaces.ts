export type ControlType = 'input' | 'group' | 'checkbox' | 'checkbox-group' | 'radio' | 'select' | 'array'

export interface Control {
  id: number
  label?: string
  name: string
  controlType: ControlType
  helpText?: string
  type?: unknown
  value?: unknown
  placeholder?: string
  options?: Option[]
  controls?: Control[]
}

export interface Option {
  label: string
  value: unknown
  selected?: boolean
  disabled?: boolean
}
