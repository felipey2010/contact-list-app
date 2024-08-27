import React from "react";
import ReactDOM from 'react-dom/client'
import "./styles/index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)
