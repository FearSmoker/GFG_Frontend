import React from "react";

const tabs = ["All", "Competitions", "Workshops", "Seminars"];

const EventTabs = ({ selectedEventType, onEventTypeChange }) => {
  return (
    <div
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
        position: "relative",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        gap: "1rem",
      }}
    >
      {tabs.map((tab) => {
        const isSelected = selectedEventType === tab;
        return (
          <button
            key={tab}
            onClick={() => onEventTypeChange(tab)}
            style={{
              cursor: "pointer",
              borderRadius: "100px",
              border: `3px solid #00FFAF`,
              backgroundColor: isSelected ? "#00FFAF" : "transparent",
              color: isSelected ? "black" : "white",
              fontSize: "16px",
              fontFamily: "Cabin, sans-serif",
              fontWeight: 400,
              padding: "6px 18px",
              position: "relative",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.backgroundColor = "#00FFAF33";
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
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