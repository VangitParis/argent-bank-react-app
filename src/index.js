import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// on importe le Provider
import { Provider } from "react-redux";
// on importe le store
import { store } from '../src/utils/store';

import App from "./components/Router/App";
import Header from "./components/Layouts/Header/header";
import Footer from "./components/Layouts/Footer/footer";
import "./styles/sass/main.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
