import { FormGroup } from '@angular/forms'
import { Control } from '../interfaces/forms.interfaces'
import { of } from 'rxjs'

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
        visible: form => form.get('address.address-line-1')?.value === 'street',
        controlType: 'input'
      },
      {
        label: 'City',
        name: 'city',
        controlType: 'select',
        options: (form: FormGroup) => {
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
    label: 'Favorite Fruits',
    name: 'favorite-fruits',
    controlType: 'multi-select-dropdown',
    items: form => {
      if (form.get('first-name')?.value === 'andres') {
        return [
          { fruit_id: 1, fruit_name: 'Apple' },
          { fruit_id: 2, fruit_name: 'Banana' },
          { fruit_id: 3, fruit_name: 'Cherry' },
          { fruit_id: 4, fruit_name: 'Orange' }
        ]
      } else {
        return [
          { fruit_id: 1, fruit_name: 'Apple' },
          { fruit_id: 2, fruit_name: 'Banana' },
          { fruit_id: 3, fruit_name: 'Cherry' }
        ]
      }
    },
    itemLabel: 'fruit_name',
    itemValue: 'fruit_id',
    value: [1, 3]
  },
  {
    label: 'Favorite Sports',
    name: 'favorite-sports',
    controlType: 'multi-select-dropdown',
    items: ['soccer', 'football', 'tennis', 'beisbol'],
    multiple: false
  },
  {
    label: 'Terms',
    name: 'terms',
    controlType: 'checkbox',
    value: false,
    validators: {
      requiredTrue: true
    }
  },
  {
    label: 'Interests',
    name: 'interests',
    controlType: 'chips-list',
    value: ['Angular', 'TypeScript'],
    placeholder: 'Add an interest'
  },
  {
    label: 'Country',
    name: 'country',
    controlType: 'autocomplete',
    placeholder: 'Type to search for a country',
    autocompleteOptions: (form, query: string) => {
      const countries = [
        { country_id: 1, country_name: 'USA' },
        { country_id: 2, country_name: 'United Kingdom' },
        { country_id: 3, country_name: 'Canada' },
        { country_id: 4, country_name: 'Australia' },
        { country_id: 5, country_name: 'Germany' }
      ]

      return of(countries.filter(country => country.country_name.toLowerCase().includes(query.toLowerCase())))
    },
    itemLabel: 'country_name',
    itemValue: 'country_id'
  }
]
