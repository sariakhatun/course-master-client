import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { ThemeContext } from "../../context/ThemeContext";

const AllAssignment = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);

  const [submissions, setSubmissions] = useState([]);
  const [users, setUsers] = useState([]);

  // Filter states
  const [filterCourse, setFilterCourse] = useState("");
  const [filterStudent, setFilterStudent] = useState("");

  useEffect(() => {
    // Load all submissions
    axiosSecure
      .get("/api/assignments") // use /all endpoint
      .then((res) => setSubmissions(res.data.data))
      .catch((err) => console.log(err));

    // Load all users for name/photo
    axiosSecure
      .get("/api/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  // Find user by email
  const findUser = (email) => users.find((u) => u.email === email);

  // Filtered submissions
  const filteredSubmissions = submissions.filter((item) => {
    const course = item.courseTitle || "";
    const studentEmail = item.userEmail || "";

    const matchesCourse = filterCourse
      ? course.toLowerCase().includes(filterCourse.toLowerCase())
      : true;
    const matchesStudent = filterStudent
      ? studentEmail.toLowerCase().includes(filterStudent.toLowerCase())
      : true;

    return matchesCourse && matchesStudent;
  });

  return (
    <div className={`p-6 ${isDarkMode ? " text-white" : " text-black"} min-h-screen`}>
      <div className="text-center -mt-12 -mb-12">
        <SectionTitle title={"All Assignment Submissions"} />
      </div>

      {/* Filters
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by course title..."
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className={`border p-2 rounded flex-1 ${
            isDarkMode ? "bg-indigo-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
          }`}
        />
        <input
          type="text"
          placeholder="Search by student email..."
          value={filterStudent}
          onChange={(e) => setFilterStudent(e.target.value)}
          className={`border p-2 rounded flex-1 ${
            isDarkMode ? "bg-indigo-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
          }`}
        />
      </div> */}

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredSubmissions.map((item) => {
          const user = findUser(item.userEmail);

          return (
            <div
              key={item._id}
              className={`border rounded-xl p-4 shadow-md transition-transform duration-300 hover:scale-105 ${
                isDarkMode ? "border-gray-600 bg-indigo-800" : "border-gray-300 bg-white"
              }`}
            >
              {/* Student Info */}
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={user?.photoURL || "https://i.ibb.co/5W0jFwk/default.png"}
                  alt={user?.name || item.userEmail}
                  className="w-16 h-16 rounded-full border object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">{user?.name || item.userEmail}</h3>
                  <p className="text-sm opacity-70">{item.userEmail}</p>
                </div>
              </div>

              {/* Submission Details */}
              <div className="border-t pt-3 text-sm opacity-80">
                <p>
                  <span className="font-semibold">Course:</span> {item.courseTitle || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Module:</span> {item.moduleTitle || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Submitted At:</span>{" "}
                  {new Date(item.submittedAt).toLocaleString()}
                </p>
                {item.answer && (
                  <p className="mt-2">
                    <a
                      href={item.answer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      View Submission
                    </a>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAssignment;
