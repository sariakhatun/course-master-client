import React, { useEffect, useState, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../../shared/SectionTitle";

const Assignment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);

  const [enrollments, setEnrollments] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [answerLink, setAnswerLink] = useState("");

  // Fetch enrolled courses
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

  // Update modules when course changes
  useEffect(() => {
    if (selectedCourse) {
      const enrolled = enrollments.find(c => c.courseId === selectedCourse);
      if (!enrolled) return;

      const fullCourse = allCourses.find(c => c._id === enrolled.courseId);
      if (fullCourse && fullCourse.syllabus) {
        setModules(fullCourse.syllabus);
      } else {
        setModules([]);
      }
    } else {
      setModules([]);
    }
    setSelectedModule("");
  }, [selectedCourse, enrollments, allCourses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !selectedModule || !answerLink) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    const moduleObj = modules.find(m => m._id === selectedModule);

    try {
      const res = await axiosSecure.post("/api/assignments/submit", {
        userId: user.uid,
        userEmail: user.email,
        courseId: selectedCourse,
        courseTitle: enrollments.find(c => c.courseId === selectedCourse)?.courseTitle,
        moduleId: moduleObj?._id,
        moduleTitle: moduleObj?.topic || "",
        answer: answerLink,
      });

      if (res.data.success) {
        Swal.fire("Success", "Assignment submitted successfully!", "success");
        setSelectedCourse("");
        setSelectedModule("");
        setAnswerLink("");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Submission failed", "error");
    }
  };

  // Theme classes
  const pageBg = isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900";
  const cardBg = isDarkMode ? "bg-indigo-900/30 border border-indigo-700 text-gray-200 shadow-lg" : "bg-white border border-purple-300 shadow-md";
  const inputBg = isDarkMode ? "bg-indigo-900 text-gray-200 placeholder-gray-400 border-indigo-600" : "bg-white text-gray-900 placeholder-gray-500 border-purple-300";
  const btnTheme = isDarkMode
    ? "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white"
    : "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white";

  return (
   <div>
     {/* Section Title */}
      <div className="text-center mb-12">
        <SectionTitle title={"Assignment"} />
      </div>
     <div className={`max-w-md mx-auto mt-10 p-6 rounded-xl ${cardBg} transition-colors duration-500`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Submit Assignment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className={`border p-2 rounded w-full ${inputBg}`} required
        >
          <option value="">Select Course</option>
          {enrollments.map(c => (
            <option key={c._id} value={c.courseId}>
              {c.courseTitle}
            </option>
          ))}
        </select>

        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className={`border p-2 rounded w-full ${inputBg}`} required
        >
          <option value="">Select Module</option>
          {modules.map(m => (
            <option key={m._id} value={m._id}>
              Week {m.week}: {m.topic}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Google Drive link or answer"
          value={answerLink}
          onChange={(e) => setAnswerLink(e.target.value)}
          className={`border p-2 rounded w-full ${inputBg}`} required
        />

        <button type="submit" className={`w-full py-2 rounded font-semibold shadow-md ${btnTheme}`}>
          Submit Assignment
        </button>
      </form>
    </div>
   </div>
  );
};

export default Assignment;
