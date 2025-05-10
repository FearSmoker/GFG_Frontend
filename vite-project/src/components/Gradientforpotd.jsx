// src/components/Gradientforpotd.jsx
import React from "react";

const GradientBoxx = ({ text }) => {
  return (
    <div
      className="flex items-center text-center   justify-center p-1 rounded-2xl text-white text-[15px] md:text-lg font-normal leading-relaxed"
      style={{
        border: "4px solid transparent",
        backgroundImage:
          "linear-gradient(black, black), linear-gradient(to right, #22c55e, #2563eb)",
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        height: "16rem", // Similar height to your image (about 384px)
        overflowY: "auto",
      }}
    >
      {text}
    </div>
  );
};

export default GradientBoxx;
