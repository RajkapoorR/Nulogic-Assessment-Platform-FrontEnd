import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <GoogleOAuthProvider clientId="288445802083-nbiv2ud73pc1au7gbj4tao1h2ta5ehgl.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </HelmetProvider>
);
reportWebVitals();
