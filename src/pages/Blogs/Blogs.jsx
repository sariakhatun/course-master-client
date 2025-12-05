import React, { useState, useEffect, useContext } from "react";
import SectionTitle from "../../shared/SectionTitle";
import { ThemeContext } from "../../context/ThemeContext";

// Dummy blog data
const dummyBlogs = [
  {
    id: 1,
    title: "Top 10 MERN Stack Tips",
    excerpt: "Learn the best practices and tips to master MERN Stack development.",
    author: "John Doe",
    date: "2025-12-01",
    link: "#",
  },
  {
    id: 2,
    title: "React Hooks You Must Know",
    excerpt: "A complete guide to React hooks and how to use them effectively.",
    author: "Jane Smith",
    date: "2025-11-25",
    link: "#",
  },
  {
    id: 3,
    title: "Backend Security Tips",
    excerpt: "Keep your Node.js and Express apps secure with these best practices.",
    author: "Mike Ross",
    date: "2025-11-20",
    link: "#",
  },
];

const Blogs = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Simulate fetching data from API
    setBlogs(dummyBlogs);
  }, []);
  const buttonBg = isDarkMode ? "bg-indigo-800 hover:bg-indigo-900 " : " bg-purple-500 hover:bg-purple-700";

  return (
    <div
      className={`max-w-6xl mx-auto my-24 px-4 transition-colors duration-300 ${
        isDarkMode ? "text-gray-200" : "text-gray-900"
      }`}
    >
      <div className="text-center mb-12">
        <SectionTitle title={"Blog"} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${
              isDarkMode ? "bg-indigo-900" : "bg-purple-100"
            }`}
          >
            <div className="p-6">
              <h2
                className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {blog.title}
              </h2>
              <p
                className={`text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {blog.excerpt}
              </p>
              <div
                className={`flex justify-between text-sm mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
              <a
                href={blog.link}
                className={`inline-block px-4 py-2 rounded-lg font-semibold text-white  transition-colors duration-300 shadow-md ${buttonBg}`}
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
