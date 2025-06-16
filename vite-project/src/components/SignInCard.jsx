import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";

const SignInCard = ({
  formData,
  signingIn,
  handleChange,
  handleSubmit,
  handleGoogleSuccess,
}) => {
  return (
    <div className="w-full max-w-md p-8 rounded-[45px] shadow-2xl border border-white/20 backdrop-blur-[28px] bg-white/5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white text-sm mb-2">Email</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Password</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#00AA75] border-2 border-[#0E86D2] hover:bg-[#00aa75d1] p-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={signingIn}
        >
          {signingIn ? "Signing In..." : "Submit"}
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-600"></div>
        <span className="px-4 text-gray-400 text-sm">or</span>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google login failed")}
          theme="outline"
          size="large"
          width="100%"
        />
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Not registered yet?{" "}
        <Link
          to="/register"
          className="text-green-400 underline hover:text-green-300 transition-colors duration-200"
        >
          Click here
        </Link>
      </p>
    </div>
  );
};

export default SignInCard;
