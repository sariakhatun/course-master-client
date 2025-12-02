import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg text-white 
                  bg-gradient-to-r from-primary to-[#b37aff] transition-all duration-500
                  hover:scale-110 z-50
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
