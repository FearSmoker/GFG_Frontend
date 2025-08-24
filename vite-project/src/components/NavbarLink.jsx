import React from "react";
import useTheme from "../context/ThemeContext.jsx";

const NavbarLink = ({ label, onClick, active = false }) => {
  const { themeMode } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center px-4 py-2 rounded-lg border text-[20px] font-light font-[Merriweather Sans] transition-all duration-300
        ${
          active
            ? "bg-[rgba(0,43,70,0.32)] border-[#004C7C] text-[#00FFAF]"
            : `bg-transparent border-transparent hover:text-[#00FFAF] hover:border-[#004C7C] hover:bg-[rgba(0,43,70,0.32)] ${
                themeMode === "dark" ? "text-white" : "text-[#002b46]"
              }`
        }`}
    >
      {label}
    </button>
  );
};

export default NavbarLink;