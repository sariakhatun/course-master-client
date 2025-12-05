import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../../shared/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  let { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  // Handler to mark a lesson as completed
  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const btnTheme = isDarkMode
    ? "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white"
    : "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white";

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCourse = async () => {
      try {
        const res = await axiosSecure.get(`/api/courses/${id}`);
        if (res.data.success) {
          setCourse(res.data.data); // API should return { success: true, data: course }
        } else {
          Swal.fire("Error", "Course not found!", "error");
          navigate("/courses");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to fetch course!", "error");
        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, axiosSecure, navigate]);

  if (loading) return <p className="text-center mt-12">Loading...</p>;
  if (!course) return <p className="text-center mt-12">Course not found</p>;

  const bg = isDarkMode ? " text-gray-200" : " text-gray-900";
  const cardBg = isDarkMode
    ? "bg-indigo-900/85 text-gray-200 shadow-lg"
    : "bg-purple-100 text-gray-900 shadow-lg";
  const instructorBg = isDarkMode
    ? "bg-indigo-900/30 text-gray-200"
    : "bg-purple-150 text-gray-900";

  const handleEnroll = async () => {
    if (!user?.email) {
      Swal.fire("Error", "You must be logged in to enroll!", "error");
      return;
    }

    try {
      const payload = {
        courseId: course._id,
        courseTitle: course.title,
        instructorName: course.instructor.name,
        userEmail: user.email,
        thumbnail: course.thumbnail,
      };

      const res = await axiosSecure.post("/api/enroll", payload);

      if (res.data.success) {
        Swal.fire("Success", "Enrollment successful ✅", "success");
      }
    } catch (error) {
      if (error.response?.data?.message === "Already enrolled") {
        Swal.fire("Info", "You are already enrolled in this course", "info");
      } else {
        console.error(error);
        Swal.fire("Error", "Failed to enroll. Try again!", "error");
      }
    }
  };

  return (
    <div
      className={`${bg} min-h-screen mt-12 py-12 transition-colors duration-500`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title={course.title} />

        {/* Course Thumbnail */}
        <div className="rounded-xl overflow-hidden shadow-xl mb-8">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Course Card */}
        <div
          className={`rounded-xl ${cardBg} p-8 flex flex-col gap-8 transition-colors duration-500`}
        >
          <p className="text-lg leading-relaxed opacity-90">
            {course.description}
          </p>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Instructor */}
            <div
              className={`md:w-1/3 rounded-lg p-6 flex flex-col items-center text-center shadow-md ${instructorBg}`}
            >
              <img
                src={course.instructor.profileImage}
                alt={course.instructor.name}
                className="w-28 h-28 object-cover rounded-full mb-4 border-2 border-current"
              />
              <h3 className="font-bold text-lg">{course.instructor.name}</h3>
              <p className="text-sm opacity-80">
                {course.instructor.designation}
              </p>
              <p className="text-sm opacity-70">
                {course.instructor.experience}
              </p>
              <p className="text-xs mt-2 opacity-70">{course.instructor.bio}</p>
              <p className="text-xs mt-1 opacity-70">
                {course.instructor.email}
              </p>
            </div>

            {/* Course Info */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Category:</strong> {course.category}
                </p>
                <p>
                  <strong>Price:</strong> ৳{course.price}
                </p>
                <p>
                  <strong>Duration:</strong> {course.duration}
                </p>
                <p>
                  <strong>Tags:</strong> {course.tags.join(", ")}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mt-2">Class Schedule:</h4>
                <ul className="list-disc ml-5 text-sm opacity-90">
                  {course.classSchedule.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mt-2">Syllabus:</h4>
                <ul className="ml-5 flex flex-col gap-2">
                  {course.syllabus.map((lesson) => (
                    <li
                      key={lesson._id}
                      className="p-4 border rounded flex justify-between items-center"
                    >
                      <div>
                        <strong>Week {lesson.week}:</strong> {lesson.topic} -{" "}
                        {lesson.details.join(", ")}
                      </div>
                      {/* <button
                        className={`px-3 py-1 rounded font-semibold text-white ${
                          completedLessons.includes(lesson._id)
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-blue-500"
                        }`}
                        onClick={() => handleCompleteLesson(lesson._id)}
                        disabled={completedLessons.includes(lesson._id)}
                      >
                        {completedLessons.includes(lesson._id)
                          ? "Completed"
                          : "Mark as Completed"}
                      </button> */}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold">
                  Progress:{" "}
                  {Math.floor(
                    (completedLessons.length / course.syllabus.length) * 100
                  )}
                  %
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mt-2">Course Outline:</h4>
                <ul className="list-disc ml-5 text-sm opacity-90">
                  {course.courseOutline.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {course.batches && course.batches.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mt-2">Batches:</h4>
                  <ul className="list-disc ml-5 text-sm opacity-90">
                    {course.batches.map((batch, i) => (
                      <li key={i}>
                        {batch.name} - Starts: {batch.startDate}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6 flex-col sm:flex-row">
            <button
              className="btn btn-error flex-1 py-3 rounded-lg font-semibold shadow-md"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className={`btn flex-1 py-3 rounded-lg font-semibold shadow-md ${btnTheme}`}
              onClick={handleEnroll}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
