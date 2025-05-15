import { useEffect, useState } from "react";
import { VisitorContext } from "./VisitorContext.jsx";
import { fetchVisitorCount } from "../api/Visitor_api.js";

export const VisitorProvider = ({ children }) => {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    const getCount = async () => {
      const count = await fetchVisitorCount();
      setVisitorCount(count);
    };
    getCount();
  }, []);

  return (
    <VisitorContext.Provider value={{ visitorCount }}>
      {children}
    </VisitorContext.Provider>
  );
};
