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
import NewLogoDark from "../assets/NewLogoDark.png";
import NewLogoLight from "../assets/NewLogoLight.png";

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
      
      if (event.target.closest('button') && event.target.closest('.logout-card-container')) {
        return;
      }
      
      if (
        isProfileDropdownOpen &&
        !event.target.closest(".profile-dropdown-container")
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (showLogoutCard && !event.target.closest(".logout-card-container")) {
        setShowLogoutCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen, showLogoutCard]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

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
                  src={NewLogoDark}
                  alt="Logo"
                  className="h-10 md:h-20"
                />
              ) : (
                <img
                  src={NewLogoLight}
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
              <div className={`text-transparent bg-clip-text font-bold italic text-xl tracking-wide drop-shadow-sm font-[Poppins] ${
                themeMode === "dark" 
                  ? "bg-gradient-to-r from-[#081d26] via-[#31756e] to-[#49c8be]"
                  : "bg-gradient-to-r from-[#20a2b4] via-[#6bc2cf] to-[#8bd0dc]"
              }`}>
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
              label="Nation Skill Up!"
              onClick={() => goTo("/nation-skill-up")}
              active={currentPath === "//nation-skill-up"}
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
                          className={`w-full text-left px-4 py-2 ${
                            themeMode === "dark"
                              ? "text-white"
                              : "text-[#002b46]"
                          } text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                        >
                          My Profile
                        </button>
                        <button
                          onClick={() => {
                            goTo("/dashboard");
                            setIsProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${
                            themeMode === "dark"
                              ? "text-white"
                              : "text-[#002b46]"
                          } text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            goTo("/my-registrations");
                            setIsProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${
                            themeMode === "dark"
                              ? "text-white"
                              : "text-[#002b46]"
                          } text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                        >
                          My Registrations
                        </button>
                        <button
                          onClick={() => {
                            goTo("/event-history");
                            setIsProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${
                            themeMode === "dark"
                              ? "text-white"
                              : "text-[#002b46]"
                          } text-[16px] font-light font-[Merriweather Sans] transition-all duration-300 hover:text-[#00FFAF] hover:bg-[rgba(0,43,70,0.5)]`}
                        >
                          Event History
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative logout-card-container">
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
                      style={
                        themeMode === "light"
                          ? {
                              filter:
                                "brightness(0) saturate(100%) invert(16%) sepia(28%) saturate(2049%) hue-rotate(185deg) brightness(91%) contrast(101%)",
                            }
                          : {}
                      }
                    />
                  </button>

                  {/* Desktop Logout Card */}
                  {showLogoutCard && (
                    <LogoutCard
                      onConfirm={handleLogoutConfirm}
                      onCancel={handleLogoutCancel}
                    />
                  )}
                </div>
              </div>
            )}

            <ThemeBtn />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden focus:outline-none z-20  ${
              themeMode === "dark" ? "text-white" : "text-gray-700"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Improved Layout */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-0 z-100">
          {/* Background with theme colors */}
          <div className={`absolute inset-0 ${
            themeMode === "dark" 
              ? "bg-gradient-to-br from-emerald-900 via-green-900 to-gray-900" 
              : "bg-gradient-to-br from-green-50 via-emerald-100 to-teal-100"
          }`} />
          
          {/* Mobile Menu Header with Close Button - Fixed */}
          <div className="relative z-20 flex justify-between items-center px-6 py-4 pt-6">
            <div className="flex items-center space-x-3">
              <a href="/" onClick={() => setIsOpen(false)}>
                {themeMode === "dark" ? (
                  <img
                    src={NewLogoDark}
                    alt="Logo"
                    className="h-10"
                  />
                ) : (
                  <img
                    src={NewLogoLight}
                    alt="Logo"
                    className="h-10"
                  />
                )}
              </a>
            </div>
            
            {/* Close Button (X) */}
            <button
              onClick={() => setIsOpen(false)}
              className={`focus:outline-none  ${
                themeMode === "dark" ? "text-white" : "text-emerald-800"
              }`}
              aria-label="Close menu"
            >
              <X size={30} />
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="relative z-10 overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>
            <div className="px-6 py-4">
              {/* User Section */}
              {isAuthenticated && user ? (
                <div className={`flex flex-col items-center mb-8 pb-6 border-b ${
                  themeMode === "dark" ? "border-emerald-600" : "border-emerald-300"
                }`}>
                  <div className="w-16 h-16 bg-blue-700 rounded-full mb-4 overflow-hidden flex items-center justify-center shadow-lg">
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`text-transparent bg-clip-text font-bold italic text-xl tracking-wide drop-shadow-sm font-[Poppins] ${
                    themeMode === "dark" 
                      ? "bg-gradient-to-r from-[#20a2b4] via-[#6bc2cf] to-[#8bd0dc]"
                      : "bg-gradient-to-r from-[#081d26] via-[#31756e] to-[#49c8be]"
                  }`}>
                    {user ? `Hi, ${user.username}` : "Loading user..."}
                  </div>
                  <div className={`text-sm text-center mt-2 ${
                    themeMode === "dark" ? "text-emerald-300" : "text-emerald-600"
                  }`}>Welcome back</div>
                </div>
              ) : (
                <div className={`flex justify-center mb-8 pb-6 border-b ${
                  themeMode === "dark" ? "border-emerald-600" : "border-emerald-300"
                }`}>
                  <button
                    onClick={() => {
                      goTo("/signin");
                      setIsOpen(false);
                    }}
                    className={`text-lg font-medium px-8 py-3 rounded-full border transition-all duration-300 shadow-lg ${
                      themeMode === "dark"
                        ? "bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-700"
                        : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Navigation Links */}
              <div className="flex flex-col space-y-3 mb-8">
                {[
                  { label: "Meet Our Geeks", path: "/meet-our-geeks", icon: "👥" },
                  { label: "Events", path: "/events", icon: "🎯" },
                  { label: "Nation Skill Up!", path: "/nation-skill-up", icon: "🚀" },
                  { label: "About Us", path: "/about-us", icon: "ℹ️" },
                  { label: "POTD", path: "/potd", icon: "💡" },
                ].map(({ label, path, icon }) => (
                  <button
                    key={path}
                    onClick={() => {
                      goTo(path);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-center text-base font-medium px-5 py-3 rounded-lg border transition-all duration-300 shadow-md hover:scale-105 active:scale-95 ${
                      themeMode === "dark"
                        ? "bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-700"
                        : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    <span className="mr-3 text-lg">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              {/* Profile Actions for Authenticated Users */}
              {isAuthenticated && user && (
                <div className="mb-8">
                  <div className={`text-sm font-medium mb-4 text-center uppercase tracking-wider ${
                    themeMode === "dark" ? "text-emerald-300" : "text-emerald-600"
                  }`}>
                    Profile Actions
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => {
                        goToProfile();
                        setIsOpen(false);
                      }}
                      className={`text-sm font-medium px-4 py-3 rounded-lg border transition-all duration-300 text-center ${
                        themeMode === "dark"
                          ? "bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-700"
                          : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        goTo("/dashboard");
                        setIsOpen(false);
                      }}
                      className={`text-sm font-medium px-4 py-3 rounded-lg border transition-all duration-300 text-center ${
                        themeMode === "dark"
                          ? "bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-700"
                          : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        goTo("/my-registrations");
                        setIsOpen(false);
                      }}
                      className={`text-sm font-medium px-4 py-3 rounded-lg border transition-all duration-300 text-center ${
                        themeMode === "dark"
                          ? "bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-700"
                          : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      Registrations
                    </button>
                    <button
                      onClick={() => {
                        goTo("/event-history");
                        setIsOpen(false);
                      }}
                      className={`text-sm font-medium px-4 py-3 rounded-lg border transition-all duration-300 text-center ${
                        themeMode === "dark"
                          ? "bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-700"
                          : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      History
                    </button>
                  </div>

                  {/* Mobile Logout Button - Fixed with Modal Overlay */}
                  <div className="flex justify-center">
                    <div className="relative logout-card-container">
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
                          style={
                            themeMode === "light"
                              ? {
                                  filter:
                                    "brightness(0) saturate(100%) invert(16%) sepia(28%) saturate(2049%) hue-rotate(185deg) brightness(91%) contrast(101%)",
                                }
                              : {}
                          }
                        />
                      </button>

                      {/* Mobile Logout Card - Positioned below the button and centered */}
                      {showLogoutCard && (
                        
                          <div className="scale-75 z-50 transform translate-x-26 translate-y-2 ">
                            
                            <LogoutCard
                              onConfirm={handleLogoutConfirm}
                              onCancel={handleLogoutCancel}
                            />
                          </div>
                        
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className={`flex items-center justify-center space-x-4 pt-6 pb-8 border-t ${
                themeMode === "dark" ? "border-emerald-600" : "border-emerald-300"
              }`}>
                <div className={`rounded-full p-1 ${
                  themeMode === "dark" ? "bg-emerald-800" : "bg-white shadow-md"
                }`}>
                  <ThemeBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Navbar;