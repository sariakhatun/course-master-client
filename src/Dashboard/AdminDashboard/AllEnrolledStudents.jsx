import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { ThemeContext } from "../../context/ThemeContext";

const AllEnrolledStudents = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);

  const [enrollments, setEnrollments] = useState([]);
  const [users, setUsers] = useState([]);

  // Filter states
  const [filterTitle, setFilterTitle] = useState("");
  const [filterBatch, setFilterBatch] = useState("");

  useEffect(() => {
    // Load enrollments
    axiosSecure
      .get("/api/enroll")
      .then((res) => setEnrollments(res.data.data))
      .catch((err) => console.log(err));

    // Load all users
    axiosSecure
      .get("/api/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  // Find user by email
  const findUser = (email) => users.find((u) => u.email === email);

  // Filtered enrollments
  const filteredEnrollments = enrollments.filter((item) => {
    const title = item.courseTitle || "";
    const batch = item.batchName || "";

    const matchesTitle = filterTitle
      ? title.toLowerCase().includes(filterTitle.toLowerCase())
      : true;
    const matchesBatch = filterBatch
      ? batch.toLowerCase() === filterBatch.toLowerCase()
      : true;

    return matchesTitle && matchesBatch;
  });

  // Unique batch names for filter dropdown
  const batchNames = [...new Set(enrollments.map((e) => e.batchName))];

  return (
    <div className={`p-6 ${isDarkMode ? " text-gray-200" : " text-gray-900"} min-h-screen`}>
      <div className="text-center -mt-12 -mb-12">
        <SectionTitle title={"All Enrolled Students"} />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by course title..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          className={`border p-2 rounded flex-1 ${
            isDarkMode ? "bg-indigo-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
          }`}
        />

        <select
          value={filterBatch}
          onChange={(e) => setFilterBatch(e.target.value)}
          className={`border p-2 rounded ${
            isDarkMode ? "bg-indigo-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          <option value="">All Batches</option>
          {batchNames.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEnrollments.map((item) => {
          const user = findUser(item.userEmail || item.studentEmail);

          return (
            <div
              key={item._id}
              className={`border rounded-xl p-4 shadow-md transition-transform duration-300 hover:scale-105 ${
                isDarkMode ? "border-gray-600 bg-indigo-800" : "border-purple-100 bg-purple-100 text-black"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={user?.photoURL || item.studentPhoto || "https://i.ibb.co.com/5W0jFwk/default.png"}
                  alt="student"
                  className="w-16 h-16 rounded-full border object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">{user?.name || item.studentName || "Unknown Student"}</h3>
                  <p className="text-sm opacity-70">{user?.email || item.userEmail}</p>
                </div>
              </div>

              <div className="mt-4 border-t pt-3 text-sm opacity-80">
                <p>
                  <span className="font-semibold">Course:</span> {item.courseTitle || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Batch:</span> {item.batchName || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Enrolled At:</span>{" "}
                  {new Date(item.enrolledAt).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllEnrolledStudents;
