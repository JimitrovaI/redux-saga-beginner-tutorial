import * as actionTypes from "./Form-ActionTypes";
import initalState from "../../../../initalState";

const reducer = (state = initalState.formFields, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM_FIELDS:
      const event = action.data;
      switch (event.target.name) {
        case "name":
          return {
            ...state,
            name: event.target.value
          };
        case "address":
          return {
            ...state,
            address: event.target.value
          };
        case "zipCode":
          return {
            ...state,
            zipCode: event.target.value
          };
        case "phone":
          return {
            ...state,
            phone: event.target.value
          };
        case "emailId":
          return {
            ...state,
            emailId: event.target.value
          };
        case "password":
          return {
            ...state,
            password: event.target.value
          };
        case "passwordConfirm":
          return {
            ...state,
            passwordConfirm: event.target.value
          };
        default:
          return state;
      }
    case actionTypes.PREFILL_FORM_FIELDS:
      const data = action.data;
      return {
        ...state,
        name: data.name,
        address: data.address,
        zipCode: data.zipCode,
        phone: data.phone,
        emailId: data.emailId
      };
    default:
      return state;
  }
};

export default reducer;
