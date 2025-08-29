import React from "react";
import NavbarBg from "../Elements/NavbarBg.jsx";
import NavbarBgDark from "../Elements/NavbarBgDark.jsx";
import useTheme from "../context/ThemeContext.jsx";

const LogoutCard = ({ onConfirm, onCancel }) => {
  const { themeMode } = useTheme();

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50 overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0 w-full h-full">
        {themeMode === "dark" ? (
          <NavbarBgDark className="w-full h-full object-cover" />
        ) : (
          <NavbarBg className="w-full h-full object-cover" />
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 py-3 px-4">
        <div className={`text-[16px] font-light font-[Merriweather Sans] text-center mb-3 ${
          themeMode === "dark" ? "text-white" : "text-[#002b46]"
        }`}>
          Are you sure you want to log out?
        </div>
        
        {/* Horizontal Button Container */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-6 py-2 text-red-400 text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-red-600 hover:bg-red-600/20 rounded-md border border-red-400/30 hover:border-red-600/50"
          >
            Yes, Logout
          </button>
          <button
            onClick={onCancel}
            className={`px-6 py-2 text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 rounded-md border hover:border-[#00FFAF]/50 ${
              themeMode === "dark" 
                ? "text-white hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)] border-white/30" 
                : "text-[#002b46] hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)] border-[#002b46]/30"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutCard;