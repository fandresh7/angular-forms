import { Type } from '@angular/core'

export interface Settings {
  // global
  wrapperClasses?: string
  labelClasses?: string
  errorClasses?: string
  helpTextClasses?: string
  inputClasses?: string
  validationFeedbackClasses?: string
  // Select controls
  selectClasses?: string
  selectOptionClasses?: string
  // Checkbox controls
  checkboxWrapperClasses?: string
  checkboxInputClasses?: string
  checkboxLabelTextClasses?: string
  // Checkbox Group controls
  checkboxGroupContainerClasses?: string
  checkboxGroupItemWrapperClasses?: string
  checkboxGroupItemInputClasses?: string
  checkboxGroupItemLabelClasses?: string
  // Radio controls
  radioGroupContainerClasses?: string
  radioItemWrapperClasses?: string
  radioItemInputClasses?: string
  radioItemLabelClasses?: string
  // Group controls
  groupContainerClasses?: string
  groupLegendClasses?: string
  // Array controls
  legendClasses?: string
  arrayControlRemoveButtonClasses?: string
  arrayControlAddButtonClasses?: string
  arrayControlRemoveButtonLabel?: string
  arrayControlAddButtonLabel?: string
  arrayControlRemoveButtonIconClasses?: string
  arrayControlAddButtonIconClasses?: string
  arrayControlRemoveButtonIcon?: Type<unknown>
  arrayControlAddButtonIcon?: Type<unknown>
  // MultiSelect controls
  multiSelectControlRemoveButtonLabel?: string
  multiSelectControlRemoveButtonIcon?: Type<unknown>
  multiSelectControlRemoveButtonIconClasses?: string
  multiSelectControlRemoveButtonClasses?: string
  multiselectDropdownClasses?: string
  multiselectDropdownItemClasses?: string
  multiselectDropdownItemHoverClasses?: string
  multiselectDropdownItemSelectedClasses?: string
  multiselectDropdownItemDisabledClasses?: string
  multiSelectEmptyText?: string
  multiSelectDisplayedOptionsClasses?: string
  multiSelectDisplayedOptionClasses?: string
  chipslistRemoveButtonLabelClasses?: string
  // chipslist controls
  chipslistRemoveButtonLabel?: string
  chipslistRemoveButtonIcon?: Type<unknown>
  chipslistRemoveButtonIconClasses?: string
  chipslistRemoveButtonClasses?: string
  chipslistAddButtonLabel?: string
  chipslistAddButtonIcon?: Type<unknown>
  chipslistAddButtonIconClasses?: string
  chipslistAddButtonClasses?: string
  chipslistInputClasses?: string
  chipslistContainerClasses?: string
  chipslistChipClasses?: string
  chipslistAddWrapperClasses?: string
  chipslistAddButtonLabelClasses?: string
  // autocomplete controls
  autocompleteInputClasses?: string
  autocompleteDropdownClasses?: string
  autocompleteDropdownItemClasses?: string
  autocompleteDropdownItemHoverClasses?: string
  autocompleteDropdownItemSelectedClasses?: string
  autocompleteLoadingText?: string
  autocompleteLoadingTextClasses?: string
  autocompleteLoadingIcon?: Type<unknown>
  autocompleteLoadingIconClasses?: string
  autocompleteLoadingWrapperClasses?: string
}
