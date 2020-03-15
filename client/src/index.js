import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./lib/Store";
import ApplicationContainer from "./components/ApplicationContainer";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ApplicationContainer />
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
