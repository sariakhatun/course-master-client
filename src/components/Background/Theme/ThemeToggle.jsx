import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../../../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const handleClick = (e) => {
    e.preventDefault(); // prevent any default action
    e.stopPropagation(); // prevent bubbling
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="z-50 p-2 rounded-full"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
