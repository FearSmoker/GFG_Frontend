import { useNavigate } from "react-router-dom";
import { NavigationContext } from "./NavigationContext.jsx";

const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ goTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
