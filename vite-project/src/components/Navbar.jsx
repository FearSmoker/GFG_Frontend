import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigation } from "../context/NavigationContext";
import ThemeBtn from "./ThemeBtn.jsx";
import logoutIcon from "../assets/logout.png";
const Navbar = () => {
  const { goTo } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("accessToken");
  return (
    <div>
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-2 bg-gradient-to-r from-gray-300 via-gray-400 to-green-300 backdrop-blur-md shadow-lg">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <a href="/">
            <img src="/src/assets/logo.png" alt="Logo" className="h-10 md:h-20" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <button onClick={() => goTo("/signin")} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer">
            Sign In
          </button>
          <button onClick={() => goTo("/meet-our-geeks")} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer">
            Meet Our Geeks
          </button>
          <button onClick={() => goTo("/events")} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer">
            Events
          </button>
          <button onClick={() => goTo("/about-us")} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer">
            About Us
          </button>
          <button onClick={() => goTo("/potd")} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer">
            POTD
          </button>
          <button onClick={() => goTo("/get-profile")} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer">
            Profile
          </button>
          {token && <button
            onClick={() => goTo("/logout")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer flex items-center justify-center"
          >
            <img src={logoutIcon} alt="Logout" className="h-6 w-6 " />
          </button>}
          <ThemeBtn />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 focus:outline-none">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden bg-gradient-to-r from-emerald-500 to-black backdrop-blur-md py-6 space-y-4 text-center shadow-md items-center">
          {/* ✅ Only Sign In shown here */}
          <button onClick={() => { goTo("/signin"); setIsOpen(false); }} className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2">
            Sign In
          </button>
          <button onClick={() => { goTo("/meet-our-geeks"); setIsOpen(false); }} className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2">
            Meet Our Geeks
          </button>
          <button onClick={() => { goTo("/events"); setIsOpen(false); }} className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2">
            Events
          </button>
          <button onClick={() => { goTo("/about-us"); setIsOpen(false); }} className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2">
            About Us
          </button>
          <button onClick={() => { goTo("/potd"); setIsOpen(false); }} className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2">
            POTD
          </button>
          <button onClick={() => { goTo("/get-profile"); setIsOpen(false); }} className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2">
            Profile
          </button>
          <ThemeBtn />
        </div>
      )}
    </div>
  );
};

export default Navbar;