import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { TaskContextProvider } from "./context/TaskContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TaskContextProvider>
          <App />
        </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
