import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllCoursesTable = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async (page = 1) => {
    try {
      const res = await axiosSecure.get(`/api/courses?page=${page}`);
      setCourses(res.data.data);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      console.log("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses(page);
  }, [page, axiosSecure]);

  const handleDelete = async (courseId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this course? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/courses/${courseId}`);
        setCourses(courses.filter((course) => course._id !== courseId));
        Swal.fire({
          title: "Deleted!",
          text: "The course has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.log("Delete error:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the course.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Cancelled",
        text: "The course is safe.",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        isDarkMode ? " text-gray-200" : " text-gray-900"
      }`}
    >
      <SectionTitle title="All Courses" />

      <div className="overflow-x-auto mt-6 rounded-lg shadow-md">
        <table
          className={`min-w-full border-collapse border ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <thead
            className={`${
              isDarkMode ? "bg-indigo-800 text-gray-100" : "bg-gray-100 text-gray-900"
            }`}
          >
            <tr>
              <th className="px-4 py-3 text-left font-medium">Course Title</th>
              <th className="px-4 py-3 text-left font-medium">Price</th>
              <th className="px-4 py-3 text-left font-medium">Instructor</th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr
                  key={course._id}
                  className={`border-t ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  } hover:${
                    isDarkMode ? "bg-indigo-700" : "bg-gray-200"
                  } transition-colors duration-300`}
                >
                  <td className="px-4 py-3">{course.title}</td>
                  <td className="px-4 py-3">${course.price || "Free"}</td>
                  <td className="px-4 py-3">{course.instructor?.name || "N/A"}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Link
                      to={`/courses/${course._id}`}
                      className={`px-2 py-1 rounded text-white transition ${
                        isDarkMode
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      View
                    </Link>
                    <Link
                      to={`/dashboard/courses/update/${course._id}`}
                      className={`px-2 py-1 rounded text-white transition ${
                        isDarkMode
                          ? "bg-yellow-600 hover:bg-yellow-500"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className={`px-2 py-1 rounded text-white transition ${
                        isDarkMode
                          ? "bg-red-600 hover:bg-red-500"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded transition ${
              page === i + 1
                ? "bg-blue-500 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesTable;
