// src/pages/home/TopInstructors.jsx
import React, { useContext } from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../../shared/SectionTitle";

const instructorsData = [
  {
    id: 1,
    name: "John Doe",
    designation: "Full-Stack Developer",
    experience: "8 Years",
    expertise: ["MERN Stack", "React", "Node.js"],
    bio: "Passionate about teaching modern web development with real-world projects.",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "React Expert",
    experience: "5 Years",
    expertise: ["React", "Next.js", "UI/UX Design"],
    bio: "Focused on building responsive and user-friendly frontends for modern apps.",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    linkedin: "https://linkedin.com/in/janesmith",
    twitter: "https://twitter.com/janesmith",
    github: "https://github.com/janesmith",
  },
  {
    id: 3,
    name: "Mike Ross",
    designation: "Node.js Specialist",
    experience: "7 Years",
    expertise: ["Node.js", "Express", "API Development"],
    bio: "Loves backend architecture and teaching scalable server-side solutions.",
    profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
    linkedin: "https://linkedin.com/in/mikeross",
    twitter: "https://twitter.com/mikeross",
    github: "https://github.com/mikeross",
  },
];

const TopInstructors = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <SectionTitle title="Top Instructors" />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
        {instructorsData.map((inst, index) => (
          <motion.div
            key={inst.id}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`p-6 rounded-xl shadow-lg flex flex-col items-center text-center space-y-4 transition-all duration-300 ${
              isDarkMode
                ? "bg-indigo-900 text-white shadow-white/20 hover:shadow-white/40"
                : "bg-purple-100 text-gray-900 shadow-purple-300 hover:shadow-purple-500"
            }`}
          >
            {/* Profile Image */}
            <motion.img
              src={inst.profileImage}
              alt={inst.name}
              className="w-28 h-28 rounded-full border-2 border-purple-500 object-cover mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
            />

            <h3 className="text-xl font-semibold">{inst.name}</h3>
            <p className="text-sm font-medium">
              {inst.designation} | {inst.experience} Exp
            </p>
            <p className="text-sm">{inst.bio}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Expertise: {inst.expertise.join(", ")}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-2 text-gray-600 dark:text-gray-300">
              <a href={inst.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-xl hover:text-blue-600 transition" />
              </a>
              <a href={inst.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-xl hover:text-blue-400 transition" />
              </a>
              <a href={inst.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-xl hover:text-gray-800 dark:hover:text-white transition" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopInstructors;
