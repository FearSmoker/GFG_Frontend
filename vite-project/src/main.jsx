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

const GOOGLE_CLIENT_ID = "1077674981172-i6ucmablvvtkoe9fdjm0jb7cdbu8kuir.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Toaster position="top-center" />
          <VisitorProvider>
          <App />
          </VisitorProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>
);