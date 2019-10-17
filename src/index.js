import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import App from "./components/app-container";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";

import {createStore, applyMiddleware} from "redux";
import {Provider } from "react-redux";
import thunk from "redux-thunk";
import AppReducer from "./reducers";
import {SnackbarProvider} from "notistack";

import challenges from "./challenges";

import { pathPrefix } from "../package.json";

const store = createStore(AppReducer, applyMiddleware(thunk));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router basename={pathPrefix}>
          <App challenges={challenges} />
        </Router>
      </SnackbarProvider>
    </Provider>
  </ThemeProvider>,
  document.querySelector("#root"),
);
