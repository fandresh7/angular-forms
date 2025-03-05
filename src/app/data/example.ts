import { Control } from '../interfaces/forms.interfaces'

export const example: Control[] = [
  {
    id: 1,
    label: 'First name',
    name: 'first-name',
    controlType: 'input',
    placeholder: 'First Name',
    // disabled: true,
    validators: {
      required: true
    }
  },
  {
    id: 2,
    label: 'Last name',
    name: 'last-name',
    controlType: 'input',
    visible: form => form.get('first-name')?.value === 'aaaaa'
    // validators: {
    //   required: true
    // }
  },
  {
    id: 3,
    label: 'Email',
    name: 'email',
    controlType: 'input'
    // validators: {
    //   required: true,
    //   customValidation: control => (control.value && control.value.includes('gmail') ? null : { custom: 'The value must contain "gmail"' })
    // }
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
        controlType: 'input',
        validators: {
          required: true
        }
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
        type: 'text',
        validators: {
          required: true
        }
      },
      {
        id: 2,
        label: 'Is Completed?',
        name: 'is-completed',
        controlType: 'checkbox'
        // validators: {
        //   requiredTrue: true
        // }
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
