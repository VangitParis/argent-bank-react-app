// import "normalize.css";
import * as React from "react";
import { StrictMode } from "react";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/Router/App";
import Header from "./components/Layouts/Header/header";
import Footer from "./components/Layouts/Footer/footer";
import "./styles/sass/main.css";


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
reportWebVitals();