// OurServices.jsx
import React, { useContext } from "react";
import { FaChalkboardTeacher, FaBookOpen, FaLaptopCode, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../../shared/SectionTitle"; // optional, your shared title component

const servicesData = [
  {
    icon: <FaBookOpen />,
    title: "Browse Courses",
    description:
      "Explore a wide range of courses across multiple categories, with easy search, filter, and sorting options.",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Learn from Experts",
    description:
      "Our instructors are industry professionals, delivering high-quality content with hands-on exercises.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Interactive Learning",
    description:
      "Watch video lectures, take quizzes, submit assignments, and track your progress seamlessly.",
  },
  {
    icon: <FaUsers />,
    title: "Student Dashboard",
    description:
      "Keep track of enrolled courses, completed lessons, and certificates from a unified dashboard.",
  },
];

const OurServices = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <SectionTitle title="Our Services" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`p-6 rounded-xl shadow-lg flex flex-col items-center text-center space-y-4 transition-all duration-300 ${
              isDarkMode
                ? "bg-indigo-900 text-white shadow-white/20 hover:shadow-white/40"
                : "bg-purple-100 text-gray-900 shadow-purple-300 hover:shadow-purple-500"
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className={`text-4xl mb-2 ${isDarkMode ? "text-white" : "text-purple-700"}`}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-sm md:text-base">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
