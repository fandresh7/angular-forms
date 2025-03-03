import { Control } from '../interfaces/forms.interfaces'

export const example: Control[] = [
  {
    id: 1,
    label: 'First name',
    name: 'first-name',
    controlType: 'input',
    placeholder: 'First Name'
  },
  {
    id: 2,
    label: 'Last name',
    name: 'last-name',
    controlType: 'input'
  },
  {
    id: 3,
    label: 'Email',
    name: 'email',
    helpText: 'Must be a valid email',
    controlType: 'input'
  },
  {
    id: 4,
    name: 'address',
    controlType: 'group',
    controls: [
      {
        id: 1,
        label: 'Address Line 1',
        name: 'address-line-1',
        controlType: 'input'
      },
      {
        id: 2,
        label: 'Address Line 2',
        name: 'address-line-2',
        controlType: 'input'
      },
      {
        id: 3,
        label: 'City',
        name: 'city',
        controlType: 'select',
        options: [
          { label: 'Type your subject', value: '', selected: true, disabled: true },
          { label: 'Bogotá', value: 'bogota' },
          { label: 'Medellín', value: 'medellin' },
          { label: 'Cali', value: 'cali' }
        ]
      }
    ]
  },
  {
    id: 5,
    label: 'Subject',
    name: 'subject',
    controlType: 'select',
    options: [
      { label: 'Type your subject', value: '', selected: true, disabled: true },
      { label: 'USA', value: 'usa' },
      { label: 'UK', value: 'uk' },
      { label: 'CANADA', value: 'canada' }
    ]
  },
  {
    id: 6,
    label: 'Animals',
    name: 'animals',
    controlType: 'checkbox-group',
    value: ['oso', 'caballo'],
    options: [
      { label: 'Oso', value: 'oso' },
      { label: 'Perro', value: 'perro' },
      { label: 'Gato', value: 'gato' },
      { label: 'Caballo', value: 'caballo' }
    ]
  },
  {
    id: 7,
    label: 'Tasks',
    name: 'tasks',
    controlType: 'array',
    controls: [
      {
        id: 1,
        label: 'Name',
        name: 'name',
        controlType: 'input',
        type: 'text'
      },
      {
        id: 2,
        label: 'Is Completed?',
        name: 'is-completed',
        controlType: 'checkbox'
      }
    ]
  },
  {
    id: 8,
    label: 'Terms',
    name: 'terms',
    controlType: 'checkbox',
    value: false
  }
]
