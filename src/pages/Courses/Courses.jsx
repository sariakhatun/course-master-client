import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionTitle from "../../shared/SectionTitle";
import CoursesBanner from "./CourseBanner";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Courses = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [sort, setSort] = useState(""); // priceLow, priceHigh
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Add state for options
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const limit = 6; // items per page

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  // Fetch courses from backend with query params
  const fetchCourses = async () => {
    try {
      const res = await axiosSecure.get("/api/courses", {
        params: { page, limit, search, category, tags, sort },
      });
      if (res.data.success && Array.isArray(res.data.data)) {
        setCourses(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      } else {
        setCourses([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [axiosSecure, search, category, tags, sort, page]);
  // Extract unique categories & tags from courses
  useEffect(() => {
    if (courses.length > 0) {
      const uniqueCategories = [...new Set(courses.map((c) => c.category))];
      setCategories(uniqueCategories);

      const tagsSet = new Set();
      courses.forEach((c) => c.tags.forEach((t) => tagsSet.add(t)));
      setAllTags([...tagsSet]);
    }
  }, [courses]);

  // Theme Colors
  const cardBg = isDarkMode
    ? "bg-indigo-900/30 border-indigo-600"
    : "bg-purple-50 border-purple-300";
  const titleColor = isDarkMode ? "text-indigo-300" : "text-purple-700";
  const priceColor = isDarkMode ? "text-indigo-400" : "text-purple-600";
  const btnTheme = isDarkMode
    ? "btn bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600"
    : "btn bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:from-purple-700 hover:to-purple-500";

  const truncateText = (text, length = 100) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  // Theme-based input and button classes
  const inputClass = isDarkMode
    ? "input input-bordered bg-indigo-900 text-gray-200 placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "input input-bordered bg-purple-50 text-gray-900 placeholder-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500";

  const selectClass = isDarkMode
    ? "select select-bordered bg-indigo-900 text-gray-200 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "select select-bordered bg-purple-50 text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500";

  const paginationBtn = isDarkMode
    ? "btn btn-sm bg-indigo-700 text-white border-indigo-600 hover:bg-indigo-800"
    : "btn btn-sm bg-purple-600 text-white border-purple-500 hover:bg-purple-700";

  // Pagination controls
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className={`${isDarkMode ? " text-gray-200" : " text-gray-800"}`}>
      <CoursesBanner />
      <div className="text-center my-12">
        <SectionTitle title={"Available Courses"} />
      </div>

      
      {/* 🔹 Search / Filter / Sort Controls */}
      <div className="max-w-6xl mx-auto px-4 mb-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title or instructor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} w-full sm:w-1/3`}
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`${selectClass} w-full sm:w-1/4`}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Tags Dropdown */}
        <select
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={`${selectClass} w-full sm:w-1/4`}
        >
          <option value="">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={`${selectClass} w-full sm:w-1/6`}
        >
          <option value="">Sort by</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>

     

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-24">
        {courses.length > 0 ? (
          courses.map((course, index) => (
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
                <p className="text-sm opacity-80 font-semibold">
                  👨‍🏫 Instructor: {course.instructor.name}
                </p>
                <p className="text-sm opacity-90">
                  {truncateText(course.description, 80)}
                </p>
                <p className={`font-bold text-lg mt-2 ${priceColor}`}>
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
          <p className="text-center col-span-full mt-10">
            No courses available!
          </p>
        )}
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-12">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`${paginationBtn} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Prev
          </button>
          <span className={`${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`${paginationBtn} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;
