import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./context/AuthProvider.jsx";
import { Toaster } from 'react-hot-toast';
import { VisitorProvider } from "./context/VisitorProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
     <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>
        <ThemeProvider>
          <Toaster position="top-center" />
          <VisitorProvider>
          <App />
          </VisitorProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
    </AuthProvider>
);
