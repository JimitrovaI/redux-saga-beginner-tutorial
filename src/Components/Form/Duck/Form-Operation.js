import * as formActions from "./Form-Action";
import * as formActionTypes from "./Form-ActionTypes";
import { put, takeEvery } from "redux-saga";

function* updateFormFields(action) {
  yield put(formActions.updateFormFields(action.data));
  const response = yield fetch('https://test.api/test', {
    method: 'POST',
    body: action.data
  });
}

export default function* watcherUpdateFormFields() {
  yield takeEvery(formActionTypes.UPDATE_FORM_FIELDS, updateFormFields);
}
