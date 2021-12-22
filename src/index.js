import { BrowserRouter } from "react-router-dom";

import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { SelectedContextProvider } from "./store/selected-context";

ReactDOM.render(
  <SelectedContextProvider>
    <BrowserRouter>
      <App />,
    </BrowserRouter>,
  </SelectedContextProvider>,

  document.getElementById("root")
);
