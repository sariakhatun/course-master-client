// src/pages/CoursePlayer.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { ThemeContext } from "../../context/ThemeContext";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { isDarkMode } = useContext(ThemeContext);

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);

  const demoVideos = [
    "https://www.youtube.com/embed/pQN-pnXPaVg", // HTML Crash Course for Beginners
    "https://www.youtube.com/embed/yfoY53QXEnI", // CSS Crash Course for Beginners
    "https://www.youtube.com/embed/hdI2bqOjy3c", // JavaScript Crash Course for Beginners
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await axiosSecure.get(`/api/courses/${courseId}`);
        const enrollRes = await axiosSecure.get(`/api/enroll/${user.email}`);

        const myEnrollment = enrollRes.data.data.find(
          (e) => e.courseId === courseId
        );

        setCourse(courseRes.data.data);
        setEnrollment(myEnrollment);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, axiosSecure, user.email]);

  const handleMarkComplete = async (videoIndex) => {
    if (!enrollment) return;

    const newProgress = Math.min(100, enrollment.progress + 5);
    const updatedCompleted = [
      ...(enrollment.completedLessons || []),
      videoIndex,
    ];

    try {
      await axiosSecure.patch(`/api/enroll/${enrollment._id}`, {
        progress: newProgress,
        completedLessons: updatedCompleted,
      });

      setEnrollment({
        ...enrollment,
        progress: newProgress,
        completedLessons: updatedCompleted,
      });

      Swal.fire({
        icon: "success",
        title: "Great Job!",
        text: `Lesson ${videoIndex + 1} completed! Progress: ${newProgress}%`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to update progress", "error");
    }
  };

  const isCompleted = (index) => enrollment?.completedLessons?.includes(index);

  if (loading) {
    return <div className="text-center py-20">Loading course...</div>;
  }

  if (!course || !enrollment) {
    return (
      <div className="text-center py-20">
        Course not found or you are not enrolled!
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen mt-24 py-10 transition-colors duration-300 ${
        isDarkMode ? " text-gray-200" : " text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1
            className={`text-3xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-purple-400" : "text-purple-700"
            }`}
          >
            {course.title}
          </h1>
          <div className="flex flex-wrap gap-6 mt-4 text-sm">
            <p>
              Instructor: <strong>{course.instructor.name}</strong>
            </p>
            <p>
              Duration: <strong>{course.duration}</strong>
            </p>
            <p className="text-green-600 font-bold">
              Progress: {enrollment.progress}%
            </p>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${enrollment.progress}%` }}
            />
          </div>
        </div>

        {/* Video Lessons */}
        <div className="grid lg:grid-cols-3 gap-8">
          {course.syllabus.slice(0, 3).map((week, index) => (
            <div
              key={week._id}
              className={`rounded-2xl shadow-lg overflow-hidden transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <div className="aspect-video bg-black">
                <iframe
                  src={demoVideos[index]}
                  title={`Lesson ${index + 1}`}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-6">
                <h3
                  className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkMode ? "text-purple-400" : "text-purple-700"
                  }`}
                >
                  Week {week.week}: {week.topic}
                </h3>
                <ul
                  className={`mt-3 text-sm list-disc pl-5 space-y-1 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {week.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <button
                  onClick={() => handleMarkComplete(index)}
                  disabled={isCompleted(index)}
                  className={`mt-6 w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    isCompleted(index)
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg"
                  }`}
                >
                  {isCompleted(index) ? "Completed" : "Mark as Complete (+5%)"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        {/* More videos info */}
        <div className="text-center mt-6">
          <p
            className={`text-sm italic ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            More videos will be uploaded soon...
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center mt-4">
          <Link
            to="/dashboard/my-courses"
            className={`inline-block px-8 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Back to My Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
