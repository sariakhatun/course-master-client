import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../shared/SectionTitle";

const MyCourses = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axiosSecure.get(`/api/enroll/${user.email}`);
        if (res.data.success) setEnrollments(res.data.data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }finally {
      setLoading(false);
    }
    };
    fetchEnrollments();
  }, [axiosSecure, user.email]);
  if (loading) return <p className="text-center mt-12">Loading your courses...</p>;


  // Theme classes
  const pageBg = isDarkMode
    ? "text-gray-200 bg-gray-900"
    : "text-gray-900 bg-gray-50";
  const cardBg = isDarkMode
    ? "bg-indigo-900/30 border border-indigo-700 text-gray-200 shadow-lg"
    : "bg-purple-50 border border-purple-300 text-gray-900 shadow-md";
  const titleColor = isDarkMode ? "text-indigo-300" : "text-purple-700";
  const instructorColor = isDarkMode ? "text-white " : "text-black";

  const btnTheme = isDarkMode
    ? "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white"
    : "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white";

  return (
    <div className={` min-h-screen py-12 transition-colors duration-500`}>
      <div className="text-center mb-12">
        <SectionTitle title={"My Courses"} />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-6 px-4">
        {enrollments.length > 0 ? (
          enrollments.map((enroll) => (
            <div
              key={enroll._id}
              className={`p-6 rounded-xl ${cardBg} flex flex-col transition-all hover:shadow-xl`}
            >
              <img
                src={enroll.thumbnail}
                alt={enroll.courseTitle}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className={`text-xl font-bold ${titleColor}`}>
                {enroll.courseTitle}
              </h3>
              <p className={`${instructorColor} text-sm`}>
                Instructor: {enroll.instructorName}
              </p>
              <p className={`${instructorColor} text-sm`}>
                Progress: {enroll.progress}%
              </p>
              <p className={`${instructorColor} text-xs`}>
                Enrolled At: {new Date(enroll.enrolledAt).toLocaleString()}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Link
                  to={`/courses/${enroll.courseId}`}
                  className={`btn ${btnTheme} flex-1`}
                >
                  View Course
                </Link>

                <Link
                  to={`/courses/${enroll.courseId}/player`}
                  className={`btn ${btnTheme} flex-1`}
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center mt-10">
            You haven't enrolled in any courses yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
