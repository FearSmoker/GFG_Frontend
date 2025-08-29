import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext.jsx";
import { logoutUser } from "../api/User_api.js";
import { toast } from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 8000);

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const performLogout = async () => {
      const loggingOutToast = toast.loading("Logging out...");
      try {
        await logoutUser();
        logout();
        toast.success("Logout successful!", { id: loggingOutToast });
      } catch (error) {
        console.error("Logout API failed:", error);
        logout();
        toast.error("Logout failed.", { id: loggingOutToast });
      }
    };

    performLogout();
  }, [logout]);

  const handleSignInRedirect = () => {
    navigate("/signin");
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="bg-[#0d1117] border-2 border-cyan-400 rounded-2xl px-10 py-8 shadow-xl text-white flex flex-col items-center gap-6 max-w-md text-center">
        <h2 className="text-xl font-semibold">
          You are successfully logged out!
        </h2>
        <p className="text-gray-300 text-sm">We hope to see you again soon!</p>
        <p className="text-gray-400 text-sm">
          Redirecting to home page in {countdown} seconds...
        </p>
        <button
          onClick={handleSignInRedirect}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Logout;
