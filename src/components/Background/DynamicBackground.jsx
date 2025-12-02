// DynamicBackground.jsx
import React, { useContext } from "react";
import DarkBackground from "./DarkBackground";
import Background from "./Background";
import { ThemeContext } from "../../context/ThemeContext";

const DynamicBackground = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return isDarkMode ? (
    <DarkBackground>{children}</DarkBackground>
  ) : (
    <Background>{children}</Background>
  );
};

export default DynamicBackground;
