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
  wrapperClasses: 'flex flex-col gap-1.5',
  labelClasses: 'block text-sm font-semibold text-gray-800 mb-1.5',
  errorClasses: 'text-xs text-red-600 font-medium',
  helpTextClasses: 'text-xs text-gray-500 italic',
  inputClasses:
    'w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
  validationFeedbackClasses: 'validation-feedback',
  // Select controls
  selectClasses:
    'w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed appearance-none cursor-pointer',
  // Checkbox controls
  checkboxWrapperClasses: 'flex items-center gap-3 py-1',
  checkboxInputClasses: 'w-5 h-5 text-blue-600 border-2 border-gray-300 rounded transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer hover:border-blue-400',
  checkboxLabelTextClasses: 'text-sm font-medium text-gray-700 cursor-pointer select-none',
  // Checkbox Group controls
  checkboxGroupContainerClasses: 'flex flex-col gap-3 mt-2',
  checkboxGroupItemWrapperClasses: 'flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors duration-150',
  checkboxGroupItemInputClasses: 'w-5 h-5 text-blue-600 border-2 border-gray-300 rounded transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer hover:border-blue-400',
  checkboxGroupItemLabelClasses: 'text-sm font-medium text-gray-700 cursor-pointer select-none',
  // Radio controls
  radioGroupContainerClasses: 'flex flex-col gap-3 mt-2',
  radioItemWrapperClasses: 'flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors duration-150',
  radioItemInputClasses: 'w-5 h-5 text-blue-600 border-2 border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer hover:border-blue-400',
  radioItemLabelClasses: 'text-sm font-medium text-gray-700 cursor-pointer select-none',
  // Group controls
  groupContainerClasses: 'border-2 border-gray-200 rounded-xl p-6 bg-gray-50/50',
  groupLegendClasses: 'text-base font-bold text-gray-800 px-3 bg-white',
  // Array controls
  legendClasses: 'block text-base font-bold text-gray-800 mb-4',
  arrayItemContainerClasses: 'mb-4 p-4 border-2 border-gray-200 rounded-xl bg-white flex gap-2 items-center',
  arrayControlRemoveButtonClasses:
    'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-white bg-white hover:bg-red-500 border-2 border-red-200 hover:border-red-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow',
  arrayControlAddButtonClasses: 'mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg',
  arrayControlRemoveButtonLabel: 'Remove',
  arrayControlAddButtonLabel: 'Add Item',
  arrayControlRemoveButtonIconClasses: 'w-3.5 h-3.5',
  arrayControlAddButtonIconClasses: 'w-4 h-4',
  arrayControlRemoveButtonIcon: RoundedMinusIcon,
  arrayControlAddButtonIcon: RoundedPlusIcon,
  // multiselect controls
  multiSelectControlRemoveButtonLabel: '',
  multiSelectControlRemoveButtonIcon: XIcon,
  multiSelectControlRemoveButtonIconClasses: 'w-3.5 h-3.5',
  multiSelectControlRemoveButtonClasses: 'ml-2 inline-flex items-center justify-center w-5 h-5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-150',
  multiSelectEmptyText: 'Nothing is selected...',
  multiselectDropdownClasses:
    'bg-white w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed cursor-pointer',
  multiselectDropdownItemClasses: 'py-2.5 px-4 hover:bg-blue-50 cursor-pointer transition-colors duration-150 rounded-md',
  multiselectDropdownItemHoverClasses: 'bg-blue-50',
  multiselectDropdownItemSelectedClasses: 'bg-blue-100 text-blue-700 font-medium',
  multiselectDropdownItemDisabledClasses: 'bg-gray-50 text-gray-400 cursor-not-allowed',
  multiSelectDisplayedOptionsClasses: 'flex flex-wrap gap-2 mt-2',
  multiSelectDisplayedOptionClasses: 'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-150',
  //chipslist controls
  chipslistRemoveButtonLabel: '',
  chipslistRemoveButtonIcon: XIcon,
  chipslistRemoveButtonIconClasses: 'w-3.5 h-3.5',
  chipslistRemoveButtonClasses: 'ml-2 inline-flex items-center justify-center w-5 h-5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-150',
  chipslistAddButtonLabel: 'Add',
  chipslistAddButtonIcon: RoundedPlusIcon,
  chipslistAddButtonIconClasses: 'w-4 h-4',
  chipslistAddButtonClasses:
    'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-white bg-white hover:bg-blue-600 border-2 border-blue-200 hover:border-blue-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow',
  chipslistInputClasses:
    'w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed',
  chipslistContainerClasses: 'flex flex-wrap gap-2 mb-3',
  chipslistChipClasses: 'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-150',
  chipslistAddWrapperClasses: 'flex flex-col gap-3',
  chipslistAddButtonLabelClasses: 'text-sm font-medium',
  chipslistRemoveButtonLabelClasses: 'text-sm font-medium',
  // autocomplete controls
  autocompleteInputClasses:
    'w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed',
  autocompleteDropdownClasses: 'bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-60 overflow-auto',
  autocompleteDropdownItemClasses: 'py-2.5 px-4 hover:bg-blue-50 cursor-pointer transition-colors duration-150 text-sm',
  autocompleteDropdownItemHoverClasses: 'bg-blue-50',
  autocompleteDropdownItemSelectedClasses: 'bg-blue-100 text-blue-700 font-medium',
  autocompleteLoadingText: 'Loading...',
  autocompleteLoadingTextClasses: 'text-xs text-gray-500 font-medium',
  autocompleteLoadingIcon: RoundedPlusIcon,
  autocompleteLoadingIconClasses: 'w-4 h-4 animate-spin text-blue-500',
  autocompleteLoadingWrapperClasses: 'absolute right-4 top-1/2 -translate-y-1/2'
}
