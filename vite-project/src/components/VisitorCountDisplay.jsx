import { useContext } from "react";
import { VisitorContext } from "../context/VisitorContext.jsx";

const VisitorCountDisplay = () => {
  const { visitorCount } = useContext(VisitorContext);

  return (
    <div style={{ padding: "1rem", fontSize: "1.1rem", color: "#fff" }}>
      {visitorCount !== null ? (
        <p style={{ color: "#6b7280" }}>👋🏻 Total Visitors: <strong>{visitorCount}</strong></p>
      ) : (
        <p>Loading visitor count...</p>
      )}
    </div>
  );
};

export default VisitorCountDisplay;