import { useContext } from "react";
import { VisitorContext } from "../context/VisitorContext.jsx";

const VisitorCountDisplay = () => {
  const { visitorCount } = useContext(VisitorContext);

  return (
    <div style={{ fontSize: "1.1rem" }}>
      {visitorCount !== null ? (
        <p style={{ color: "#6b7280", margin: 0 }}>👋🏻 Total Visitors: <strong>{visitorCount}</strong></p>
      ) : (
        <p style={{ margin: 0 }}>Loading visitor count...</p>
      )}
    </div>
  );
};

export default VisitorCountDisplay;