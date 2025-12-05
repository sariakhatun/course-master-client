import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ThemeContext } from "../context/ThemeContext";
import SectionTitle from "../shared/SectionTitle";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);

  const [enrollments, setEnrollments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollRes, assignRes] = await Promise.all([
          axiosSecure.get("/api/enroll"),
          axiosSecure.get("/api/assignments"),
        ]);

        setEnrollments(enrollRes.data.data);
        setAssignments(assignRes.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const chartData = enrollments.reduce((acc, item) => {
    const date = new Date(item.enrolledAt).toLocaleDateString();
    const existing = acc.find((d) => d.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);

  if (loading)
    return (
      <div
        className={`text-center py-20 transition-colors duration-300 ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Loading data...
      </div>
    );

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        isDarkMode ? " text-gray-200" : " text-gray-900"
      }`}
    >
      <div className="text-center -mt-12 -mb-12">
        <SectionTitle title={"Admin Dashboard"}></SectionTitle>
      </div>

      {/* Enrollments Chart */}
      <div
        className={`shadow rounded-lg p-6 transition-colors duration-300 ${
          isDarkMode ? "bg-indigo-900" : "bg-purple-100"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Enrollments Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? "#4b5563" : "#e5e7eb"}
            />
            <XAxis dataKey="date" stroke={isDarkMode ? "#d1d5db" : "#4b5563"} />
            <YAxis stroke={isDarkMode ? "#d1d5db" : "#4b5563"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                color: isDarkMode ? "#f9fafb" : "#111827",
              }}
            />
            <Legend
              wrapperStyle={{
                color: isDarkMode ? "#f9fafb" : "#111827",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div
          className={`shadow rounded-lg p-6 transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-900" : "bg-purple-100"
          }`}
        >
          <h3
            className={`text-lg font-semibold transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Total Students
          </h3>
          <p className="text-2xl font-bold mt-2 text-indigo-500">
            {enrollments.length}
          </p>
        </div>

        <div
          className={`shadow rounded-lg p-6 transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-900" : "bg-purple-100"
          }`}
        >
          <h3
            className={`text-lg font-semibold transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Total Enrolled Courses
          </h3>
          <p className="text-2xl font-bold mt-2 text-indigo-500">
            {new Set(enrollments.map((e) => e.courseId)).size}
          </p>
        </div>

        <div
          className={`shadow rounded-lg p-6 transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-900" : "bg-purple-100"
          }`}
        >
          <h3
            className={`text-lg font-semibold transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            New Enrollments
          </h3>
          <p className="text-2xl font-bold mt-2 text-indigo-500">
            {
              enrollments.filter(
                (e) =>
                  new Date(e.enrolledAt).toDateString() ===
                  new Date().toDateString()
              ).length
            }
          </p>
        </div>

        <div
          className={`shadow rounded-lg p-6 transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-900" : "bg-purple-100"
          }`}
        >
          <h3
            className={`text-lg font-semibold transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Total Assignments Submitted
          </h3>
          <p className="text-2xl font-bold mt-2 text-indigo-500">
            {assignments.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
