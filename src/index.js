import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import axios from "axios";

axios.defaults.baseURL = "https://api-contact-app.herokuapp.com/api/";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
