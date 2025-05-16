import React, { useState } from "react";
import { loginUser } from "../api/User_api";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

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

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Token:", credentialResponse.credential);
    toast.success("Google login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 text-green-400 text-center">Sign In</h2>

        <input
          className="w-full p-3 mb-4 rounded bg-gray-800"
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 mb-6 rounded bg-gray-800"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded"
          disabled={signingIn}
        >
          {signingIn ? "Signing In..." : "Sign In"}
        </button>

        <div className="my-4 text-center text-gray-400">or</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google login failed")}
        />

        <p className="mt-6 text-center text-sm text-gray-400">
          Not registered yet?{" "}
          <Link
            to="/register"
            className="text-green-400 underline hover:text-green-300"
          >
            Click here
          </Link>
        </p>
      </form>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SignIn;
