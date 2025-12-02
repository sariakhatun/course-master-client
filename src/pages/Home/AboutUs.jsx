import { FaBullseye, FaLightbulb } from "react-icons/fa";
import about from "../../assets/about.jpeg";
import SectionTitle from "../../shared/SectionTitle";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const aboutData = [
  {
    icon: <FaBullseye className="text-3xl  mb-4" />,
    title: "Our Mission",
    description:
      "To create inclusive, modern facilities that promote physical activity, team spirit, and a strong community bond.",
  },
  {
    icon: <FaLightbulb className="text-3xl  mb-4" />,
    title: "Our Vision",
    description:
      "To inspire generations through sports, encouraging a healthy and connected lifestyle for all.",
  },
];

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section className="px-4 max-w-6xl mx-auto my-20">
      {/* Section Title */}
      <div className="text-center mb-12">
        <SectionTitle title={"About Us"} />
      </div>

      <div className="md:flex justify-between items-center gap-8 xl:gap-10">
        {/* Image */}
        <motion.img
          data-aos="fade-right"
          data-aos-delay="100"
          src={about}
          alt="About Image"
          className="hidden lg:block max-w-[450px] min-h-[450px] max-h-[400px] object-x-contain object-y-cover object-center rounded-xl border-3 border-primary/60"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Text Content */}
        <div className="flex flex-col gap-8">
          <motion.p
            data-aos="fade-left"
            data-aos-delay="100"
            className={`text-3xl sm:text-4xl lg:text-5xl baby font-medium max-w-xl mx-auto tracking-wide ${
              isDarkMode
                ? "text-neutral-200 text-shadow-[2px_2px_10px_rgb(255_255_255/0.10)]"
                : "text-neutral text-shadow-[2px_2px_10px_rgb(0_0_0/0.10)]"
            }`}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Discover our story, our purpose, and where we’re headed.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-5">
            {aboutData.map((item, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                className={`p-6 rounded-xl transition-all shadow-md duration-300 ${
                  isDarkMode
                    ? "bg-indigo-900 shadow-white/20"
                    : "bg-purple-100 shadow-primary/70"
                }`}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  className={`inline-block ${isDarkMode ? "text-white":"text-indigo-800"}`}
                >
                  {item.icon}
                </motion.span>

                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? "text-neutral-200" : "text-neutral-900"
                  }`}
                >
                  {item.title}
                </h3>
                <p className={isDarkMode ? "text-neutral-300" : "text-neutral-700"}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
