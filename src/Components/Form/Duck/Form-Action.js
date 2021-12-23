import * as actionTypes from "./Form-ActionTypes";

export const updateFormFields = data => ({
  type: actionTypes.UPDATE_FORM_FIELDS,
  data
});

export const prefillFormFields = data => ({
  type: actionTypes.PREFILL_FORM_FIELDS,
  data
});
