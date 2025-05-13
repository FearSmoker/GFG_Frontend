import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigation } from "../context/NavigationContext";
import ThemeBtn from "./ThemeBtn.jsx";
import logoutIcon from "../assets/logout.png";
import useAuth from "../context/AuthContext.jsx";
import { getCurrentUser } from "../api/User_api.js";

const Navbar = () => {
  const { goTo } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();

        if (data && data.data) {
          setUser(data.data);
          console.log("User set:", data.data);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (isAuthenticated) {
      fetchCurrentUser();
    }
  }, [isAuthenticated]);

  const goToProfile = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to view your profile.");
      return;
    }
    goTo("/get-profile");
  };

  return (
    <div>
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-2 bg-gradient-to-r from-gray-300 via-gray-400 to-green-300 backdrop-blur-md shadow-lg">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <a href="/">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-10 md:h-20"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {!isAuthenticated ? (
            <button
              onClick={() => goTo("/signin")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer"
            >
              Sign In
            </button>
          ) : (
            <div className="text-black-800 font-bold">
              {user ? `Hi, ${user.username}` : "Loading user..."}
            </div>
          )}
          <button
            onClick={() => goTo("/meet-our-geeks")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer"
          >
            Meet Our Geeks
          </button>
          <button
            onClick={() => goTo("/events")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer"
          >
            Events
          </button>
          <button
            onClick={() => goTo("/about-us")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => goTo("/potd")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer"
          >
            POTD
          </button>
          {isAuthenticated && user && (
            <div
              onClick={() => goToProfile()}
              className="w-10 h-10 bg-blue-700 rounded-full cursor-pointer overflow-hidden flex items-center justify-center"
            >
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {isAuthenticated && (
            <button
              onClick={() => goTo("/logout")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer flex items-center justify-center"
            >
              <img src={logoutIcon} alt="Logout" className="h-6 w-6 " />
            </button>
          )}
          <ThemeBtn />
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
        <div className="flex flex-col md:hidden bg-gradient-to-r from-emerald-500 to-black backdrop-blur-md py-6 space-y-4 text-center shadow-md items-center">
          {!isAuthenticated ? (
            <button
              onClick={() => {
              goTo("/signin");
              setIsOpen(false);
            }}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full hover:cursor-pointer"
            >
              Sign In
            </button>
          ) : (
            <div className="text-black-800 font-bold">
              {user ? `Hi, ${user.username}` : "Loading user..."}
            </div>
          )}
          <button
            onClick={() => {
              goTo("/meet-our-geeks");
              setIsOpen(false);
            }}
            className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2"
          >
            Meet Our Geeks
          </button>
          <button
            onClick={() => {
              goTo("/events");
              setIsOpen(false);
            }}
            className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2"
          >
            Events
          </button>
          <button
            onClick={() => {
              goTo("/about-us");
              setIsOpen(false);
            }}
            className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2"
          >
            About Us
          </button>
          <button
            onClick={() => {
              goTo("/potd");
              setIsOpen(false);
            }}
            className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2"
          >
            POTD
          </button>
          {isAuthenticated && user && (
            <div
              onClick={() => {
                goToProfile();
                setIsOpen(false);
              }}
              className="w-10 h-10 bg-blue-700 rounded-full cursor-pointer overflow-hidden flex items-center justify-center"
            >
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {isAuthenticated && (
            <button
              onClick={() => {
                goTo("/logout");
                setIsOpen(false);
              }}
              className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2"
            >
              <img src={logoutIcon} alt="Logout" className="h-6 w-6 " />
            </button>
          )}
          <ThemeBtn />
        </div>
      )}
    </div>
  );
};

export default Navbar;
