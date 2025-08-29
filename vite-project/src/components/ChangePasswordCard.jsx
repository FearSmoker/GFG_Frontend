import React from "react";
import useTheme from "../context/ThemeContext.jsx";

const ChangePasswordCard = ({
  formData,
  changingPassword,
  handleChange,
  handleSubmit,
}) => {
  const { themeMode } = useTheme();
  
  const textColor = themeMode === "dark" ? "text-white" : "text-[#002b46]";
  const placeholderColor = themeMode === "dark" ? "placeholder-white/50" : "placeholder-[#002b46]/50";
  const borderColor = themeMode === "dark" ? "border-white" : "border-[#002b46]";
  const cardBorderColor = themeMode === "dark" ? "border-white/20" : "border-[#002b46]/20";
  
  return (
    <div className={`w-full max-w-md p-8 rounded-[45px] shadow-2xl border ${cardBorderColor} backdrop-blur-[28px] bg-white/5`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl mb-4 text-green-400 text-center">Change Password</h2>
        
        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Current Password</label>
          <input
            className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="Enter your current password"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className={`block ${textColor} text-sm mb-2`}>New Password</label>
          <input
            className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="Enter your new password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Confirm New Password</label>
          <input
            className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="Confirm your new password"
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#00AA75] border-2 border-[#0E86D2] hover:bg-[#00aa75d1] p-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={changingPassword}
        >
          {changingPassword ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordCard;