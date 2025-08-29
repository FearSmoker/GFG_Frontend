import React from "react";
import useTheme from "../context/ThemeContext.jsx";

const UpdateProfileCard = ({
  tempUserData,
  onCancel,
  onSave,
  onChange
}) => {
  const { themeMode } = useTheme();
  
  const textColor = themeMode === "dark" ? "text-white" : "text-[#002b46]";
  const placeholderColor = themeMode === "dark" ? "placeholder-white/50" : "placeholder-[#002b46]/50";
  const borderColor = themeMode === "dark" ? "border-white" : "border-[#002b46]";
  const cardBorderColor = themeMode === "dark" ? "border-white/20" : "border-[#002b46]/20";
  
  return (
    <div className={`w-full max-w-xl p-8 rounded-[45px] shadow-2xl border ${cardBorderColor} backdrop-blur-[28px] bg-white/10`}>
      <div className="space-y-6">
        <h2 className="text-2xl mb-4 text-green-400 text-center">Update Profile</h2>
        
        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Username</label>
          <input
            className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="Enter your username"
            name="username"
            type="text"
            value={tempUserData.username || ""}
            onChange={onChange}
            disabled
          />
        </div>

        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Full Name</label>
          <input
            className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="Enter your full name"
            name="fullName"
            type="text"
            value={tempUserData.fullName || ""}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Email</label>
          <input
            className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="Enter your email"
            name="email"
            type="email"
            value={tempUserData.email || ""}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Mobile No.</label>
          <input
            className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="Enter your mobile number"
            name="mobileNo"
            type="tel"
            value={tempUserData.mobileNo || ""}
            onChange={onChange}
            required
          />
        </div>

        <div className="space-y-3 mt-8">
          <button
            onClick={onSave}
            className="w-full bg-[#00AA75] border-2 border-[#0E86D2] hover:bg-[#00aa75d1] p-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200"
          >
            Save Changes
          </button>
          
          <button
            onClick={onCancel}
            className="w-full bg-transparent border-2 border-gray-500 hover:border-gray-400 hover:bg-gray-500/20 p-3 rounded-full text-gray-500 hover:text-gray-300 text-lg font-semibold shadow-md transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileCard;