import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext.jsx";
import { logoutUser } from "../api/User_api.js";

const Logout = () => {
  const navigate = useNavigate();
  const { logout , isAuthenticated } = useAuth();

  useEffect(() => {
      if (!isAuthenticated) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);

  useEffect(() => {
    const performLogoutAPI = async () => {
      try {
        await logoutUser(); 
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    performLogoutAPI();
  }, []);

  useEffect(() => {
    logout();
  }, [logout]);

  const handleSignInRedirect = () => {
    navigate("/signin");
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="bg-[#0d1117] border-2 border-cyan-400 rounded-2xl px-10 py-8 shadow-xl text-white flex flex-col items-center gap-6 max-w-md text-center">
        <h2 className="text-xl font-semibold">You are successfully logged out!</h2>
        <p className="text-gray-300 text-sm">We hope to see you again soon!</p>
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
