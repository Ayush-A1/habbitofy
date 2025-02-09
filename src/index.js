import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { persistor, store } from "./store";
import "./index.css";
import App from "./App";
import GenralState from './context/GenralState'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GenralState>
            <App />
          </GenralState>
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
