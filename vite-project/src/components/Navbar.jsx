import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import { useState,} from "react";
const Navbar =()=>{
    const [isOpen, setIsOpen] = useState(false); 
    return(
        <div>
            <nav className="w-full flex justify-between items-center px-6 md:px-12 py-2 bg-gradient-to-r from-gray-300 via-gray-400 to-green-300 backdrop-blur-md shadow-lg">
        {/* Logo */}
        <div className="flex items-center space-x-3 ">
          <a href="/">
              <img
                src="/src/assets/logo.png"
                alt="Logo"
                className="h-10 md:h-20"
              />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/meet-our-geeks"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full "
          >
            Register / Sign In
          </Link>
          <Link
            to="/events"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full "
          >
            Events
          </Link>
          <Link
            to="/about-us"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full "
          >
            About us
          </Link>
          <Link
            to="/potd"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full "
          >
            POTD
          </Link>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full mode">
            Mode</button>
          <Link
            to="/Profile"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full "
          >
            Profile
          </Link>
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
            to="/meet-our-geeks"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            Register / Sign In
          </Link>
          <Link
            to="/events"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/about-us"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            About us
          </Link>
          <Link
            to="/potd"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            POTD
          </Link>
          <button className=" hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full mode">
            Mode</button>
          <Link
            to="/Profile"
            className="text-white text-lg hover:text-green-300"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
        </div>
      )}
        </div>
    );
}
export default Navbar;