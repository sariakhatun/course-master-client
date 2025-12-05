import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CoursePlayer = () => {
  const { id } = useParams(); // matches /courses/:id/player
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0); // track lesson index
  const [completedLessons, setCompletedLessons] = useState([]);

  const email = localStorage.getItem("email"); // logged-in user's email

  useEffect(() => {
    // Fetch course details
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err));

    // Fetch user's progress
    axios
      .get(`http://localhost:5000/api/enroll/progress/${id}`, {
        params: { email },
      })
      .then((res) => {
        setProgress(res.data.progress || 0);
        setCompletedLessons(res.data.completedLessons || []);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleMarkCompleted = async () => {
    try {
      const lessonId = course.lessons[currentLesson]._id;

      const res = await axios.patch(
        `http://localhost:5000/api/enroll/complete-lesson`,
        {
          courseId: id,
          email,
          lessonId,
        }
      );

      setProgress(res.data.progress);
      setCompletedLessons(res.data.completedLessons);

      alert("Lesson marked as completed!");

      // auto move to next lesson if exists
      if (currentLesson < course.lessons.length - 1) {
        setCurrentLesson(currentLesson + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!course) return <p className="text-center mt-10">Loading course...</p>;

  const lesson = course.lessons[currentLesson];

  return (
    <div className="w-[80%] mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded h-4 mb-4">
        <div
          className="bg-blue-600 h-4 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mb-4 font-semibold">{progress}% Completed</p>

      {/* Current Lesson Video */}
      <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
      <iframe
        width="100%"
        height="450"
        src={lesson.videoUrl.replace("watch?v=", "embed/")}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      {/* Mark Completed Button */}
      <div className="flex justify-between items-center mt-5">
        <button
          onClick={handleMarkCompleted}
          disabled={completedLessons.includes(lesson._id)}
          className={`px-4 py-2 rounded text-white ${
            completedLessons.includes(lesson._id)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {completedLessons.includes(lesson._id)
            ? "Completed"
            : "Mark as Completed"}
        </button>

        {currentLesson < course.lessons.length - 1 && (
          <button
            onClick={() => setCurrentLesson(currentLesson + 1)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Next Lesson
          </button>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
