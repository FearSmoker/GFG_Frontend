import React from "react";

const NavbarLink = ({ label, onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center px-4 py-2 rounded-lg border text-[20px] font-light font-[Merriweather Sans] transition-all duration-300
        ${
          active
            ? "bg-[rgba(0,43,70,0.32)] border-[#004C7C] text-[#00FFAF]"
            : "bg-transparent border-transparent text-white hover:text-[#00FFAF] hover:border-[#004C7C] hover:bg-[rgba(0,43,70,0.32)]"
        }`}
    >
      {label}
    </button>
  );
};

export default NavbarLink;
