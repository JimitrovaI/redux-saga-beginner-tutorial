import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";

import formFields from "./src/Components/Form/Duck/Form-Reducer";
import formSaga from "./src/Components/Form/Duck/Form-Operation";
import Form from "./src/Components/Form/Form";
// import "./styles.css";

const allReducers = {
  formFields: formFields
};

const rootReducer = combineReducers(allReducers);

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(formSaga);

window.store = store;

class App extends React.Component {
  render() {
    return [
      <Provider store={store}>
        <Form />
      </Provider>
    ];
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
