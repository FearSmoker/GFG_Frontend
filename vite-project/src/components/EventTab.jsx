import React from "react";
import useTheme from "../context/ThemeContext.jsx";

const tabs = ["All", "Competitions", "Workshops", "Seminars"];

const EventTabs = ({ selectedEventType, onEventTypeChange }) => {
  const { themeMode } = useTheme();

  return (
    <div className="gap-1 md:gap-5"
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
        position: "relative",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        
      }}
    >
      {tabs.map((tab) => {
        const isSelected = selectedEventType === tab;
        return (
          <button
          className="text-[10px] sm:text-base "
            key={tab}
            onClick={() => onEventTypeChange(tab)}
            style={{
              cursor: "pointer",
              borderRadius: "100px",
              border: `3px solid #00FFAF`,
              backgroundColor: isSelected 
                ? "#00FFAF" 
                : "transparent",
              color: isSelected 
                ? "#002b46"
                : (themeMode === "dark" ? "white" : "#002b46"),
              
              fontFamily: "Cabin, sans-serif",
              fontWeight: 400,
              padding: "6px 18px",
              position: "relative",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = themeMode === "dark" 
                  ? "#00FFAF55" 
                  : "#00FFAF44";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default EventTabs;