import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";

const TopSellingCourses = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  useEffect(() => {
    // Fetch only 6 courses (top selling)
    const fetchCourses = async () => {
      try {
        const res = await axiosSecure.get("/api/courses", {
          params: { page: 1, limit: 6, sort: "topSelling" },
        });
        if (res.data.success && Array.isArray(res.data.data)) {
          setCourses(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching top courses:", error);
      }
    };
    fetchCourses();
  }, [axiosSecure]);

  const cardBg = isDarkMode
    ? "bg-indigo-900/30 border-indigo-600"
    : "bg-purple-50 border-purple-300";
  const titleColor = isDarkMode ? "text-indigo-300" : "text-purple-700";
  const priceColor = isDarkMode ? "text-indigo-400" : "text-purple-600";
  const btnTheme = isDarkMode
    ? "btn bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600"
    : "btn bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:from-purple-700 hover:to-purple-500";
     const textPrimary = isDarkMode ? "text-white" : "text-black";

  const truncateText = (text, length = 80) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
     <div className="text-center my-12">
        <SectionTitle title={"Top Selling Courses"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <motion.div
              key={course._id}
              data-aos="fade-up"
              data-aos-delay={index * 70}
              className={`shadow-md rounded-xl overflow-hidden border transition-all hover:shadow-xl ${cardBg} flex flex-col justify-between`}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={course.thumbnail}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 flex flex-col gap-2 flex-grow">
                <h3 className={`text-xl font-bold ${titleColor}`}>
                  {course.title}
                </h3>
                <p className={`text-sm opacity-80 font-semibold ${textPrimary}`}>
                  👨‍🏫 {course.instructor.name}
                </p>
                <p className={`${textPrimary}`}>
                  {truncateText(course.description)}
                </p>
                <p className={`font-bold text-lg mt-2 ${textPrimary}`}>
                  ৳{course.price}
                </p>
                <Link
                  to={`/courses/${course._id}`}
                  className={`${btnTheme} w-full mt-auto`}
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center mt-10">
            No top courses available!
          </p>
        )}
      </div>

      {/* View All Courses Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/courses"
          className={`${btnTheme} px-8 py-3 text-lg font-semibold`}
        >
          View All Courses
        </Link>
      </div>
    </section>
  );
};

export default TopSellingCourses;
