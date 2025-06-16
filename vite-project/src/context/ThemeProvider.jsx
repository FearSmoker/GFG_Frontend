import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme || "light";
  });

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    const root = document.querySelector("html");
    root.classList.remove("light", "dark");
    root.classList.add(themeMode);
    
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, lightTheme, darkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;