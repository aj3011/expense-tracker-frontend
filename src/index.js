import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "./context/transactionContext";
import { SpeechProvider } from "@speechly/react-client";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Authentication/Context/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

disableReactDevTools();

ReactDOM.render(
  /** Speechly Provider */
  <SpeechProvider appId="a770ce0a-f365-4f60-9d76-0af816d82c0c" language="en-US">
    <AuthProvider>
      <Provider>
        <Router>
          <App />
        </Router>
      </Provider>
    </AuthProvider>
  </SpeechProvider>,
  document.getElementById("root")
);
