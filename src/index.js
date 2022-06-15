import React from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import config from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJgP8Wg3gGNZte0yn_C0rNHk878NpXi_0",
  authDomain: "wherebus-73b78.firebaseapp.com",
  projectId: "wherebus-73b78",
  storageBucket: "wherebus-73b78.appspot.com",
  messagingSenderId: "992301663771",
  appId: "1:992301663771:web:af2a08179a2826fe5adabe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

Amplify.configure(config);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AmplifyProvider>
    <Router>
      <App />
    </Router>
  </AmplifyProvider>
);
