import React from "react";
import useTheme from "../context/ThemeContext.jsx";

const ProfileCard = ({
  userData,
  avatar,
  onUpdateProfile,
  onChangePassword,
  onUpdateAvatar,
  onAvatarClick
}) => {
  const { themeMode } = useTheme();
  
  const textColor = themeMode === "dark" ? "text-white" : "text-[#002b46]";
  const borderColor = themeMode === "dark" ? "border-white" : "border-[#002b46]";
  const cardBorderColor = themeMode === "dark" ? "border-white/20" : "border-[#002b46]/20";
  
  const handleChangePasswordClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onChangePassword();
  };
  
  return (
    <div className={`w-full max-w-xl p-8 rounded-[45px] shadow-2xl border ${cardBorderColor} backdrop-blur-[28px] bg-white/10`}>
      <div className="space-y-6">
        <h2 className="text-2xl mb-4 text-green-400 text-center">My Profile</h2>
        
        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 group-hover:opacity-80 transition cursor-pointer" onClick={onAvatarClick}>
              <img 
                src={avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <button
              className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white backdrop-blur-sm bg-opacity-90 transition-all duration-200"
              onClick={onUpdateAvatar}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Fields */}
        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Username</label>
          <div className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor}`}>
            @{userData.username || ""}
          </div>
        </div>

        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Full Name</label>
          <div className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor}`}>
            {userData.fullName || ""}
          </div>
        </div>

        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Email</label>
          <div className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor}`}>
            {userData.email || ""}
          </div>
        </div>

        <div>
          <label className={`block ${textColor} text-sm mb-2`}>Mobile No.</label>
          <div className={`w-full p-3 rounded-lg bg-transparent border-b ${borderColor} ${textColor}`}>
            {userData.mobileNo || ""}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-8">
          <button
            onClick={onUpdateProfile}
            className="w-full bg-[#00AA75] border-2 border-[#0E86D2] hover:bg-[#00aa75d1] p-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200"
          >
            Update Profile
          </button>
          
          <button
            onClick={handleChangePasswordClick}
            className="w-full bg-transparent border-2 border-gray-500 hover:border-gray-400 hover:bg-gray-500/20 p-3 rounded-full text-gray-500 hover:text-gray-300 text-lg font-semibold shadow-md transition-all duration-200"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;