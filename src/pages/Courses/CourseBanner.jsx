import React from "react";
import banner from "../../assets/courseBanner.jpeg";
import { motion } from "framer-motion";

const CoursesBanner = () => {
  const features = [
    "Learn from industry experts",
    "Build real projects",
    "Earn recognized certificates",
    "Flexible learning anytime",
    "Access on any device",
  ];

  return (
    <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${banner})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-2xl"
        >
          Discover Courses That Transform Careers
        </motion.h2>

        {/* Features / Highlights */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-3 flex flex-wrap justify-center gap-3 text-sm sm:text-base md:text-lg text-gray-200 drop-shadow-lg"
        >
          {features.map((feat, i) => (
            <span key={i} className="after:content-['•'] last:after:content-['']">
              {feat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesBanner;
