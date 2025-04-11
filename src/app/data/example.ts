import { FormGroup } from '@angular/forms'
import { Control } from '../interfaces/forms.interfaces'
import { delay, of } from 'rxjs'

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
    placeholder: 'Add an interest',
    validators: {
      required: true,
      customValidation: control => (control.value && control.value.length > 3 ? null : { custom: 'The value must contain more than 3 items' })
    }
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

      return of(countries.filter(country => country.country_name.toLowerCase().includes(query.toLowerCase()))).pipe(delay(1000))
    },
    itemLabel: 'country_name',
    itemValue: 'country_id',
    validators: {
      required: true
    }
  },
  {
    label: 'City',
    name: 'city',
    controlType: 'autocomplete',
    placeholder: 'Type to search for a city',
    autocompleteOptions: (form, query: string) => {
      const cities = [
        { city_id: 1, city_name: 'New York', country: 1 },
        { city_id: 2, city_name: 'Los Angeles', country: 1 },
        { city_id: 3, city_name: 'Chicago', country: 1 },
        { city_id: 4, city_name: 'Houston', country: 1 },
        { city_id: 5, city_name: 'London', country: 2 },
        { city_id: 6, city_name: 'Birmingham', country: 2 },
        { city_id: 7, city_name: 'Manchester', country: 2 },
        { city_id: 8, city_name: 'Glasgow', country: 2 },
        { city_id: 9, city_name: 'Toronto', country: 3 },
        { city_id: 10, city_name: 'Montreal', country: 3 },
        { city_id: 11, city_name: 'Vancouver', country: 3 },
        { city_id: 12, city_name: 'Calgary', country: 3 },
        { city_id: 13, city_name: 'Sydney', country: 4 },
        { city_id: 14, city_name: 'Melbourne', country: 4 },
        { city_id: 15, city_name: 'Brisbane', country: 4 },
        { city_id: 16, city_name: 'Perth', country: 4 },
        { city_id: 17, city_name: 'Berlin', country: 5 },
        { city_id: 18, city_name: 'Hamburg', country: 5 },
        { city_id: 19, city_name: 'Munich', country: 5 },
        { city_id: 20, city_name: 'Cologne', country: 5 }
      ]

      const country = form.get('country')?.value
      if (!country) return cities

      const result = cities.filter(city => city.country === country && city.city_name.toLowerCase().includes(query.toLowerCase()))
      return of(result)
    },
    itemLabel: 'city_name',
    itemValue: 'city_id',
    resetOnChange: ['country'],
    validators: {
      required: true
    }
  },
  {
    label: 'Language',
    name: 'language',
    controlType: 'autocomplete',
    placeholder: 'Type to search for a language',
    autocompleteOptions: (form, query) => {
      const languages = ['Spanish', 'English', 'Portuguese', 'Japanese', 'Chinese']
      return languages.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    }
  }
]
