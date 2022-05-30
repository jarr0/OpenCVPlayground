import { BrowserRouter } from "react-router-dom";

import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { SelectedContextProvider } from "./store/selected-context";
import { ImageStateContextProvider } from "./store/image-state-context";

ReactDOM.render(
  <SelectedContextProvider>
    <ImageStateContextProvider>
      <BrowserRouter>
        <App />,
      </BrowserRouter>
    </ImageStateContextProvider>
  </SelectedContextProvider>,

  document.getElementById("root")
);
