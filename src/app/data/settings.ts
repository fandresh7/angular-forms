import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Settings } from '../interfaces/settings.interfaces'

@Component({
  selector: 'rounded-plus-icon',
  template: `<svg
    width="100%"
    height="100%"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g>
      <path
        d="M5.5035 10C2.74633 10 0.5 7.75367 0.5 4.9965C0.5 2.23933 2.74633 0 5.5035 0C8.26067 0 10.507 2.24633 10.507 5.0035C10.507 7.76067 8.26067 10.007 5.5035 10.007V10ZM5.5035 0.69979C3.13121 0.69979 1.19979 2.63121 1.19979 5.0035C1.19979 7.37579 3.13121 9.30721 5.5035 9.30721C7.87579 9.30721 9.80721 7.37579 9.80721 5.0035C9.80721 2.63121 7.87579 0.69979 5.5035 0.69979Z"
        fill="currentColor" />
      <path
        d="M5.50391 3.03711C5.69954 3.03734 5.85337 3.19106 5.85352 3.38672V4.65332H7.10645C7.30219 4.65353 7.45605 4.8081 7.45605 5.00391C7.45582 5.1995 7.30204 5.3533 7.10645 5.35352H5.85352V6.60645C5.8533 6.80204 5.6995 6.95582 5.50391 6.95605C5.3081 6.95605 5.15353 6.80219 5.15332 6.60645V5.35352H3.88672C3.69106 5.35337 3.53734 5.19954 3.53711 5.00391C3.53711 4.80806 3.69091 4.65347 3.88672 4.65332H5.15332V3.38672C5.15347 3.19091 5.30806 3.03711 5.50391 3.03711Z"
        fill="currentColor" />
    </g>
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundedPlusIcon {}

@Component({
  selector: 'rounded-minus-icon',
  template: `<svg
    width="100%"
    height="100%"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g>
      <path
        d="M5.5035 10C2.74633 10 0.5 7.75367 0.5 4.9965C0.5 2.23933 2.74633 0 5.5035 0C8.26067 0 10.507 2.24633 10.507 5.0035C10.507 7.76067 8.26067 10.007 5.5035 10.007V10ZM5.5035 0.69979C3.13121 0.69979 1.19979 2.63121 1.19979 5.0035C1.19979 7.37579 3.13121 9.30721 5.5035 9.30721C7.87579 9.30721 9.80721 7.37579 9.80721 5.0035C9.80721 2.63121 7.87579 0.69979 5.5035 0.69979Z"
        fill="currentColor" />
      <path
        d="M7.10602 5.35311H3.88699C3.69105 5.35311 3.53709 5.19916 3.53709 5.00322C3.53709 4.80727 3.69105 4.65332 3.88699 4.65332H7.10602C7.30196 4.65332 7.45592 4.80727 7.45592 5.00322C7.45592 5.19916 7.30196 5.35311 7.10602 5.35311Z"
        fill="currentColor" />
    </g>
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundedMinusIcon {}

@Component({
  selector: 'x-icon',
  template: `<svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    <line
      x1="18"
      y1="6"
      x2="6"
      y2="18" />
    <line
      x1="6"
      y1="6"
      x2="18"
      y2="18" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XIcon {}

export const settings: Settings = {
  wrapperClasses: 'flex flex-col gap-2',
  labelClasses: 'block text-sm font-medium text-gray-900 mb-1.5',
  errorClasses: 'text-xs text-red-600 mt-1.5',
  helpTextClasses: 'text-xs text-gray-500 mt-1',
  inputClasses:
    'w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md transition-colors duration-150 placeholder:text-gray-400 focus:outline-none focus:border-black hover:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
  validationFeedbackClasses: '',
  // Select controls
  selectClasses:
    'w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md transition-colors duration-150 focus:outline-none focus:border-black hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer',
  // Checkbox controls
  checkboxWrapperClasses: 'flex items-center gap-2',
  checkboxInputClasses: 'w-4 h-4 text-black bg-white border border-gray-300 rounded transition-all duration-150 focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer',
  checkboxLabelTextClasses: 'text-sm text-gray-900 cursor-pointer select-none',
  // Checkbox Group controls
  checkboxGroupContainerClasses: 'flex flex-col gap-2.5 mt-2',
  checkboxGroupItemWrapperClasses: 'flex items-center gap-2',
  checkboxGroupItemInputClasses: 'w-4 h-4 text-black bg-white border border-gray-300 rounded transition-all duration-150 focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer',
  checkboxGroupItemLabelClasses: 'text-sm text-gray-900 cursor-pointer select-none',
  // Radio controls
  radioGroupContainerClasses: 'flex flex-col gap-2.5 mt-2',
  radioItemWrapperClasses: 'flex items-center gap-2',
  radioItemInputClasses: 'w-4 h-4 text-black bg-white border border-gray-300 transition-all duration-150 focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer',
  radioItemLabelClasses: 'text-sm text-gray-900 cursor-pointer select-none',
  // Group controls
  groupContainerClasses: 'border border-gray-200 rounded-lg p-4',
  groupLegendClasses: 'text-sm font-semibold text-gray-900 mb-3',
  // Array controls
  legendClasses: 'block text-sm font-semibold text-gray-900 mb-3',
  arrayItemContainerClasses: 'mb-4 p-3 border border-gray-200 rounded-lg flex gap-3 items-start',
  arrayControlRemoveButtonClasses: 'inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150',
  arrayControlAddButtonClasses: 'mt-3 inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors duration-150',
  arrayControlRemoveButtonLabel: 'Remove',
  arrayControlAddButtonLabel: 'Add Item',
  arrayControlRemoveButtonIconClasses: 'w-3.5 h-3.5',
  arrayControlAddButtonIconClasses: 'w-4 h-4',
  arrayControlRemoveButtonIcon: RoundedMinusIcon,
  arrayControlAddButtonIcon: RoundedPlusIcon,
  // multiselect controls
  multiSelectControlRemoveButtonLabel: '',
  multiSelectControlRemoveButtonIcon: XIcon,
  multiSelectControlRemoveButtonIconClasses: 'w-3 h-3',
  multiSelectControlRemoveButtonClasses: 'ml-1 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors duration-150',
  multiSelectEmptyText: 'Select options...',
  multiselectDropdownClasses:
    'w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md transition-colors duration-150 focus:outline-none focus:border-black hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer',
  multiselectDropdownItemClasses: 'py-2 px-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 text-sm',
  multiselectDropdownItemHoverClasses: 'bg-gray-100',
  multiselectDropdownItemSelectedClasses: 'bg-gray-100 font-medium',
  multiselectDropdownItemDisabledClasses: 'opacity-50 cursor-not-allowed',
  multiSelectDisplayedOptionsClasses: 'flex flex-wrap gap-1.5 mt-2',
  multiSelectDisplayedOptionClasses: 'inline-flex items-center gap-1.5 h-6 px-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-150',
  //chipslist controls
  chipslistRemoveButtonLabel: '',
  chipslistRemoveButtonIcon: XIcon,
  chipslistRemoveButtonIconClasses: 'w-3 h-3',
  chipslistRemoveButtonClasses: 'ml-1 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors duration-150',
  chipslistAddButtonLabel: 'Add',
  chipslistAddButtonIcon: RoundedPlusIcon,
  chipslistAddButtonIconClasses: 'w-4 h-4',
  chipslistAddButtonClasses: 'inline-flex items-center justify-center gap-2 h-8 px-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150',
  chipslistInputClasses:
    'w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md transition-colors duration-150 placeholder:text-gray-400 focus:outline-none focus:border-black hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed',
  chipslistContainerClasses: 'flex flex-wrap gap-1.5 mb-2',
  chipslistChipClasses: 'inline-flex items-center gap-1.5 h-6 px-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-150',
  chipslistAddWrapperClasses: 'flex flex-col gap-2',
  chipslistAddButtonLabelClasses: 'text-sm font-medium',
  chipslistRemoveButtonLabelClasses: 'text-sm font-medium',
  // autocomplete controls
  autocompleteInputClasses:
    'w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md transition-colors duration-150 placeholder:text-gray-400 focus:outline-none focus:border-black hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed',
  autocompleteDropdownClasses: 'bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto mt-1',
  autocompleteDropdownItemClasses: 'py-2 px-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 text-sm',
  autocompleteDropdownItemHoverClasses: 'bg-gray-100',
  autocompleteDropdownItemSelectedClasses: 'bg-gray-100 font-medium',
  autocompleteLoadingText: 'Loading...',
  autocompleteLoadingTextClasses: 'text-xs text-gray-500',
  autocompleteLoadingIcon: RoundedPlusIcon,
  autocompleteLoadingIconClasses: 'w-3.5 h-3.5 animate-spin text-gray-500',
  autocompleteLoadingWrapperClasses: 'absolute right-3 top-1/2 -translate-y-1/2'
}
