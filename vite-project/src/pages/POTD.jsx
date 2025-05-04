import React from "react";
import NeonText from "../components/NeonText";
import GradientBoxx from "../components/Gradientforpotd";
import GradientBox from "../components/GradientBox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const POTD = () => {
  return (
    
    <div>
      
      <div
        className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-10 px-4"
        style={{ backgroundImage: "url('/src/assets/potd-bg.jpg')" }}
      >
      
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
        {/* Neon Heading */}
        <div className="z-10 mb-10">
          <NeonText text="POTD" color="text-emerald-400 underline scale-150" />
        </div>
        {/* Gradient Box for POTD question */}
        <div className="z-10 w-full max-w-4xl ">
          <GradientBoxx
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </div>
        {/* Submit Button */}
        <a href="https://www.geeksforgeeks.org/problem-of-the-day" target="_blank">
            <div className="z-10 w-full max-w-4xl mt-8 flex justify-center scale-140">
              <pre>
                  <GradientBox text=" Submit " />
              </pre>
            </div>
        </a>
      </div>
      
    </div>
  );
};

export default POTD;
