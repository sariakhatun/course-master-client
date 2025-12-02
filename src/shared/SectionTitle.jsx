import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const SectionTitle = ({ title }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="relative text-center mb-14">
      <motion.h2
        initial={{ scale: 0.7, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 0.65 }}
        viewport={{ amount: 0.5 }}
        className={`text-[45px] sm:text-6xl md:text-[72px] lg:text-[90px] font-bold uppercase opacity-15 ${
          isDarkMode ? "text-white/20" : "text-black/15"
        }`}
      >
        {title.toUpperCase()}
      </motion.h2>
      <p
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl font-extrabold ${
          isDarkMode
            ? "text-neutral-200 text-shadow-[2px_2px_10px_rgb(255_255_255/0.15)]"
            : "text-neutral text-shadow-[2px_2px_10px_rgb(0_0_0/0.15)]"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default SectionTitle;
