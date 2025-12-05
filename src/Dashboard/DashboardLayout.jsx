import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { ThemeContext } from "../context/ThemeContext";
import useAuth from "../hooks/useAuth";
import { MdBook } from "react-icons/md";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false); // mobile menu state
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const menus = [
    { name: "Dashboard Home", path: "/dashboard" },
    {
      name: "Add Course",
      path: "/dashboard/add-course",
      icon: <MdBook className="inline-block" />,
    },
    { name: "My Courses", path: "/dashboard/my-courses" },
    { name: "Quiz", path: "/dashboard/quiz" },
    { name: "My Assignment", path: "/dashboard/assignment" },
  ];

  const activeBg = isDarkMode ? "bg-indigo-800 text-white" : "bg-purple-200 text-black";

  return (
    <div className="flex mt-16 max-w-6xl px-4 mx-auto min-h-screen">

      {/* ---------------------------------------------------------
          📌 MOBILE HAMBURGER BUTTON (Only Small Device)
      --------------------------------------------------------- */}
      <div className="sm:hidden fixed left-4 top-20 z-[999]">
        <HiMenuAlt3
          size={30}
          onClick={() => setOpen(true)}
          className={`${isDarkMode ? "text-white" : "text-black"} cursor-pointer`}
        />
      </div>

      {/* ---------------------------------------------------------
          📌 MOBILE SLIDE MENU (Hidden on md+)
      --------------------------------------------------------- */}
      <div
        className={`fixed sm:hidden top-0 left-0 h-full z-[999] transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} w-64 shadow-2xl p-5`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">Dashboard</h2>
          <HiMenuAlt3
            size={26}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>

        {user && (
          <div className="text-center mb-8">
            <img
              src={user.photoURL}
              className="w-16 h-16 rounded-full mx-auto border"
            />
            <p className="mt-2 font-semibold">{user.displayName}</p>
          </div>
        )}

        <ul className="space-y-3">
          {menus.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)} // close on click
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-all ${
                    isActive ? activeBg : ""
                  } ${isDarkMode ? "hover:bg-indigo-800" : "hover:bg-purple-200"}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------------------------------------------------
          📌 SIDEBAR (Visible only on md+ device)
      --------------------------------------------------------- */}
      <div
        className={`hidden lg:block w-64 ${
          isDarkMode ? "text-white" : "text-black"
        } shadow-2xl p-5`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">Dashboard</h2>
        </div>

        {user && (
          <div className="text-center mb-8">
            <img
              src={user.photoURL}
              className="w-16 h-16 rounded-full mx-auto border"
            />
            <p className="mt-2 font-semibold">{user.displayName}</p>
          </div>
        )}

        <ul className="space-y-3">
          {menus.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-all ${
                    isActive ? activeBg : ""
                  } ${isDarkMode ? "hover:bg-indigo-800" : "hover:bg-purple-200"}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------------------------------------------------
          📌 MAIN CONTENT
      --------------------------------------------------------- */}
      <div className="flex-1  mt-8 lg:mt-0 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
