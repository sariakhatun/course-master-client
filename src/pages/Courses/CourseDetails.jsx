import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courses from "../../assets/courses.json";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../../shared/SectionTitle";
import Swal from "sweetalert2";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  const btnTheme = isDarkMode
    ? "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white"
    : "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white";

  const course = courses.find((c) => c._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course)
    return <p className="text-center mt-12 text-lg">Course not found</p>;

  const bg = isDarkMode ? " text-gray-200" : " text-gray-900";
  const cardBg = isDarkMode
    ? "bg-indigo-900/85 text-gray-200 shadow-lg"
    : "bg-purple-100 text-gray-900 shadow-lg";
  const instructorBg = isDarkMode
    ? "bg-indigo-900/30 text-gray-200"
    : "bg-purple-150 text-gray-900";

  const handleEnroll = () => {
    // Navigate to payment page instead of batch selection here
    console.log('enrollment successful')
  };

  return (
    <div className={`${bg} min-h-screen py-12 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title={course.title} />

        {/* Course Thumbnail */}
        <div className="rounded-xl overflow-hidden shadow-xl  mb-8">
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
          {/* Description */}
          <p className="text-lg leading-relaxed opacity-90">{course.description}</p>

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
              <p className="text-sm opacity-80">{course.instructor.designation}</p>
              <p className="text-sm opacity-70">{course.instructor.experience}</p>
              <p className="text-xs mt-2 opacity-70">{course.instructor.bio}</p>
              <p className="text-xs mt-1 opacity-70">{course.instructor.email}</p>
            </div>

            {/* Course Info */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Basic Info */}
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

              {/* Class Schedule */}
              <div>
                <h4 className="font-semibold text-lg mt-2">Class Schedule:</h4>
                <ul className="list-disc ml-5 text-sm opacity-90">
                  {course.classSchedule.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Syllabus */}
              <div>
                <h4 className="font-semibold text-lg mt-2">Syllabus:</h4>
                <ul className="list-disc ml-5 text-sm opacity-90">
                  {course.syllabus.map((item, i) => (
                    <li key={i}>
                      <strong>Week {item.week}:</strong> {item.topic} -{" "}
                      {item.details.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Outline */}
              <div>
                <h4 className="font-semibold text-lg mt-2">Course Outline:</h4>
                <ul className="list-disc ml-5 text-sm opacity-90">
                  {course.courseOutline.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Batches Info */}
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

          {/* Buttons */}
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
