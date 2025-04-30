import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const HomePage = () => {
  

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/src/assets/background.png')" }}
    >
      {/* Navigation Bar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 md:px-8 text-center h-[42rem]">
        {/* Logo Card */}
        <div className="bg-white/20 backdrop-blur-md border-4 border-green-400 rounded-2xl p-6 md:p-10 shadow-lg transition-all duration-500 hover:scale-105">
          <img
            src="/src/assets/logo.png"
            alt="Student Chapter"
            className="h-24 md:h-32 mx-auto mb-4"
          />
        </div>

        {/* Paragraph */}
        <p className="mt-10 max-w-3xl text-white text-md md:text-xl leading-relaxed font-semibold">
          We are a student-driven community dedicated to fostering a passion for coding, 
          problem-solving, and technology at Madhav Institute of Technology and Science. 
          Our mission is to empower students with the skills and knowledge needed for success 
          in competitive programming, technical interviews, and beyond. Join us for workshops, 
          coding challenges, and collaborative learning as we grow together in the world of 
          computer science.
        </p>
      
      </div>
        <div className=" w-full h-[80rem]">
          
        </div>
        <Footer/>
    </div>
  );
};

export default HomePage;
