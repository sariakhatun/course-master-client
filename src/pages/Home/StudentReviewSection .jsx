import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
import SectionTitle from "../../shared/SectionTitle";

const studentReviews = [
  {
    name: "Shahriar Hasan",
    avatar: "https://i.ibb.co/CpycpSQw/man.webp",
    rating: 5,
    review:
      "This course was amazing! The explanations were clear and the projects were very helpful.",
    date: "27 July 2025",
    courseName: "Complete MERN Stack",
    location: "Dhaka, Bangladesh",
  },
  {
    name: "Mahiya Islam",
    avatar: "https://i.ibb.co/xPCpnb9/man.jpg",
    rating: 4,
    review:
      "Good course overall. Learned a lot and the instructor was very responsive.",
    date: "22 July 2025",
    courseName: "Python for Beginners",
    location: "Chattogram, Bangladesh",
  },
  {
    name: "Ridwan Ahmed",
    avatar: "https://i.ibb.co/KjphP5fN/gardener10.jpg",
    rating: 5,
    review:
      "Loved the practical assignments. Helped me build real-world projects.",
    date: "19 July 2025",
    courseName: "React Advanced",
    location: "Dhaka, Bangladesh",
  },
  {
    name: "Sanjida Rahman",
    avatar: "https://i.ibb.co/Ldh3q5wK/gardener7.webp",
    rating: 4,
    review:
      "Very well-structured course. Learned a lot about front-end development.",
    date: "15 July 2025",
    courseName: "Web Development Bootcamp",
    location: "Sylhet, Bangladesh",
  },
];

const StudentReviewSection = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const cardBg = isDarkMode
    ? "bg-indigo-900 text-gray-200 shadow-lg"
    : "bg-purple-100 text-black shadow-md";

  const starFilled = isDarkMode ? "fill-yellow-300" : "fill-yellow-400";
  const starEmpty = isDarkMode ? "fill-gray-600" : "fill-gray-300";

  const textPrimary = isDarkMode ? "text-white" : "text-black";
  const textSecondary = isDarkMode ? "text-gray-400" : "text-gray-500";
  const textReview = isDarkMode ? "text-gray-200" : "text-gray-700";
  const textDate = isDarkMode ? "text-gray-400" : "text-gray-400";

  return (
    <section className="my-24 max-w-6xl mx-auto px-4">
      <div className="mb-6 text-center">
         {/* Section Title */}
      <div className="text-center -mb-12">
        <SectionTitle title={"What Students say"} />
        
      </div>

        <p className={`max-w-xl mt-2 mx-auto ${textSecondary}`}>
          Real feedback from students who have taken our courses and loved the learning experience.
        </p>

        
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation={{
          prevEl: ".review-button-prev",
          nextEl: ".review-button-next",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="relative pb-12"
      >
        {studentReviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${cardBg} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full border-2 border-primary p-[2px] bg-gradient-to-br from-primary to-secondary">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base">{review.name}</h4>
                  <p className={`text-xs ${textSecondary}`}>{review.location}</p>
                  <span className={`text-xs bg-primary/20 ${textPrimary} px-2 py-0.5 rounded-full mt-1 inline-block`}>
                    {review.courseName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? starFilled : starEmpty
                    }`}
                  />
                ))}
                <span className={`text-xs ml-1 ${textSecondary}`}>
                  ({review.rating}.0)
                </span>
              </div>

              <p className={`text-sm mb-4 flex-grow ${textReview}`}>{review.review}</p>
              <p className={`text-xs ${textDate}`}>{review.date}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="review-button-prev btn btn-circle btn-primary btn-sm"
        >
          ←
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.9 }}
          className="review-button-next btn btn-circle btn-primary btn-sm"
        >
          →
        </motion.button>
      </div>
    </section>
  );
};

export default StudentReviewSection;
