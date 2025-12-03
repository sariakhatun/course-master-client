import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Link } from "react-router";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

import book from "../../assets/1.jpeg";
import tech from "../../assets/2.jpeg";
import certificate from "../../assets/4.jpeg";
import device from "../../assets/5.jpeg";
import { ThemeContext } from "../../context/ThemeContext";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);
  const slides = [
    {
      url: book,
      title: "Read, Learn, Achieve",
      subtitle:
        "Discover a world of knowledge with interactive courses and resources.",
      buttonText: "Start Learning",
      buttonLink: "/courses",
    },
    {
      url: tech,
      title: "Tech Skills for Tomorrow",
      subtitle:
        "Stay ahead with the latest technology courses and hands-on projects.",
      buttonText: "Explore Skills",
      buttonLink: "/courses",
    },
    {
      url: certificate,
      title: "Certify Your Knowledge",
      subtitle:
        "Earn certificates and showcase your achievements to the world.",
      buttonText: "Get Certified",
      buttonLink: "/login",
    },
    {
      url: device,
      title: "Learn Anytime, Anywhere",
      subtitle: "Access courses on any device and study at your own pace.",
      buttonText: "Join Now",
      buttonLink: "/logina",
    },
  ];

  const buttonBg = isDarkMode ? "bg-purple-400/85" : "bg-blue-300/85";

  return (
    <div className="relative">
      <Swiper
        onSwiper={setSwiperInstance}
        spaceBetween={30}
        effect={"fade"}
        navigation
        modules={[EffectFade, Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="banner-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="text-white w-full h-[80vh] md:h-[90vh] overflow-hidden flex flex-col justify-center items-center text-center px-4 sm:px-8"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${slide.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 xl:space-y-5 text-sm sm:text-base">
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.h3 className="font-bold-title text-[34px] sm:text-4xl md:text-5xl xl:text-6xl">
                      {slide.title}
                    </motion.h3>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.p
                      key={`subtitle-${index}`}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                      className="text-md md:text-lg max-w-lg mx-auto"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                </AnimatePresence>

                {slide.buttonText && slide.buttonLink && (
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div
                        key={`button-${index}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.6,
                          stiffness: 200,
                        }}
                      >
                        <Link
                          to={slide.buttonLink}
                          className="inline-block group"
                        >
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className={`btn border-0 rounded-full text-white hover:shadow-2xl transition-all duration-300
      ${
        isDarkMode
          ? "bg-gradient-to-r from-sky-700 to-primary"
          : "bg-gradient-to-r from-purple-600 to-purple-400"
      }
    `}
                          >
                            <span className="flex items-center gap-2">
                              {slide.buttonText}
                              <motion.span
                                animate={{ x: [0, 3, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatType: "loop",
                                }}
                              >
                                <MdOutlineArrowOutward size={20} />
                              </motion.span>
                            </span>
                          </motion.button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => swiperInstance?.slideTo(index)}
            initial={{ scale: 0.8 }}
            animate={{
              scale: activeIndex === index ? 1.1 : 0.8,
              width: activeIndex === index ? "2rem" : "0.5rem",
            }}
            transition={{ duration: 0.3 }}
            className={`cursor-pointer h-2 rounded-full ${
              activeIndex === index ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
