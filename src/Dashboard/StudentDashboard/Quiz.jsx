import React, { useEffect, useState, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../../shared/SectionTitle";

const Quiz = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);

  const [enrollments, setEnrollments] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Fetch user enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axiosSecure.get(`/api/enroll/${user.email}`);
        if (res.data.success) setEnrollments(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEnrollments();
  }, [user.email, axiosSecure]);

  // Fetch all courses
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axiosSecure.get("/api/courses");
        if (res.data.success) setAllCourses(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllCourses();
  }, [axiosSecure]);

  // Filter available courses based on enrollments
  useEffect(() => {
    const filtered = allCourses.filter((course) =>
      enrollments.some((enroll) => enroll.courseId === course._id)
    );
    setAvailableCourses(filtered);
  }, [allCourses, enrollments]);

  // Fetch modules when a course is selected
  useEffect(() => {
    const fetchModules = async () => {
      if (!selectedCourse) return;

      try {
        const res = await axiosSecure.get(`/api/quizzes/${selectedCourse}`);
        if (res.data.success && res.data.data.quizzes) {
          setModules(res.data.data.quizzes); // quizzes array from MongoDB
        } else {
          setModules([]);
        }
      } catch (err) {
        console.error(err);
        setModules([]);
      }
    };

    fetchModules();
    setSelectedModule("");
    setQuizQuestions([]);
    setUserAnswers({});
    setScore(null);
    setSubmitted(false);
  }, [selectedCourse, axiosSecure]);

  // Fetch quiz questions when module is selected
  useEffect(() => {
    if (!selectedModule) {
      setQuizQuestions([]);
      setUserAnswers({});
      setScore(null);
      setSubmitted(false);
      return;
    }

    const module = modules.find((m) => m.moduleId === selectedModule);
    if (module && module.questions) {
      setQuizQuestions(module.questions);
      const initialAnswers = {};
      module.questions.forEach((q) => {
        initialAnswers[q._id] = "";
      });
      setUserAnswers(initialAnswers);
      setScore(null);
      setSubmitted(false);
    }
  }, [selectedModule, modules]);

  const handleAnswerChange = (questionId, answer) => {
    if (submitted) return; // prevent changing answers after submission
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (userAnswers[q._id] === q.correctAnswer) correctCount += 1;
    });

    const calculatedScore = Math.round(
      (correctCount / quizQuestions.length) * 100
    );
    setScore(calculatedScore);
    setSubmitted(true);
    Swal.fire(`You scored ${calculatedScore}%`);
  };

  // Theme classes
  const cardBg = isDarkMode
    ? "bg-indigo-900/30 border border-indigo-700 text-gray-200 shadow-lg"
    : "bg-white border border-purple-300 shadow-md";
  const inputBg = isDarkMode
    ? "bg-indigo-900 text-gray-200 placeholder-gray-400 border-indigo-600"
    : "bg-white text-gray-900 placeholder-gray-500 border-purple-300";
  const btnTheme = isDarkMode
    ? "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white"
    : "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white";

  return (
    <div>
      <div className="text-center mb-12">
        <SectionTitle title={"Quiz"} />
      </div>

      {/* Course & Module selection */}
      {!quizQuestions.length && (
        <div
          className={`max-w-md mx-auto mt-10 p-6 rounded-xl ${cardBg} transition-colors duration-500`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Select Quiz Module
          </h2>
          <form className="flex flex-col gap-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={`border p-2 rounded w-full ${inputBg}`}
              required
            >
              <option value="">Select Course</option>
              {availableCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>

            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className={`border p-2 rounded w-full ${inputBg}`}
              required
            >
              <option value="">Select Module</option>
              {modules.map((m) => (
                <option key={m.moduleId} value={m.moduleId}>
                  {m.moduleTitle}
                </option>
              ))}
            </select>
          </form>
        </div>
      )}

      {/* Quiz Questions */}
      {quizQuestions.length > 0 && (
        <div
          className={`max-w-2xl mx-auto mt-10 p-6 rounded-xl ${cardBg} transition-colors duration-500`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Quiz:{" "}
            {modules.find((m) => m.moduleId === selectedModule)?.moduleTitle}
          </h2>
          <form className="flex flex-col gap-6">
            {quizQuestions.map((q, idx) => {
              const isCorrect = userAnswers[q._id] === q.correctAnswer;
              const showCorrect = submitted && !isCorrect;
              return (
                <div key={q._id}>
                  <p className="font-semibold mb-2">
                    {idx + 1}. {q.question}
                  </p>
                  {q.options.map((opt, idx) => {
                    let optionClass = "";
                    if (submitted) {
                      if (idx === q.correct) {
                        optionClass = "bg-green-200 text-green-900"; // correct answer
                      } else if (userAnswers[q._id] === idx) {
                        optionClass = "bg-red-200 text-red-900 line-through"; // wrong answer
                      }
                    }

                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 p-1 rounded ${optionClass}`}
                      >
                        <input
                          type="radio"
                          name={q._id}
                          value={idx}
                          checked={userAnswers[q._id] === idx}
                          onChange={() => handleAnswerChange(q._id, idx)}
                          disabled={submitted}
                          className="accent-purple-500"
                        />
                        {opt}
                      </label>
                    );
                  })}

                  {/* Show correct answer if user got it wrong */}
                  {showCorrect && (
                    <p className="text-green-700 font-semibold mt-1">
                      Correct Answer: {q.correctAnswer}
                    </p>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              className={`w-full py-2 rounded font-semibold shadow-md ${btnTheme}`}
              onClick={handleSubmitQuiz}
              disabled={submitted}
            >
              Submit Quiz
            </button>

            {score !== null && (
              <p className="mt-4 text-center font-bold text-lg">
                Your Score: {score}%
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Quiz;
