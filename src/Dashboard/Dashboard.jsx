import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaHome,
  FaHeart,
  FaCalendarAlt,
  FaCommentDots,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaPaw,
  FaHandsHelping,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = {
    name: "Saria Khatun",
    email: "sariajui1@gmail.com",
    photo:
      "https://i.ibb.co.com/sd6KVXdz/lawyer4.jpg",
    totalApplications: 5,
    pending: 5,
    approved: 0,
    favorites: 0,
  };

  const menuItems = [
    { icon: FaHome, label: "Profile", active: true },
    { icon: FaPaw, label: "Applications", count: 5 },
    { icon: FaHeart, label: "Favorites" },
    { icon: FaCalendarAlt, label: "My Bookings" },
    { icon: FaCommentDots, label: "My Feedback" },
    { icon: FaStar, label: "Reviews" },
    { icon: FaHandsHelping, label: "Sponsorships" },
    { icon: FaCog, label: "Settings" },
    { icon: FaSignOutAlt, label: "Logout", danger: true },
  ];

  return (
    <>
      {/* Full Dashboard Layout */}
      <div className="min-h-screen   to-purple-50 mt-20">

        {/* Mobile Hamburger */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 bg-white rounded-full shadow-lg"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Sidebar - Desktop (click on profile pic) + Mobile */}
        {(sidebarOpen || mobileMenuOpen) && (
          <motion.div
            initial={sidebarOpen ? { x: -300 } : { x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed lg:relative top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 flex flex-col ${
              mobileMenuOpen ? "w-72" : ""
            }`}
          >
            {/* Sidebar Header */}
            <div className="p-8 bg-gradient-to-b from-purple-100 to-pink-100 text-center">
              <img
                src={user.photo}
                alt="User"
                className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                Welcome back, {user.name.split(" ")[0]}!
              </h2>
              <p className="text-sm text-gray-600 mt-1">{user.email}</p>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-6 py-8">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center gap-4 px-5 py-4 rounded-lg mb-2 transition-all ${
                    item.active
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "hover:bg-purple-100 text-gray-700"
                  } ${item.danger ? "text-red-600 hover:bg-red-50 mt-8" : ""}`}
                >
                  <item.icon size={22} />
                  <span className="font-medium">{item.label}</span>
                  {item.count && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}

        {/* Overlay for mobile */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="lg:ml-80 p-6 lg:p-12">
          <div className="max-w-6xl mx-auto">

            {/* Profile Pic Trigger (Desktop Only) */}
            <div className="hidden lg:block absolute top-8 left-8 z-10">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="group relative"
              >
                <img
                  src={user.photo}
                  alt="User"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-xl object-cover ring-4 ring-purple-200 group-hover:ring-purple-400 transition-all cursor-pointer"
                />
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <FaBars className="text-white opacity-0 group-hover:opacity-100" size={20} />
                </div>
              </button>
            </div>

            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center lg:text-left lg:ml-24"
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Here's a quick look at your adoption activity.
              </p>
              <p className="text-sm text-purple-600 mt-3">
                Email: {user.email}
              </p>
            </motion.div>

           

            {/* Calendar + Upcoming Events */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Your Calendar</h3>
                <Calendar className="rounded-xl shadow-inner" />
              </motion.div>

              
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;