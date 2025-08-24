import { Menu, X } from "lucide-react";
import { useState } from "react";
import React from "react";
import { useNavigation } from "../context/NavigationContext.jsx";
import ThemeBtn from "./ThemeBtn.jsx";
import logoutIcon from "../assets/logout.png";
import useAuth from "../context/AuthContext.jsx";
import NavbarBg from "../Elements/NavbarBg.jsx";
import useTheme from "../context/ThemeContext.jsx";
import NavbarBgDark from "../Elements/NavbarBgDark.jsx";
import NavbarLink from "./NavbarLink.jsx";
import LogoutCard from "./LogoutCard.jsx";

const Navbar = () => {
  const { goTo } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutCard, setShowLogoutCard] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { themeMode } = useTheme();
  
  const dropdownTimeoutRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setIsProfileDropdownOpen(false);
      }
      if (showLogoutCard && !event.target.closest('.logout-card-container')) {
        setShowLogoutCard(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen, showLogoutCard]);

  React.useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {

    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsProfileDropdownOpen(true);
  };

  const handleMouseLeave = () => {

    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
      dropdownTimeoutRef.current = null;
    }, 100);
  };

  const goToProfile = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to view your profile.");
      return;
    }
    goTo("/get-profile");
  };


  const handleLogoutConfirm = async () => {
    setShowLogoutCard(false);
    
    try {

      await logout();
      
      goTo("/Logout");
    } catch (error) {
      console.error("Error during logout:", error);
      
      goTo("/Logout");
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutCard(false);
  };

  const currentPath = window.location.pathname;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav className="w-full relative px-6 md:px-12 shadow-lg bg-transparent">

        <div className="absolute inset-0 w-full h-full -z-10">
          {themeMode === "dark" ? (
            <NavbarBgDark className="w-full h-full object-cover" />
          ) : (
            <NavbarBg className="w-full h-full object-cover" />
          )}
        </div>

        <div className="py-2 flex justify-between items-center relative z-10">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/">
              {themeMode === "dark" ? (
              <img
                src="/src/assets/NewLogoDark.png"
                alt="Logo"
                className="h-10 md:h-20"
              /> ) : (
                <img
                src="/src/assets/NewLogoLight.png"
                alt="Logo"
                className="h-10 md:h-20"
              />
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <NavbarLink
                label="Sign In"
                onClick={() => goTo("/signin")}
                active={currentPath === "/signin"}
              />
            ) : (
              <div className="text-black-800 font-bold">
                {user ? `Hi, ${user.username}` : "Loading user..."}
              </div>
            )}

            <NavbarLink
              label="Meet Our Geeks"
              onClick={() => goTo("/meet-our-geeks")}
              active={currentPath === "/meet-our-geeks"}
            />
            <NavbarLink
              label="Events"
              onClick={() => goTo("/events")}
              active={currentPath === "/events"}
            />
            <NavbarLink
              label="About Us"
              onClick={() => goTo("/about-us")}
              active={currentPath === "/about-us"}
            />
            <NavbarLink
              label="POTD"
              onClick={() => goTo("/potd")}
              active={currentPath === "/potd"}
            />

            {/* Profile avatar + logout */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-3">
                <div 
                  className="relative profile-dropdown-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-9 h-9 bg-blue-700 rounded-full cursor-pointer overflow-hidden flex items-center justify-center">
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 overflow-hidden">
                      {/* Background SVG */}
                      <div className="absolute inset-0 w-full h-full">
                        {themeMode === "dark" ? (
                          <NavbarBgDark className="w-full h-full object-cover" />
                        ) : (
                          <NavbarBg className="w-full h-full object-cover" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 py-2">
                        <button
                          onClick={() => {
                            goToProfile();
                            setIsProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${themeMode === "dark" ? "text-white" : "text-[#002b46]"} text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                        >
                          My Profile
                        </button>
                        <button
                          onClick={() => {
                            goTo("/dashboard");
                            setIsProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${themeMode === "dark" ? "text-white" : "text-[#002b46]"} text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            goTo("/my-registrations");
                            setIsProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${themeMode === "dark" ? "text-white" : "text-[#002b46]"} text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                        >
                          My Registrations
                        </button>
                        <button
                          onClick={() => {
                            goTo("/event-history");
                            setIsProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${themeMode === "dark" ? "text-white" : "text-[#002b46]"} text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                        >
                          Event History
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowLogoutCard(true)}
                  className="relative flex items-center justify-center p-2 rounded-lg border transition-all duration-300 bg-transparent border-transparent hover:border-[#004C7C] hover:bg-[rgba(0,43,70,0.32)]"
                  aria-label="Logout"
                >
                  <img 
                    src={logoutIcon} 
                    alt="Logout" 
                    className={`h-5 w-5 filter transition-all duration-300 ${
                      themeMode === "dark" 
                        ? "brightness-0 invert hover:brightness-0 hover:sepia hover:saturate-200 hover:hue-rotate-90" 
                        : "hover:brightness-0 hover:sepia hover:saturate-200 hover:hue-rotate-90"
                    }`}
                    style={themeMode === "light" ? { filter: 'brightness(0) saturate(100%) invert(16%) sepia(28%) saturate(2049%) hue-rotate(185deg) brightness(91%) contrast(101%)' } : {}}
                  />

                  {/* Logout Card */}
                  {showLogoutCard && (
                    <div className="logout-card-container absolute right-0 mt-10 z-50">
                      <LogoutCard
                        onConfirm={handleLogoutConfirm}
                        onCancel={handleLogoutCancel}
                      />
                    </div>
                  )}
                </button>
              </div>
            )}

            <ThemeBtn />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
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
              className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2"
            >
              Sign In
            </button>
          ) : (
            <div className="text-black-800 font-bold">
              {user ? `Hi, ${user.username}` : "Loading user..."}
            </div>
          )}

          {[
            { label: "Meet Our Geeks", path: "/meet-our-geeks" },
            { label: "Events", path: "/events" },
            { label: "About Us", path: "/about-us" },
            { label: "POTD", path: "/potd" },
          ].map(({ label, path }) => (
            <button
              key={path}
              onClick={() => {
                goTo(path);
                setIsOpen(false);
              }}
              className="text-white text-lg hover:text-green-300 border w-fit rounded-lg px-4 py-2"
            >
              {label}
            </button>
          ))}

          {isAuthenticated && user && (
            <div 
              className="relative profile-dropdown-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-9 h-9 bg-blue-700 rounded-full cursor-pointer overflow-hidden flex items-center justify-center">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mobile Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 overflow-hidden">
                  {/* Background SVG */}
                  <div className="absolute inset-0 w-full h-full">
                    {themeMode === "dark" ? (
                      <NavbarBgDark className="w-full h-full object-cover" />
                    ) : (
                      <NavbarBg className="w-full h-full object-cover" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 py-2">
                    <button
                      onClick={() => {
                        goToProfile();
                        setIsProfileDropdownOpen(false);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${themeMode === "dark" ? "text-white" : "text-[#002b46]"} text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        goTo("/dashboard");
                        setIsProfileDropdownOpen(false);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${themeMode === "dark" ? "text-white" : "text-[#002b46]"} text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        goTo("/my-registrations");
                        setIsProfileDropdownOpen(false);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${themeMode === "dark" ? "text-white" : "text-[#002b46]"} text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                    >
                      My Registrations
                    </button>
                    <button
                      onClick={() => {
                        goTo("/event-history");
                        setIsProfileDropdownOpen(false);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${themeMode === "dark" ? "text-white" : "text-[#002b46]"} text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                    >
                      Event History
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                setShowLogoutCard(true);
                setIsOpen(false);
              }}
              className="relative flex items-center justify-center p-2 rounded-lg border transition-all duration-300 bg-transparent border-transparent hover:border-[#004C7C] hover:bg-[rgba(0,43,70,0.32)]"
              aria-label="Logout"
            >
              <img 
                src={logoutIcon} 
                alt="Logout" 
                className={`h-5 w-5 filter transition-all duration-300 ${
                  themeMode === "dark" 
                    ? "brightness-0 invert hover:brightness-0 hover:sepia hover:saturate-200 hover:hue-rotate-90" 
                    : "hover:brightness-0 hover:sepia hover:saturate-200 hover:hue-rotate-90"
                }`}
                style={themeMode === "light" ? { filter: 'brightness(0) saturate(100%) invert(16%) sepia(28%) saturate(2049%) hue-rotate(185deg) brightness(91%) contrast(101%)' } : {}}
              />

              {/* Mobile Logout Card */}
              {showLogoutCard && (
                <div className="logout-card-container absolute right-0 mt-10 z-50">
                  <LogoutCard
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                  />
                </div>
              )}
            </button>
          )}

          <ThemeBtn />
        </div>
      )}
    </div>
  );
};

export default Navbar;