import React from "react";
import { Linkedin, Instagram, Globe } from "lucide-react";
import GradientBox from "./GradientBox.jsx";
import VisitorCountDisplay from "./VisitorCountDisplay.jsx";
import { useNavigation } from "../context/NavigationContext.jsx";
import useTheme from "../context/ThemeContext.jsx";
import HorizontalLightGFGLogo from "../assets/HorizontalLightGFGLogo.png";
import HorizontalDarkGFGLogo from "../assets/HorizontalDarkGFGLogo.png";

const Footer = () => {
  const { goTo } = useNavigation();
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  const textColorHeading = isDark ? "#10B981" : "#10B981";
  const textColorBody = isDark ? "#9CA3AF" : "#6B7280";
  const bgGradient = isDark
    ? "linear-gradient(135deg, #011725, #021B2A)"
    : "linear-gradient(135deg, #f0f5f9, #d9e2ec)";
  const blueOutline = "#00E6FF";
  const socialBgColor = isDark ? "#4B5563" : "#D1D5DB";
  const socialHoverColor = "#10B981";
  const bottomLineColor = isDark ? blueOutline : "#888888";

  return (
    <div
      className={isDark ? "footer-dark text-white" : ""}
      style={{
        background: bgGradient,
        position: "relative",
        width: "100%",
        color: textColorBody,
        fontFamily: "'Cabin', sans-serif",
        fontWeight: 400,
        marginTop: 0,
        paddingTop: 0,
      }}
    >
      {/* Top blue outline line (full width) */}
      <div
        style={{
          width: "100%",
          height: 0,
          outline: `0.7px solid ${blueOutline}`,
          outlineOffset: "-0.35px",
          margin: 0,
          padding: 0,
        }}
      ></div>

      {/* Main content grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          maxWidth: "1296px",
          margin: "0 auto",
          padding: "24px 16px 0",
          gap: "3rem",
          alignItems: "start",
        }}
        className="md:grid-cols-3"
      >
        {/* Quick Links */}
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <h4
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: textColorHeading,
              marginBottom: "24px",
              lineHeight: "1.2",
            }}
            className="text-3xl font-bold mb-6"
          >
            Quick Links
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontSize: "20px",
              color: textColorBody,
              fontWeight: 400,
              flex: 1,
            }}
            className="space-y-4 text-xl"
          >
            <a
              href="https://www.geeksforgeeks.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                cursor: "pointer",
                transition: "color 0.3s",
                color: textColorBody,
                textDecoration: "none",
                lineHeight: "1.5",
              }}
              onMouseEnter={(e) => (e.target.style.color = textColorHeading)}
              onMouseLeave={(e) => (e.target.style.color = textColorBody)}
            >
              GeeksforGeeks
            </a>
            <a
              href="https://web.mitsgwalior.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                cursor: "pointer",
                transition: "color 0.3s",
                color: textColorBody,
                textDecoration: "none",
                lineHeight: "1.5",
              }}
              onMouseEnter={(e) => (e.target.style.color = textColorHeading)}
              onMouseLeave={(e) => (e.target.style.color = textColorBody)}
            >
              MITS - DU
            </a>
          </div>
        </div>

        {/* Contact us and Email */}
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <h4
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: textColorHeading,
              marginBottom: "24px",
              lineHeight: "1.2",
            }}
            className="text-3xl font-bold mb-6"
          >
            Contact us
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontSize: "20px",
              color: textColorBody,
              fontWeight: 400,
              flex: 1,
            }}
            className="space-y-4 text-xl"
          >
            <div
              onClick={() => goTo("/contact-us")}
              style={{
                cursor: "pointer",
                transition: "color 0.3s",
                color: textColorBody,
                lineHeight: "1.5",
              }}
              onMouseEnter={(e) => (e.target.style.color = textColorHeading)}
              onMouseLeave={(e) => (e.target.style.color = textColorBody)}
            >
              Contact us
            </div>
            <a
              href="mailto:geeksforgeekmits@gmail.com"
              style={{
                cursor: "pointer",
                transition: "color 0.3s",
                color: textColorBody,
                textDecoration: "none",
                lineHeight: "1.5",
              }}
              onMouseEnter={(e) => (e.target.style.color = textColorHeading)}
              onMouseLeave={(e) => (e.target.style.color = textColorBody)}
            >
              geeksforgeekmits@gmail.com
            </a>
          </div>
        </div>

        {/* Connect */}
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <h4
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: textColorHeading,
              marginBottom: "24px",
              lineHeight: "1.2",
            }}
            className="text-3xl font-bold mb-6"
          >
            Connect
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontSize: "20px",
              color: textColorBody,
              fontWeight: 400,
              flex: 1,
            }}
            className="space-y-4 text-xl"
          >
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
              className="flex space-x-4"
            >
              <a
                href="https://www.linkedin.com/in/geeksforgeeks-mits-student-chapter-5b2986293"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: socialBgColor,
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s",
                  color: isDark ? "white" : "black",
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = socialHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = socialBgColor)
                }
              >
                <Linkedin
                  style={{ width: "20px", height: "20px" }}
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://www.instagram.com/geeksforgeeks_mits/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: socialBgColor,
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s",
                  color: isDark ? "white" : "black",
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = socialHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = socialBgColor)
                }
              >
                <Instagram
                  style={{ width: "20px", height: "20px" }}
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://www.geeksforgeeks.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: socialBgColor,
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s",
                  color: isDark ? "white" : "black",
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = socialHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = socialBgColor)
                }
              >
                <Globe
                  style={{ width: "20px", height: "20px" }}
                  className="w-5 h-5"
                />
              </a>
            </div>
            <div
              style={{
                lineHeight: "1.5",
                cursor: "default",
                transition: "color 0.3s",
                color: textColorBody,
                marginTop: "-7px",
              }}
            >
              <VisitorCountDisplay />
            </div>
          </div>
        </div>
      </div>

      {/* Image button with hover effect */}
      <div
  style={{
    textAlign: "center",
    marginTop: "48px",
    padding: "0 16px",
    fontSize: "20px",
  }}
  className="text-center mt-12 px-4"
>
      <div
        className="logo-button transition-all duration-300 ease-in-out"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 4vw", // responsive padding
          borderRadius: "16px",
          minWidth: "240px", // smaller min width for small screens
          maxWidth: "90%", // prevents overflow on mobile
          border: `2px solid ${isDark ? "#065F46" : "#6EE7B7"}`,
          background: isDark
            ? "linear-gradient(135deg, #064E3B, #047857)"
            : "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
        }}
        onClick={() => goTo("/")}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = isDark
            ? "linear-gradient(135deg, #047857, #059669)"
            : "linear-gradient(135deg, #10B981, #059669)";
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = isDark
            ? "0 8px 25px rgba(4, 120, 87, 0.4)"
            : "0 8px 25px rgba(16, 185, 129, 0.3)";
          el.style.borderColor = isDark ? "#047857" : "#10B981";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = isDark
            ? "linear-gradient(135deg, #064E3B, #047857)"
            : "linear-gradient(135deg, #ECFDF5, #D1FAE5)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
          el.style.borderColor = isDark ? "#065F46" : "#6EE7B7";
        }}
      >
        <img
          src={themeMode === "dark" ? HorizontalDarkGFGLogo : HorizontalLightGFGLogo}
          alt="GeeksforGeeks Logo"
          style={{
            height: "70px",
            width: "auto",
            maxWidth: "100%", // ensures image scales down
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </div>


      {/* Bottom line */}
      <div
        style={{
          width: "90%",
          maxWidth: "1296px",
          margin: "24px auto 0",
          borderTop: `1px solid ${bottomLineColor}`,
          opacity: isDark ? 1 : 0.6,
        }}
      ></div>

      {/* Copyright */}
      <div
        style={{
          paddingTop: "24px",
          paddingBottom: "24px",
          textAlign: "center",
          fontSize: "20px",
          color: textColorBody,
          fontWeight: 400,
        }}
        className="pt-6 pb-6 text-center px-4 text-xl"
      >
        © 2025 GeeksforGeeks Campus Body, MITS-DU Gwalior. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;