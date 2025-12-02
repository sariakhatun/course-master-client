import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineLogin } from "react-icons/ai";
import { MdArticle, MdOutlineFeedback, MdMenuBook } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import NavLogo from "./NavLogo";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/Background/Theme/ThemeToggle";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  const links = [
    { name: "Home", to: "/", icon: <AiFillHome className="inline-block" /> },
    { name: "Courses", to: "/courses", icon: <MdMenuBook className="inline-block" /> },
    { name: "Blog", to: "/blogs", icon: <MdArticle className="inline-block" /> },
    { name: "Feedback", to: "/feedback", icon: <MdOutlineFeedback className="inline-block" /> },
    { name: "Login", to: "/login", icon: <AiOutlineLogin className="inline-block" /> },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force background on all pages except Home
const forceBg = location.pathname !== "/" && location.pathname !== "/courses";

  const scrolledBg = isDarkMode ? "bg-blue-300 " : "bg-purple-300 ";

  const loginBtnTheme = isDarkMode
    ? "btn btn-outline bg-transparent text-white border-blue-500 hover:bg-blue-500 hover:text-white"
    : "btn btn-outline bg-transparent text-purple-700 border-purple-500 hover:bg-purple-600 hover:text-white";

  return (
    <div
      className={`fixed w-full top-0 z-[999] transition-all duration-300 ${
        isScrolled || forceBg ? scrolledBg : "bg-transparent lg:pt-2"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-0 flex items-center justify-between h-16">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-1"
        >
          <NavLogo />
        </motion.div>

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="hidden lg:flex items-center gap-2">
            <ul className="menu menu-horizontal font-semibold px-2 space-x-2">
              {links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => {
                      const activeBg = isDarkMode
                        ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white "
                        : "bg-gradient-to-r from-purple-600 to-purple-400 text-white ";

                      const defaultLink = isDarkMode
                        ? "text-white hover:bg-blue-900/40"
                        : "text-white hover:bg-purple-200/50";

                      return `px-3 py-2.5
                       rounded text-white transition-all duration-300  ${
                        link.name === "Login"
                          ? loginBtnTheme
                          : isActive
                          ? activeBg
                          : defaultLink
                      }`;
                    }}
                  >
                    {link.icon} {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn text-white bg-transparent border-0 btn-sm shadow-none"
              >
                <HiOutlineMenuAlt3 size={20} />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-40 p-2 pr-6 shadow right-0 space-y-3"
              >
                {links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => {
                        return `px-3 py-1 rounded transition-all duration-300 ${
                          isDarkMode
                            ? "hover:bg-blue-900/40 text-gray-200"
                            : "hover:bg-purple-200/50 text-gray-800"
                        }`;
                      }}
                    >
                      {link.icon} {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
