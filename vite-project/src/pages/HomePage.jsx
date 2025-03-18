import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for hamburger menu

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false); // State for menu toggle

  return (
    <div 
      className="mt-auto min-h-screen bg-cover bg-center text-white flex flex-col"
      style={{ backgroundImage: "url('/src/assets/background.png')" }}
    >
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-12 lg:px-16 py-4 border-b border-white border-opacity-10 bg-gray-400 bg-opacity-50">
        {/* Logo */}
        <div className="flex items-center space-x-4">
  <img 
    src="/src/assets/logo.png" 
    alt="Logo" 
    className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28"
  />
</div>


        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-20 text-sm md:text-lg">
        <Link to="/about-us" className="hover:text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl">About Us</Link>
<Link to="/events" className="hover:text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl">Events</Link>
<Link to="/our-geeks" className="hover:text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl">Our Geeks</Link>

        </div>

        {/* Desktop "Let's Connect" Button */}
        <button className="hidden md:block bg-[#002B46] px-5 py-2 rounded-2xl hover:bg-opacity-80 text-white transition-all duration-300">
          Let’s Connect
        </button>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-800 bg-opacity-95 py-4 space-y-4">
          <Link to="/about-us" className="text-white text-lg hover:text-gray-400">About Us</Link>
          <Link to="/events" className="text-white text-lg hover:text-gray-400">Events</Link>
          <Link to="/our-geeks" className="text-white text-lg hover:text-gray-400">Our Geeks</Link>
          <button className="bg-[#002B46] px-5 py-2 rounded-2xl hover:bg-opacity-80 text-white transition-all duration-300">
            Let’s Connect
          </button>
        </div>
      )}

      {/* Main Section - Centered Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4 md:px-8 lg:px-16">
        <div className="border border-green-300 p-6 md:p-8 rounded-lg bg-opacity-50">
          <img src="/src/assets/logo.png" alt="Student Chapter" className="h-24 md:h-32 mx-auto mb-4 md:mb-6" />
        </div>

        <p className="mt-6 md:mt-8 max-w-lg md:max-w-2xl text-gray-200 text-sm md:text-lg">
          We are a student-driven community dedicated to fostering a passion for coding, 
          problem-solving, and technology at Madhav Institute of Technology and Science. 
          Our mission is to empower students with the skills and knowledge needed for 
          success in competitive programming, technical interviews, and beyond. Join us 
          for workshops, coding challenges, and collaborative learning as we grow together 
          in the world of computer science.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
