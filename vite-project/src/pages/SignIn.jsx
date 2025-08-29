import React, { useState, useEffect, useRef } from "react";
import { loginUser } from "../api/User_api.js";
import { googleLoginAPI } from "../api/GoogleLogin_api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../context/AuthContext.jsx";
import OtherPage1 from "../components/OtherPage1.jsx";
import SignInCard from "../components/SignInCard.jsx";
import "../css/OtherPage1.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signingIn, setSigningIn] = useState(false);
  const isLoggingIn = useRef(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated && !isLoggingIn.current) {
      toast.error("User already signed in");
      navigate("/");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || isAuthenticated) {
    return null;
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningIn(true);
    isLoggingIn.current = true;
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
      isLoggingIn.current = false;
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    isLoggingIn.current = true;
    const code = credentialResponse.credential;
    const googleToast = toast.loading("Signing in with Google...");
    try {
      const { accessToken, refreshToken } = await googleLoginAPI(code);
      await login(accessToken, refreshToken);
      toast.dismiss(googleToast);
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error(error.message || "Google login failed");
      toast.dismiss(googleToast);
    } finally {
      isLoggingIn.current = false;
    }
  };

  return (
    <>
      <OtherPage1 />
      <div className="otherpage1-content min-h-screen flex items-center justify-center p-4">
        <SignInCard
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          signingIn={signingIn}
          handleGoogleSuccess={handleGoogleSuccess}
        />
      </div>
    </>
  );
};

export default SignIn;
