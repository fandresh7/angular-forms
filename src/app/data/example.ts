import { Control } from '../interfaces/forms.interfaces'

export const example: Control[] = [
  {
    label: 'First name',
    name: 'first-name',
    controlType: 'input',
    placeholder: 'First Name',
    validators: {
      required: true
    }
  },
  {
    label: 'Last name',
    name: 'last-name',
    controlType: 'input'
  },
  {
    label: 'Email',
    name: 'email',
    controlType: 'input',
    validators: {
      required: true,
      email: true,
      customValidation: control => (control.value && control.value.includes('gmail') ? null : { custom: 'The value must contain "gmail"' })
    }
  },
  {
    name: 'address',
    controlType: 'group',
    controls: [
      {
        label: 'Address Line 1',
        name: 'address-line-1',
        controlType: 'input',
        validators: {
          required: true
        }
      },
      {
        label: 'Address Line 2',
        name: 'address-line-2',
        disabled: true,
        controlType: 'input'
      },
      {
        label: 'City',
        name: 'city',
        controlType: 'select',
        options: form => {
          const address1 = form.value['address-line-1']

          if (address1 === 'Colombia') {
            return [
              { label: 'Type your subject', value: '', selected: true, disabled: true },
              { label: 'Bogotá', value: 'bogota' },
              { label: 'Medellín', value: 'medellin' },
              { label: 'Cali', value: 'cali' }
            ]
          } else {
            return [
              { label: 'Type your subject', value: '', selected: true, disabled: true },
              { label: 'New York', value: 'ny' },
              { label: 'Los Angeles', value: 'la' }
            ]
          }
        }
      }
    ]
  },
  {
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
    label: 'Animals',
    name: 'animals',
    controlType: 'checkbox-group',
    value: ['oso', 'caballo'],
    options: [
      { label: 'Oso', value: 'oso', disabled: true },
      { label: 'Perro', value: 'perro' },
      { label: 'Gato', value: 'gato' },
      { label: 'Caballo', value: 'caballo' }
    ]
  },
  {
    label: 'Tasks',
    name: 'tasks',
    controlType: 'array',
    controls: [
      {
        label: 'Name',
        name: 'name',
        controlType: 'input',
        type: 'text',
        validators: {
          required: true
        }
      },
      {
        label: 'Is Completed?',
        name: 'is-completed',
        controlType: 'checkbox'
      }
    ]
  },
  {
    label: 'Terms',
    name: 'terms',
    controlType: 'checkbox',
    value: false,
    validators: {
      requiredTrue: true
    }
  }
]
