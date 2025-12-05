import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { ThemeContext } from "../../context/ThemeContext";

const StudentDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { isDarkMode } = useContext(ThemeContext);

  const [enrollments, setEnrollments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;

      try {
        const [enrollRes, assignRes] = await Promise.all([
          axiosSecure.get("/api/enroll"),
          axiosSecure.get("/api/assignments"),
        ]);

        // Filter data for logged-in student
        const userEnrollments = enrollRes.data.data.filter(
          (e) => e.userEmail === user.email
        );
        const userAssignments = assignRes.data.data.filter(
          (a) => a.userEmail === user.email
        );

        setEnrollments(userEnrollments);
        setAssignments(userAssignments);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, axiosSecure]);

  if (loading)
    return (
      <div
        className={`text-center py-20 transition-colors duration-300 ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Loading your data...
      </div>
    );

  const totalProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((acc, e) => acc + (e.progress || 0), 0) /
            enrollments.length
        )
      : 0;

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        isDarkMode ? " text-gray-200" : " text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
          isDarkMode ? "text-indigo-400" : "text-gray-800"
        }`}
      >
        Your Dashboard
      </h1>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div
          className={`rounded-lg shadow p-6 transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-800" : "bg-purple-100"
          }`}
        >
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
            Courses Enrolled
          </h3>
          <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>{enrollments.length}</p>
        </div>

        <div
          className={`rounded-lg shadow p-6 transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-800" : "bg-purple-100"
          }`}
        >
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
            Assignments Submitted
          </h3>
          <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>{assignments.length}</p>
        </div>

        <div
          className={`rounded-lg shadow p-6 transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-800" : "bg-purple-100"
          }`}
        >
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
            Overall Progress
          </h3>
          <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>{totalProgress}%</p>
        </div>
      </div>

      {/* Courses List */}
      {/* <div className="mt-8">
        <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
          Your Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrollments.map((e) => (
            <div
              key={e._id}
              className={`rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={e.thumbnail}
                alt={e.courseTitle}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{e.courseTitle}</h3>
                <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Instructor: {e.instructorName}
                </p>
                <p className={`mt-2 font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                  Progress: {e.progress || 0}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default StudentDashboardHome;
