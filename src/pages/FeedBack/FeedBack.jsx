import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import SectionTitle from "../../shared/SectionTitle";
import { ThemeContext } from "../../context/ThemeContext";

const FeedBack = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send formData to backend if needed
    console.log("Feedback submitted:", formData);

    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your feedback has been submitted.",
      timer: 2000,
      showConfirmButton: false,
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-24 px-4 transition-colors duration-300 ${
        isDarkMode ? "text-gray-200" : "text-gray-900"
      }`}
    >
      <div className="text-center mb-12">
        <SectionTitle title={"Feedback"} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-2xl shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-indigo-900" : "bg-white"
        }`}
      >
        <div className="mb-4">
          <label
            className={`block font-semibold mb-1 transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label
            className={`block font-semibold mb-1 transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label
            className={`block font-semibold mb-1 transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Write your feedback..."
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-white ${isDarkMode?"bg-indigo-800 hover:bg-indigo-900":"bg-purple-600 hover:bg-purple-700 "}  transition-colors duration-300 shadow-lg`}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedBack;
