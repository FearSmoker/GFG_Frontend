import React from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../context/ThemeContext";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { themeMode } = useTheme();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        themeMode === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="text-center">
        {/* 404 Text */}
        <div className="mb-8">
          <h1
            className={`text-9xl font-bold ${
              themeMode === "dark" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            404
          </h1>
          <div className="relative -mt-8">
            <h2
              className={`text-3xl font-bold ${
                themeMode === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Page Not Found
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p
            className={`text-lg mb-4 ${
              themeMode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Oops! The page you're looking for doesn't exist.
          </p>
          <p
            className={`text-sm ${
              themeMode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Error Icon */}
        <div className="mb-8">
          <svg
            className={`w-24 h-24 mx-auto ${
              themeMode === "dark" ? "text-gray-600" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.709M15 11V9a6 6 0 10-12 0v2m5.5 0a3.5 3.5 0 117 0"
            ></path>
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              themeMode === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Go to Home
          </button>
          <button
            onClick={handleGoBack}
            className={`px-6 py-3 rounded-lg font-semibold border transition-colors duration-200 ${
              themeMode === "dark"
                ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p
            className={`text-sm mb-4 ${
              themeMode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Or try these helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/events")}
              className={`text-sm hover:underline ${
                themeMode === "dark" ? "text-blue-400" : "text-blue-500"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => navigate("/about")}
              className={`text-sm hover:underline ${
                themeMode === "dark" ? "text-blue-400" : "text-blue-500"
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className={`text-sm hover:underline ${
                themeMode === "dark" ? "text-blue-400" : "text-blue-500"
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
