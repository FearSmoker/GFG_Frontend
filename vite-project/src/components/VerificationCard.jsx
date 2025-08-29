import React from "react";
import useTheme from "../context/ThemeContext.jsx";

const VerificationCard = ({
  otp,
  verifying,
  backendError,
  handleChange,
  handleSubmit,
  handleResendOtp,
  userEmail
}) => {
  const { themeMode } = useTheme();
  
  const textColor = themeMode === "dark" ? "text-white" : "text-[#002b46]";
  const placeholderColor = themeMode === "dark" ? "placeholder-white/50" : "placeholder-[#002b46]/50";
  const borderColor = themeMode === "dark" ? "border-white" : "border-[#002b46]";
  const cardBorderColor = themeMode === "dark" ? "border-white/20" : "border-[#002b46]/20";
  const subtleTextColor = themeMode === "dark" ? "text-white/70" : "text-[#002b46]/70";
  const faintTextColor = themeMode === "dark" ? "text-white/50" : "text-[#002b46]/50";
  const dimTextColor = themeMode === "dark" ? "text-white/60" : "text-[#002b46]/60";
  
  return (
    <div className={`w-full max-w-md p-8 rounded-[45px] shadow-2xl border ${cardBorderColor} backdrop-blur-[28px] bg-white/5`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl mb-4 text-green-400 text-center">Verify Email</h2>
        
        <p className={`text-center ${subtleTextColor} text-sm mb-6`}>
          Please enter the verification code sent to {userEmail}
        </p>
        
        {backendError && (
          <div className="mb-4 p-3 bg-red-900 border border-red-500 rounded text-red-300 text-sm">
            {backendError}
          </div>
        )}
        
        <div>
          <label className={`block ${textColor} text-sm mb-2`}>OTP Code</label>
          <input
            className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-green-400 text-center text-lg tracking-widest`}
            placeholder="Enter 6-digit code"
            name="otp"
            type="text"
            value={otp}
            onChange={handleChange}
            maxLength="6"
            required
          />
        </div>
        
        <p className={`text-center ${faintTextColor} text-xs mb-4`}>
          OTP is valid for 10 minutes
        </p>
        
        <button
          type="submit"
          className="w-full bg-[#00AA75] border-2 border-[#0E86D2] hover:bg-[#00aa75d1] p-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={verifying || otp.length !== 6}
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>
        
        <div className="text-center">
          <p className={`${dimTextColor} text-sm mb-2`}>Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-green-400 hover:text-green-300 text-sm underline transition-colors duration-200"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationCard;