import React from "react";
import { Mail, MapPin, Users } from "lucide-react";
import { Linkedin, Instagram, Globe } from "lucide-react";
import useTheme from "../context/ThemeContext";
import ContactUsSVGComponent from "../Elements/ContactUsBg.jsx";
import ContactUsDarkSVGComponent from "../Elements/ContactUsBgDark.jsx";
import "../css/ContactUsBackground.css";

const ContactUsComponent = ({
  formData = { name: "", email: "", phone: "", message: "" },
  handleInputChange = () => {},
  handleSubmit = () => {},
  isSubmitting = false,
  submitMessage = "",
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  return (
    <div className={isDark ? "dark" : ""}>
      {/* Background */}
      <div className="contact-background">
        <div className="contact-background-layer">
          {isDark ? <ContactUsDarkSVGComponent /> : <ContactUsSVGComponent />}
        </div>
      </div>

      {/* Content */}
      <div className={`contact-content ${
        isDark 
          ? "bg-transparent text-white" 
          : "bg-transparent text-black"
      }`}>
        <div className="container mx-auto px-4 py-16">
          {/* Title */}
          <div className="text-center mb-16">
            <div className="mb-8 h-16"></div>
            <h1 className="text-6xl font-bold mb-4">
              <span className={isDark ? "text-blue-400" : "text-blue-600"}>&lt;</span>
              <span className={isDark ? "text-emerald-400" : "text-green-700"}> Let's Connect </span>
              <span className={isDark ? "text-blue-400" : "text-blue-600"}>&gt;</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className={`rounded-2xl p-8 ${
              isDark 
                ? "border-2 border-emerald-400 bg-black/20 backdrop-blur-sm" 
                : "border-2 border-green-400 bg-white/80 backdrop-blur-sm"
            }`}>
              <div className="flex items-center mb-6">
                <span className={`text-3xl font-bold mr-2 ${
                  isDark ? "text-emerald-400" : "text-green-700"
                }`}>
                  &gt;_
                </span>
                <h2 className={`text-3xl font-bold ${
                  isDark ? "text-emerald-400" : "text-green-700"
                }`}>
                  Initialize Connection
                </h2>
              </div>

              <div className="mb-6">
                <p className={`font-mono text-lg ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  // Please fill in your details below
                </p>
              </div>

              <div>
                <div className={`border rounded-lg p-6 mb-6 ${
                  isDark 
                    ? "bg-slate-800/80 border-white/20 backdrop-blur-sm" 
                    : "border-black bg-gray-50/80 backdrop-blur-sm"
                }`}>
                  <div className="font-mono text-sm space-y-4">
                    <div className={isDark ? "text-emerald-400" : "text-green-700"}>
                      const userDetails = {`{`}
                    </div>

                    <div className="ml-4 space-y-4">
                      <div className="flex items-center">
                        <span className={`mr-2 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}>name:</span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="type your name..."
                          className={`bg-transparent border-none outline-none flex-1 ${
                            isDark 
                              ? "text-gray-300 placeholder-gray-500" 
                              : "text-gray-600 placeholder-gray-400"
                          }`}
                        />
                        <span className={isDark ? "text-gray-300" : "text-gray-600"}>,</span>
                      </div>

                      <div className="flex items-center">
                        <span className={`mr-2 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}>email:</span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="type your email..."
                          className={`bg-transparent border-none outline-none flex-1 ${
                            isDark 
                              ? "text-gray-300 placeholder-gray-500" 
                              : "text-gray-600 placeholder-gray-400"
                          }`}
                        />
                        <span className={isDark ? "text-gray-300" : "text-gray-600"}>,</span>
                      </div>

                      <div className="flex items-center">
                        <span className={`mr-2 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}>phone:</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="type your phone number..."
                          className={`bg-transparent border-none outline-none flex-1 ${
                            isDark 
                              ? "text-gray-300 placeholder-gray-500" 
                              : "text-gray-600 placeholder-gray-400"
                          }`}
                        />
                        <span className={isDark ? "text-gray-300" : "text-gray-600"}>,</span>
                      </div>

                      <div className="flex items-start">
                        <span className={`mr-2 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}>message:</span>
                        <div className="flex-1">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="type your message..."
                            rows={4}
                            className={`w-full bg-transparent border-none outline-none resize-none ${
                              isDark 
                                ? "text-gray-300 placeholder-gray-500" 
                                : "text-gray-600 placeholder-gray-400"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={isDark ? "text-emerald-400" : "text-green-700"}>{`}`}</div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full font-mono font-semibold text-lg py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark 
                      ? "bg-gradient-to-r from-emerald-400 to-blue-500 text-slate-900 hover:shadow-lg hover:shadow-emerald-400/25" 
                      : "bg-gradient-to-r from-green-400 to-blue-600 text-black hover:shadow-lg hover:shadow-green-400/25"
                  }`}
                >
                  {isSubmitting
                    ? "Sending..."
                    : ">gfg.sendMessage(userDetails)"}
                </button>
              </div>

              {submitMessage && (
                <div className={`mt-4 p-3 rounded-lg text-center ${
                  submitMessage.includes("Error")
                    ? isDark 
                      ? "bg-red-500/20 text-red-400"
                      : "bg-red-100 text-red-600 border border-red-300"
                    : isDark
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-green-100 text-green-600 border border-green-300"
                }`}>
                  {submitMessage}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Base Location */}
              <div className={`rounded-2xl p-6 ${
                isDark 
                  ? "border-2 border-emerald-400 bg-black/20 backdrop-blur-sm" 
                  : "border-2 border-green-400 bg-white/80 backdrop-blur-sm"
              }`}>
                <div className="flex items-center mb-4">
                  <MapPin className={`mr-4 w-11 h-11 ${
                    isDark ? "text-emerald-400" : "text-green-700"
                  }`} />
                  <h3 className={`text-3xl font-bold ${
                    isDark ? "text-emerald-400" : "text-green-700"
                  }`}>
                    Base Location
                  </h3>
                </div>
                <div className={`space-y-2 font-mono text-lg ${
                  isDark ? "text-white" : "text-black"
                }`}>
                  <p>GeeksForGeeks Campus Body</p>
                  <p>Madhav Institute of Technology & Science - DU</p>
                  <p>Gwalior - 474003</p>
                </div>
              </div>

              {/* Contact Us */}
              <div className={`rounded-2xl p-6 ${
                isDark 
                  ? "border-2 border-emerald-400 bg-black/20 backdrop-blur-sm" 
                  : "border-2 border-green-400 bg-white/80 backdrop-blur-sm"
              }`}>
                <div className="flex items-center mb-4">
                  <Mail className={`mr-4 w-11 h-11 ${
                    isDark ? "text-emerald-400" : "text-green-700"
                  }`} />
                  <h3 className={`text-3xl font-bold ${
                    isDark ? "text-emerald-400" : "text-green-700"
                  }`}>
                    Contact us
                  </h3>
                </div>
                <a
                  href="mailto:geeksforgeekmits@gmail.com"
                  className={`font-mono text-lg underline transition-colors ${
                    isDark 
                      ? "text-white hover:text-emerald-400" 
                      : "text-black hover:text-green-700"
                  }`}
                >
                  geeksforgeekmits@gmail.com
                </a>
              </div>

              {/* Connect with us */}
              <div className={`rounded-2xl p-6 ${
                isDark 
                  ? "border-2 border-emerald-400 bg-black/20 backdrop-blur-sm" 
                  : "border-2 border-green-400 bg-white/80 backdrop-blur-sm"
              }`}>
                <div className="flex items-center mb-4">
                  <Users className={`mr-4 w-12 h-12 ${
                    isDark ? "text-emerald-400" : "text-green-700"
                  }`} />
                  <h3 className={`text-3xl font-bold ${
                    isDark ? "text-emerald-400" : "text-green-700"
                  }`}>
                    Connect with us
                  </h3>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/geeksforgeeks-mits-student-chapter-5b2986293"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                      isDark 
                        ? "bg-gray-600 hover:bg-emerald-400" 
                        : "bg-gray-300 hover:bg-green-400"
                    }`}
                  >
                    <Linkedin className={`w-5 h-5 ${
                      isDark ? "text-white" : "text-gray-700"
                    }`} />
                  </a>
                  <a
                    href="https://www.instagram.com/geeksforgeeks_mits/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                      isDark 
                        ? "bg-gray-600 hover:bg-emerald-400" 
                        : "bg-gray-300 hover:bg-green-400"
                    }`}
                  >
                    <Instagram className={`w-5 h-5 ${
                      isDark ? "text-white" : "text-gray-700"
                    }`} />
                  </a>
                  <a
                    href="https://www.geeksforgeeks.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                      isDark 
                        ? "bg-gray-600 hover:bg-emerald-400" 
                        : "bg-gray-300 hover:bg-green-400"
                    }`}
                  >
                    <Globe className={`w-5 h-5 ${
                      isDark ? "text-white" : "text-gray-700"
                    }`} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;