import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { ThemeContext } from "../context/ThemeContext";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdAssignment, MdAssignmentTurnedIn, MdBook, MdDashboard, MdLibraryAdd, MdMenuBook, MdPeopleAlt, MdQuiz, MdSchool } from "react-icons/md";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [dbUser, setDbUser] = useState(null);

  // Fetch user role from database
  useEffect(() => {
    const loadUserRole = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosSecure.get("/api/users");
        const matched = res.data.data.find((u) => u.email === user.email);
        setDbUser(matched);
      } catch (error) {
        console.log("Error loading DB user role:", error);
      }
    };
    loadUserRole();
  }, [user, axiosSecure]);

  const role = dbUser?.role || "student";
  const isAdmin = role === "admin";

  console.log("Dashboard role:", role);


// Dynamic menus
// Dynamic menus
const menus = [
  // Common Dashboard Home
  {
    name: "Dashboard Home",
    path: "/dashboard",
    icon: <MdDashboard className="inline-block" />,
  },

  // Admin-only menus
  ...(isAdmin
    ? [
        {
          name: "Add Course",
          path: "/dashboard/add-course",
          icon: <MdLibraryAdd className="inline-block" />,
        },
        {
          name: "Enrollment",
          path: "/dashboard/enrollment",
          icon: <MdPeopleAlt className="inline-block" />,
        },
        {
          name: "All Assignment",
          path: "/dashboard/all-assignment",
          icon: <MdAssignment className="inline-block" />,
        },
        {
          name: "All Courses",
          path: "/dashboard/all-courses",
          icon: <MdMenuBook className="inline-block" />,
        },
      ]
    : [
        // Student-only menus
        {
          name: "My Courses",
          path: "/dashboard/my-courses",
          icon: <MdSchool className="inline-block" />,
        },
        {
          name: "Quiz",
          path: "/dashboard/quiz",
          icon: <MdQuiz className="inline-block" />,
        },
        {
          name: "My Assignment",
          path: "/dashboard/assignment",
          icon: <MdAssignmentTurnedIn className="inline-block" />,
        },
      ]),
];



  const activeBg = isDarkMode
    ? "bg-indigo-800 text-white"
    : "bg-purple-200 text-black";

  return (
    <div className="flex mt-16 max-w-6xl px-4 mx-auto min-h-screen">

      {/* MOBILE HAMBURGER */}
      <div className="sm:hidden fixed left-4 top-20 z-[999]">
        <HiMenuAlt3
          size={30}
          onClick={() => setOpen(true)}
          className={`${isDarkMode ? "text-white" : "text-black"} cursor-pointer`}
        />
      </div>

      {/* MOBILE SIDE MENU */}
      <div
        className={`fixed sm:hidden top-0 left-0 h-full z-[999] transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} w-64 shadow-2xl p-5`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">
            {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
          </h2>
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
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-all ${
                    isActive ? activeBg : ""
                  } ${isDarkMode ? "hover:bg-indigo-800" : "hover:bg-purple-200"}`
                }
              >
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div
        className={`hidden lg:block w-64 ${
          isDarkMode ? "text-white" : "text-black"
        } shadow-2xl p-5`}
      >
        <h2 className="font-bold text-xl mb-6">
          {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
        </h2>

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
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 mt-8 lg:mt-0 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
