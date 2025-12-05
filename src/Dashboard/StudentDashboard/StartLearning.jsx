import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Dummy YouTube videos
const dummyVideos = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  "https://www.youtube.com/embed/L_jWHffIx5E",
  "https://www.youtube.com/embed/fJ9rUzIMcZQ",
  "https://www.youtube.com/embed/kXYiU_JCYtU",
];

const StartLearning = () => {
  const { id } = useParams(); // Matches /courses/:id/player route
  const axiosSecure = useAxiosSecure();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course and enrollment
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await axiosSecure.get(`/api/courses/${id}`);
        setCourse(courseRes.data.data);

        // Fetch specific user enrollment
        const enrollRes = await axiosSecure.get(`/api/enroll/${courseRes.data.data._id}`);
        const userEnrollment = enrollRes.data.data[0] || null;
        setEnrollment(userEnrollment);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, id]);

  // Handle marking lesson complete
  const handleComplete = async (lesson) => {
    if (!enrollment.completedLessons.includes(lesson)) {
      const updatedLessons = [...enrollment.completedLessons, lesson];
      const updatedProgress = Math.min(enrollment.progress + 5, 100);

      try {
        await axiosSecure.patch(`/api/enroll/update/${enrollment._id}`, {
          completedLessons: updatedLessons,
          progress: updatedProgress,
        });

        setEnrollment({
          ...enrollment,
          completedLessons: updatedLessons,
          progress: updatedProgress,
        });
      } catch (err) {
        console.error("Error updating progress:", err);
      }
    }
  };

  if (loading || !course || !enrollment) {
    return <p className="text-center mt-24">Loading course...</p>;
  }

  // Show first 3 lessons (can extend with pagination)
  const lessonsToShow = course.syllabus.slice(0, 3);

  return (
    <div className="max-w-4xl mt-12 mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6">Progress: {enrollment.progress}%</p>

      {lessonsToShow.map((module, idx) => (
        <div key={module._id} className="mb-8 border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">{module.topic}</h2>

          {module.details.map((lesson, i) => {
            const isCompleted = enrollment.completedLessons.includes(lesson);
            const videoLink = dummyVideos[(idx + i) % dummyVideos.length];

            return (
              <div key={i} className="mb-4">
                <iframe
                  className="w-full h-48 rounded"
                  src={videoLink}
                  title={lesson}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>

                <div className="flex justify-between items-center mt-2">
                  <span>{lesson}</span>
                  <button
                    className={`px-3 py-1 rounded ${
                      isCompleted
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={() => handleComplete(lesson)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Completed" : "Mark as Complete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default StartLearning;
