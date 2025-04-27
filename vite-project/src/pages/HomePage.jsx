import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger and Close icons

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/src/assets/background.png')" }}
    >
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-4 bg-gradient-to-r from-gray-300 via-gray-400 to-green-300 backdrop-blur-md shadow-lg">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/src/assets/logo.png" 
            alt="Logo" 
            className="h-10 md:h-14"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/about-us"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            About us
          </Link>
          <Link
            to="/events"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            Events
          </Link>
          <Link
            to="/meet-our-geeks"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            Our Geeks
          </Link>
          {/* New POTD Option */}
          <Link
            to="/potd"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            POTD
          </Link>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            Let's Connect
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden bg-white/20 backdrop-blur-md py-6 space-y-4 text-center shadow-md">
          <Link
            to="/about-us"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            About us
          </Link>
          <Link
            to="/events"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/meet-our-geeks"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            Our Geeks
          </Link>
          {/* New POTD Option in Mobile */}
          <Link
            to="/potd"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            POTD
          </Link>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            Let's Connect
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 md:px-8 text-center">
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
    </div>
  );
};

export default HomePage;
