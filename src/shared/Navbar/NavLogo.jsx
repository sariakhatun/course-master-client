import React, { useEffect, useState } from "react";
import icon from "/favicon.png";
import icon2 from "/favicon2.png";

const NavLogo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme(); // Initial check

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center gap-1">
      <img src={icon2} alt="Logo" className="w-12 md:w-16" />
      <a href="/" className="mont text-white font-bold text-lg sm:text-2xl md:text-[28px]">
        CourseMaster
      </a>
    </div>
  );
};

export default NavLogo;
