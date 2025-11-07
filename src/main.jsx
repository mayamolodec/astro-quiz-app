import { StrictMode } from "react"
import React from "react";
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./App.jsx"
import { AuthProvider } from "./context/AuthContext.jsx";
import { store } from "./store/index.js"

import "./index.scss"

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
  </StrictMode>,
)
