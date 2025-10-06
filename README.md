# Angular Dynamic Forms

A powerful, type-safe, and highly customizable dynamic form system built with Angular 20+ and Signals.

## 🚀 Features

- ✅ **10+ Form Control Types** - Input, Select, Checkbox, Radio, Autocomplete, Multi-select, Chips, Arrays, Groups, and more
- ✅ **Type-Safe** - Full TypeScript support with discriminated union types and type guards
- ✅ **Reactive with Signals** - Built with Angular Signals for optimal performance
- ✅ **Dynamic Validation** - Configurable validators with custom error messages
- ✅ **Nested Forms** - Support for complex nested and array structures
- ✅ **Settings-Based Styling** - Centralized configuration system for complete customization
- ✅ **CSS Framework Agnostic** - Use any CSS framework (Tailwind, Bootstrap, custom CSS, etc.)
- ✅ **Custom Icons** - Built-in SVG icon components with full customization support
- ✅ **Accessibility** - ARIA attributes and keyboard navigation
- ✅ **Zero Memory Leaks** - Automatic cleanup with modern Angular patterns

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Control Types](#control-types)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
- [Validation](#validation)
- [Styling & Customization](#styling--customization)
- [API Reference](#api-reference)

---

## 🎯 Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`

### Build

```bash
ng build
```

---

## 🎨 Control Types

### Available Controls

| Control Type            | Description                          | Use Case                          |
| ----------------------- | ------------------------------------ | --------------------------------- |
| `input`                 | Text, number, email, password fields | Basic data entry                  |
| `select`                | Dropdown selection                   | Single choice from list           |
| `checkbox`              | Single checkbox                      | Boolean values                    |
| `checkbox-group`        | Multiple checkboxes                  | Multiple selections               |
| `radio`                 | Radio button group                   | Single choice from options        |
| `multi-select-dropdown` | Multi-select dropdown                | Multiple selections with search   |
| `autocomplete`          | Autocomplete input                   | Search and select with async data |
| `chips-list`            | Chip input list                      | Tag-like inputs                   |
| `array`                 | Dynamic array of forms               | Repeatable form sections          |
| `group`                 | Nested form group                    | Grouped fields                    |

---

## 📖 Basic Usage

### 1. Define Your Form Configuration

```typescript
import { Component, signal } from '@angular/core'
import { Control } from './interfaces/forms.interfaces'

@Component({
  selector: 'app-my-form',
  template: `
    <form
      [formGroup]="form"
      (submit)="onSubmit()">
      <fields
        [controls]="controls()"
        [data]="initialData" />
      <button type="submit">Submit</button>
    </form>
  `
})
export class MyFormComponent {
  controls = signal<Control[]>([
    {
      name: 'firstName',
      label: 'First Name',
      controlType: 'input',
      type: 'text',
      placeholder: 'Enter your first name',
      validators: {
        required: true,
        minLength: 2
      }
    },
    {
      name: 'email',
      label: 'Email',
      controlType: 'input',
      type: 'email',
      validators: {
        required: true,
        email: true
      }
    },
    {
      name: 'country',
      label: 'Country',
      controlType: 'select',
      options: [
        { label: 'USA', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'Mexico', value: 'mx' }
      ],
      validators: {
        required: true
      }
    }
  ])

  form = this.fb.group({})
  initialData = {
    firstName: 'John',
    email: 'john@example.com'
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value)
    }
  }
}
```

### 2. Input Field

```typescript
{
  name: 'username',
  label: 'Username',
  controlType: 'input',
  type: 'text',
  placeholder: 'Enter username',
  helpText: 'Choose a unique username',
  validators: {
    required: true,
    minLength: 3,
    maxLength: 20
  }
}
```

### 3. Select Dropdown

```typescript
{
  name: 'category',
  label: 'Category',
  controlType: 'select',
  options: [
    { label: 'Technology', value: 'tech' },
    { label: 'Business', value: 'business' },
    { label: 'Arts', value: 'arts' }
  ],
  validators: {
    required: true
  }
}
```

### 4. Checkbox Group

```typescript
{
  name: 'interests',
  label: 'Interests',
  controlType: 'checkbox-group',
  options: [
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
    { label: 'Reading', value: 'reading' }
  ],
  value: ['sports', 'music']
}
```

### 5. Radio Buttons

```typescript
{
  name: 'gender',
  label: 'Gender',
  controlType: 'radio',
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ],
  validators: {
    required: true
  }
}
```

---

## 🔥 Advanced Features

### Autocomplete with Async Data

```typescript
{
  name: 'city',
  label: 'City',
  controlType: 'autocomplete',
  placeholder: 'Search for a city',
  autocompleteOptions: (form, query: string) => {
    // Return Observable, Promise, or Array
    return this.cityService.search(query).pipe(
      map(cities => cities.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ))
    )
  },
  itemLabel: 'name',
  itemValue: 'id',
  validators: {
    required: true
  }
}
```

### Multi-Select Dropdown

```typescript
{
  name: 'skills',
  label: 'Skills',
  controlType: 'multi-select-dropdown',
  items: [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' },
    { id: 4, name: 'TypeScript' }
  ],
  itemLabel: 'name',
  itemValue: 'id',
  multiple: true,
  value: [1, 4]
}
```

### Chips List

```typescript
{
  name: 'tags',
  label: 'Tags',
  controlType: 'chips-list',
  value: ['angular', 'typescript'],
  placeholder: 'Add a tag',
  validators: {
    customValidation: (control) =>
      control.value?.length > 3
        ? null
        : { minTags: 'At least 3 tags required' }
  }
}
```

### Dynamic Arrays

```typescript
{
  name: 'tasks',
  label: 'Tasks',
  controlType: 'array',
  controls: [
    {
      name: 'title',
      label: 'Task Title',
      controlType: 'input',
      type: 'text',
      validators: { required: true }
    },
    {
      name: 'completed',
      label: 'Completed',
      controlType: 'checkbox'
    }
  ],
  value: [
    { title: 'Task 1', completed: false },
    { title: 'Task 2', completed: true }
  ]
}
```

### Nested Groups

```typescript
{
  name: 'address',
  label: 'Address',
  controlType: 'group',
  controls: [
    {
      name: 'street',
      label: 'Street',
      controlType: 'input',
      type: 'text'
    },
    {
      name: 'city',
      label: 'City',
      controlType: 'input',
      type: 'text'
    },
    {
      name: 'zipCode',
      label: 'ZIP Code',
      controlType: 'input',
      type: 'text'
    }
  ]
}
```

---

## ✅ Validation

### Built-in Validators

```typescript
validators: {
  required: true,
  email: true,
  minLength: 5,
  maxLength: 20,
  min: 18,
  max: 100,
  pattern: /^[A-Za-z]+$/
}
```

### Custom Validators

```typescript
validators: {
  customValidation: (control: AbstractControl) => {
    const value = control.value
    if (value && value.length < 3) {
      return { tooShort: 'Value must be at least 3 characters' }
    }
    return null
  }
}
```

### Custom Error Messages

```typescript
// In your app config
providers: [
  {
    provide: VALIDATION_ERROR_MESSAGES,
    useValue: {
      required: () => 'This field is required',
      email: () => 'Please enter a valid email',
      minLength: params => `Minimum ${params.requiredLength} characters`,
      maxLength: params => `Maximum ${params.requiredLength} characters`,
      custom: params => params.message
    }
  }
]
```

---

## 🎨 Styling & Customization

### Settings System

The form system uses a centralized `Settings` configuration that allows you to customize every aspect of your forms using CSS classes from any framework or custom CSS.

### Providing Custom Settings

```typescript
import { SETTINGS } from './utils/settings.token'
import { Settings } from './interfaces/settings.interfaces'

// Define your custom settings
export const mySettings: Settings = {
  labelClasses: 'my-label-class',
  inputClasses: 'my-input-class',
  errorClasses: 'my-error-class',
  // ... more settings
}

// Provide in your component or app config
@Component({
  providers: [
    {
      provide: SETTINGS,
      useValue: mySettings
    }
  ]
})
```

### Settings Interface

```typescript
interface Settings {
  // Global classes
  wrapperClasses?: string // Wrapper around each field
  labelClasses?: string // Label styling
  errorClasses?: string // Error message styling
  helpTextClasses?: string // Help text styling
  inputClasses?: string // Input field styling

  // Array controls
  legendClasses?: string
  arrayControlRemoveButtonClasses?: string
  arrayControlAddButtonClasses?: string
  arrayControlRemoveButtonLabel?: string
  arrayControlAddButtonLabel?: string
  arrayControlRemoveButtonIcon?: Type<unknown>
  arrayControlAddButtonIcon?: Type<unknown>
  arrayControlRemoveButtonIconClasses?: string
  arrayControlAddButtonIconClasses?: string

  // Multi-select controls
  multiSelectControlRemoveButtonClasses?: string
  multiSelectControlRemoveButtonIcon?: Type<unknown>
  multiselectDropdownClasses?: string
  multiselectDropdownItemClasses?: string
  multiselectDropdownItemSelectedClasses?: string
  multiSelectEmptyText?: string

  // Chips list controls
  chipslistContainerClasses?: string
  chipslistChipClasses?: string
  chipslistInputClasses?: string
  chipslistRemoveButtonClasses?: string
  chipslistAddButtonClasses?: string

  // Autocomplete controls
  autocompleteInputClasses?: string
  autocompleteDropdownClasses?: string
  autocompleteDropdownItemClasses?: string
  autocompleteDropdownItemSelectedClasses?: string
  autocompleteLoadingText?: string
  autocompleteLoadingIcon?: Type<unknown>
  autocompleteLoadingIconClasses?: string
}
```

### Example with Bootstrap

```typescript
export const bootstrapSettings: Settings = {
  labelClasses: 'form-label',
  inputClasses: 'form-control',
  errorClasses: 'invalid-feedback d-block',
  helpTextClasses: 'form-text',

  arrayControlAddButtonClasses: 'btn btn-success btn-sm',
  arrayControlRemoveButtonClasses: 'btn btn-danger btn-sm',

  multiselectDropdownClasses: 'dropdown-menu show',
  multiselectDropdownItemClasses: 'dropdown-item'
}
```

### Example with Custom CSS

```typescript
export const customSettings: Settings = {
  labelClasses: 'field-label',
  inputClasses: 'field-input',
  errorClasses: 'field-error',

  arrayControlAddButtonClasses: 'btn-add',
  arrayControlRemoveButtonClasses: 'btn-remove'
}
```

```css
/* Your custom CSS */
.field-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.field-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.field-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.field-error {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

### Built-in Icon Components

The system includes three built-in SVG icon components:

- **RoundedPlusIcon** - For add buttons
- **RoundedMinusIcon** - For remove buttons
- **XIcon** - For close/delete actions

All icons use `currentColor` to inherit text color and are fully responsive.

### Creating Custom Icons

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'my-custom-icon',
  template: `<svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24">
    <path
      d="..."
      fill="currentColor" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCustomIcon {}

// Use in settings
export const settings: Settings = {
  arrayControlAddButtonIcon: MyCustomIcon,
  arrayControlAddButtonIconClasses: 'icon-size-md'
}
```

### Complete Settings Example

```typescript
import { RoundedPlusIcon, RoundedMinusIcon, XIcon } from './data/settings'

export const myFormSettings: Settings = {
  // Global
  wrapperClasses: 'form-field',
  labelClasses: 'form-label',
  errorClasses: 'form-error',
  helpTextClasses: 'form-help',
  inputClasses: 'form-input',

  // Array controls
  legendClasses: 'form-legend',
  arrayControlAddButtonClasses: 'btn btn-add',
  arrayControlAddButtonLabel: 'Add Item',
  arrayControlAddButtonIcon: RoundedPlusIcon,
  arrayControlAddButtonIconClasses: 'icon-sm',
  arrayControlRemoveButtonClasses: 'btn btn-remove',
  arrayControlRemoveButtonLabel: 'Remove',
  arrayControlRemoveButtonIcon: RoundedMinusIcon,
  arrayControlRemoveButtonIconClasses: 'icon-sm',

  // Multi-select
  multiSelectEmptyText: 'No items selected',
  multiselectDropdownClasses: 'dropdown-panel',
  multiselectDropdownItemClasses: 'dropdown-item',
  multiselectDropdownItemSelectedClasses: 'dropdown-item-selected',
  multiSelectControlRemoveButtonIcon: XIcon,

  // Autocomplete
  autocompleteInputClasses: 'form-input autocomplete-input',
  autocompleteDropdownClasses: 'autocomplete-dropdown',
  autocompleteDropdownItemClasses: 'autocomplete-item',
  autocompleteLoadingText: 'Loading...',

  // Chips
  chipslistContainerClasses: 'chips-container',
  chipslistChipClasses: 'chip',
  chipslistInputClasses: 'chip-input'
}
```

---

## 🔧 API Reference

### Control Interface

```typescript
interface BaseControl {
  name: string // Unique identifier
  label?: string // Display label
  value?: unknown // Initial value
  disabled?: boolean | Function // Disabled state
  helpText?: string // Help text
  validators?: ControlValidators // Validation rules
  options?: Items | Function // Options for select/radio
}
```

### Input Control

```typescript
interface InputControl extends BaseControl {
  controlType: 'input'
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
}
```

### Select Control

```typescript
interface SelectControl extends BaseControl {
  controlType: 'select'
  options: Array<{ label: string; value: unknown }> | Function
}
```

### Autocomplete Control

```typescript
interface AutocompleteControl<T> extends BaseControl {
  controlType: 'autocomplete'
  autocompleteOptions: (form: FormGroup, query: string) => Observable<T[]> | Promise<T[]> | T[]
  itemLabel?: string
  itemValue?: string
  resetOnChange?: string[]
}
```

### Array Control

```typescript
interface ArrayControl extends BaseControl {
  controlType: 'array'
  controls: Control[]
}
```

### Group Control

```typescript
interface GroupControl extends BaseControl {
  controlType: 'group'
  controls: Control[]
}
```

---

## 📚 Examples

### Complete Form Example

```typescript
const formConfig: Control[] = [
  {
    name: 'personalInfo',
    label: 'Personal Information',
    controlType: 'group',
    controls: [
      {
        name: 'firstName',
        label: 'First Name',
        controlType: 'input',
        type: 'text',
        validators: { required: true }
      },
      {
        name: 'lastName',
        label: 'Last Name',
        controlType: 'input',
        type: 'text',
        validators: { required: true }
      },
      {
        name: 'email',
        label: 'Email',
        controlType: 'input',
        type: 'email',
        validators: { required: true, email: true }
      }
    ]
  },
  {
    name: 'country',
    label: 'Country',
    controlType: 'autocomplete',
    autocompleteOptions: (form, query) => of(countries.filter(c => c.name.includes(query))),
    itemLabel: 'name',
    itemValue: 'code'
  },
  {
    name: 'skills',
    label: 'Skills',
    controlType: 'chips-list',
    placeholder: 'Add skill'
  },
  {
    name: 'experience',
    label: 'Work Experience',
    controlType: 'array',
    controls: [
      {
        name: 'company',
        label: 'Company',
        controlType: 'input',
        type: 'text'
      },
      {
        name: 'position',
        label: 'Position',
        controlType: 'input',
        type: 'text'
      },
      {
        name: 'years',
        label: 'Years',
        controlType: 'input',
        type: 'number'
      }
    ]
  }
]
```

---

## 🛠️ Development

### Project Structure

```
src/app/
├── components/
│   ├── fields/              # Main form renderer
│   ├── error-message/       # Error display
│   └── help-text/          # Help text display
├── controls/
│   ├── input-field/
│   ├── select-field/
│   ├── autocomplete-field/
│   ├── array-field/
│   └── ...
├── directives/
│   ├── activate-control.directive.ts
│   └── validator-message.directive.ts
├── interfaces/
│   └── forms.interfaces.ts  # Type definitions
├── data/
│   └── settings.ts          # Default settings & icon components
├── services/
│   └── control-resolver.service.ts
├── interfaces/
│   ├── forms.interfaces.ts  # Form control types
│   └── settings.interfaces.ts # Settings interface
└── utils/
    ├── settings.token.ts    # Settings injection token
    └── validation-error-messages.token.ts
```

### Running Tests

```bash
ng test
```

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```
