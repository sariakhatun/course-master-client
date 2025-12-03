import React, { useState, useContext, useEffect } from "react";
import courses from "../../assets/courses.json";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionTitle from "../../shared/SectionTitle";
import CoursesBanner from "./CourseBanner";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router";

const Courses = () => {
  const { isDarkMode } = useContext(ThemeContext);
 useEffect(() => {
         window.scrollTo(0, 0);
       }, []);

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  // Theme Colors
  const cardBg = isDarkMode
    ? "bg-indigo-900/30 border-indigo-600"
    : "bg-purple-50 border-purple-300";
  const titleColor = isDarkMode ? "text-indigo-300" : "text-purple-700";
  const priceColor = isDarkMode ? "text-indigo-400" : "text-purple-600";
  const btnTheme = isDarkMode
    ? "btn bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600"
    : "btn bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:from-purple-700 hover:to-purple-500";

  const modalBg = isDarkMode
    ? "bg-indigo-950 text-gray-200"
    : "bg-white text-gray-800";

  const truncateText = (text, length = 100) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
        <div className={`${isDarkMode ? " text-gray-200" : " text-gray-800"}`}>
      <CoursesBanner />
      <div className="text-center my-12">
        <SectionTitle title={"Available Courses"} />
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-24">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            data-aos="fade-up"
            data-aos-delay={index * 70}
            className={`shadow-md rounded-xl overflow-hidden border transition-all hover:shadow-xl ${cardBg} flex flex-col justify-between`}
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              src={course.thumbnail}
              className="w-full h-52 object-cover"
            />

            <div className="p-4 flex flex-col gap-2 flex-grow">
              <h3 className={`text-xl font-bold ${titleColor}`}>
                {course.title}
              </h3>

              <p className="text-sm opacity-80 font-semibold">👨‍🏫 <span className="">Instructor : </span> {course.instructor.name}</p>

              <p className="text-sm opacity-90">{truncateText(course.description, 80)}</p>

              <p className={`font-bold text-lg mt-2 ${priceColor}`}>৳{course.price}</p>

              <Link
                to={`/courses/${course._id}`}
                className={`${btnTheme} w-full mt-auto`}
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
