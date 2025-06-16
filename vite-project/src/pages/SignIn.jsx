import React, { useState } from "react";
import { loginUser } from "../api/User_api.js";
import { googleLoginAPI } from "../api/GoogleLogin_api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../context/AuthContext.jsx";
import SignInPageDark from "../components/SignInPage.jsx";
import SignInCard from "../components/SignInCard.jsx";
import "../css/SignInPage.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningIn(true);
    const signingInToast = toast.loading("Signing in...");

    try {
      const { token, refreshToken } = await loginUser(formData);
      await login(token, refreshToken);
      toast.dismiss(signingInToast);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.log("Error caught:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMessage, { id: signingInToast });
    } finally {
      setSigningIn(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const code = credentialResponse.credential;
    try {
      const { accessToken, refreshToken } = await googleLoginAPI(code);
      await login(accessToken, refreshToken);
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <SignInPageDark>
      <SignInCard
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        signingIn={signingIn}
        handleGoogleSuccess={handleGoogleSuccess}
      />
    </SignInPageDark>
  );
};

export default SignIn;
