import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

import Auth from "./Auth";
const auth = new Auth();

const store = createStore(rootReducer);

let state = {};
window.setState = changes => {
  state = Object.assign({}, state, changes);

  ReactDOM.render(
    <Provider store={store}>
      <App {...state} />
    </Provider>,
    document.getElementById("root")
  );
};

/* eslint no-restricted-globals: 0*/

let initialState = {
  name: "User",
  //location: location.pathname.replace(/^\/?|\/$/g, ""),
  auth
};

window.setState(initialState);

//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
