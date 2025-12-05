import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineLogin } from "react-icons/ai";
import {
  MdArticle,
  MdOutlineFeedback,
  MdMenuBook,
  MdBook,
} from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import NavLogo from "./NavLogo";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/Background/Theme/ThemeToggle";
import { ThemeContext } from "../../context/ThemeContext";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // ⭐ Desktop profile dropdown
  const [mobileOpen, setMobileOpen] = useState(false);


  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  let { logOut, user } = useAuth();
  

  let handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error));
  };

  const userImg = user?.photoURL
    ? user.photoURL
    : "https://i.ibb.co.com/sd6KVXdz/lawyer4.jpg";

  const links = [
    { name: "Home", to: "/", icon: <AiFillHome className="inline-block" /> },
    {
      name: "Course Listing",
      to: "/courses",
      icon: <MdMenuBook className="inline-block" />,
    },
    
    {
      name: "Blog",
      to: "/blogs",
      icon: <MdArticle className="inline-block" />,
    },
    {
      name: "Feedback",
      to: "/feedback",
      icon: <MdOutlineFeedback className="inline-block" />,
    },
    {
      name: "Login",
      to: "/login",
      icon: <AiOutlineLogin className="inline-block" />,
    },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    // Auto close mobile menu & profile dropdown when route changes
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Force background on all pages except Home & courses
  const forceBg = location.pathname !== "/" && location.pathname !== "/courses";

  const scrolledBg = isDarkMode ? "bg-blue-300 " : "bg-purple-300 ";

  const loginBtnTheme = isDarkMode
    ? "btn btn-outline bg-transparent text-white border-blue-500 hover:bg-blue-500 hover:text-white"
    : "btn btn-outline bg-transparent text-white border-purple-500 hover:bg-purple-600 hover:text-white";

  return (
    <div
      className={`fixed w-full top-0 z-[999] transition-all duration-300 ${
        isScrolled || forceBg ? scrolledBg : "bg-transparent lg:pt-2"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-0 flex items-center justify-between h-16">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-1"
        >
          <NavLogo />
        </motion.div>

        <div className="flex items-center gap-2 lg:gap-3">
          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="menu menu-horizontal font-semibold px-2 space-x-2">
              {links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  {link.name === "Login" && user ? (
                    <></> // Login button hidden when user logged in (we handle logout in profile dropdown)
                  ) : (
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => {
                        const activeBg = isDarkMode
                          ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white "
                          : "bg-gradient-to-r from-purple-600 to-purple-400 text-white ";

                        const defaultLink = isDarkMode
                          ? "text-white hover:bg-blue-900/40"
                          : "text-white hover:bg-purple-200/50";

                        return `px-3 py-2.5 rounded text-white transition-all duration-300 ${
                          isActive ? activeBg : defaultLink
                        }`;
                      }}
                    >
                      {link.icon} {link.name}
                    </NavLink>
                  )}
                </motion.li>
              ))}
            </ul>

            <ThemeToggle />

            {/* ⭐ Desktop Profile Dropdown */}
            {user && (
              <div className="relative">
                <img
                  src={userImg}
                  alt="User"
                  className="w-9 h-9 rounded-full cursor-pointer border"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {profileOpen && (
                  <div className="absolute right-0 mt-3 bg-white rounded shadow-lg w-40 z-50 p-2 space-y-1">
                    <NavLink
                      to="/dashboard"
                      className="block px-3 py-2 rounded hover:bg-purple-100"
                    >
                      Dashboard
                    </NavLink>

                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left px-3 py-2 text-red-500 rounded hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* MOBILE MENU */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />

            {/* Custom Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="btn text-white bg-transparent border-0 btn-sm shadow-none"
              >
                <HiOutlineMenuAlt3 size={20} />
              </button>

              {/* Menu Panel */}
              {mobileOpen && (
                <ul
                  className={`absolute right-0 mt-3 menu menu-sm bg-base-100 rounded-box z-50 w-44 p-4 pr-6 shadow space-y-3`}
                >
                  {/* MOBILE USER PROFILE */}
                  {user && (
                    <div className="flex flex-col items-center gap-2 pb-2 border-b">
                      <img
                        src={userImg}
                        alt="User"
                        className="w-14 h-14 rounded-full border object-cover"
                      />
                      <p className="text-sm font-semibold">
                        {user.displayName || "User"}
                      </p>
                    </div>
                  )}

                  {/* NORMAL LINKS */}
                  {links.map((link) =>
                    link.name === "Login" && user ? null : (
                      <li key={link.name}>
                        <NavLink
                          to={link.to}
                          onClick={() => setMobileOpen(false)} // ⭐ Auto close
                          className={({ isActive }) =>
                            `px-3 py-1 rounded transition-all duration-300 ${
                              isDarkMode
                                ? "hover:bg-blue-900/40 text-gray-800"
                                : "hover:bg-purple-200/50 text-gray-800"
                            }`
                          }
                        >
                          {link.icon} {link.name}
                        </NavLink>
                      </li>
                    )
                  )}

                  {/* ⭐ DASHBOARD in Mobile */}
                  {user && (
                    <li>
                      <NavLink
                        to="/dashboard"
                        onClick={() => setMobileOpen(false)} // ⭐ Auto close
                        className="px-3 py-1 rounded font-semibold hover:bg-purple-200/50"
                      >
                        📊 Dashboard
                      </NavLink>
                    </li>
                  )}

                  {/* ⭐ LOGOUT in Mobile */}
                  {user && (
                    <li>
                      <button
                        onClick={() => {
                          handleLogOut();
                          setMobileOpen(false); // ⭐ Auto close after logout
                        }}
                        className="px-3 py-1 rounded font-semibold text-red-500 hover:bg-red-100"
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
