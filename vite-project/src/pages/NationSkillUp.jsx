import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../context/ThemeContext";
import OtherPage1 from "../components/OtherPage1";

import Pic1 from "/src/assets/Nation-images/Pic1.jpeg";
import Pic2 from "/src/assets/Nation-images/Pic2.jpeg";
import Pic3 from "/src/assets/Nation-images/Pic3.jpeg";
import Pic4 from "/src/assets/Nation-images/Pic4.jpeg";
import Pic5 from "/src/assets/Nation-images/Pic5.jpeg";
import Pic6 from "/src/assets/Nation-images/Pic6.jpeg";
import Pic7 from "/src/assets/Nation-images/Pic7.jpeg";

export default function NationSkillUpPage() {
  // Carousel Images
  const images = [Pic1,Pic2,Pic3,Pic4,Pic5,Pic6,Pic7];
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";
  const [current, setCurrent] = useState(0);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <OtherPage1 />
      <div className="otherpage1-content w-full min-h-screen text-gray-800 font-sans overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 ">
          <div className="absolute inset-0"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative z-10 w-full"
          >
            <h1 className="z-10 mt-20 text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide mb-6 sm:mb-12 text-center leading-snug">
              <span
                className={`${
                  isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
                }`}
              >
                &lt;
              </span>
              <span
                className={`${
                  isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
                } mx-2 `}
              >
                Nation Skill Up!
              </span>
              <span
                className={`${
                  isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
                }`}
              >
                &gt;
              </span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className={`${
              isLightTheme ? "text-gray-700" : "text-white"
            } relative z-10 text-base sm:text-lg md:text-xl max-w-4xl px-2 flex flex-col items-center`}
          >
            <div className="scale-120 mb-10">
              <p className="text-lg sm:text-3xl font-semibold ">A Mission To <span className="text-emerald-600">Level Up</span> The <span className="text-emerald-600">Nation!</span></p>
              <p className=" mt-3">Grab FREE courses across top domains and boost your skills.</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#059669", boxShadow: "0px 4px 20px rgba(16, 185, 129, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="scale-120 mt-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg shadow-md w-45"
            >
            <a target="_blank" href="https://gfgcdn.com/tu/Vr2/">Register Now!</a>
          </motion.button>

          </motion.div>
          
        </section>

        {/* About Section */}
        <section className="py-16 px-6 md:px-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className={`${
              isLightTheme ? "text-gray-700" : "text-white"
            }`}
            >
              <h2
                className={`${
                  isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
                }  text-3xl sm:text-4xl font-bold mb-4 sm:mt-[-8rem] sm:mt-0 text-center sm:text-left`}
              >
                About the Event
              </h2>
              <p className=" text-center sm:text-xl sm:text-left leading-relaxed ">
                Nation SkillUp by GeeksforGeeks delivers <span className="text-emerald-600">100% free,</span> expert-led courses spanning DSA, Web Dev, 
                Data Science & more. <span className="text-emerald-600">Structured</span> learning paths, live doubt-solving, certificates, 
                and learner-first incentives make growth accessible to all.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex justify-center md:justify-end"
            >
              <img
                src="https://media.geeksforgeeks.org/auth-dashboard-uploads/Frame-7686.svg"
                alt="Event Banner"
                className="rounded-2xl shadow-lg w-3/4 sm:w-2/3 md:w-full h-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Gallery Carousel */}
        <section className="py-16 relative px-4">
  <h2
    className={`${
      isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
    } text-3xl sm:text-4xl font-bold text-center mb-10`}
  >
    Event Highlights
  </h2>

  <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-xl">
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center gap-4"
      >
        {/* ✅ Responsive: 1 image on mobile, 3 on larger screens */}
        {images
          .slice(
            current,
            current + (window.innerWidth < 640 ? 1 : 3) // <640px → 1 image
          )
          .map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${current + idx}`}
              className="w-full sm:w-1/3 h-[400px] sm:h-[500px] object-cover rounded-lg"
            />
          ))}
      </motion.div>
    </AnimatePresence>

    {/* Circles */}
    <div className="absolute bottom-4 w-full flex justify-center space-x-3">
      {images.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrent(idx)}
          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
            current === idx ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  </div>
</section>



        {/* Testimonials */}
        <section className="py-16 px-6 md:px-20">
          <h2 
          className={`${
              isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
            } text-3xl sm:text-4xl font-bold text-center mb-10`}
          >
            What Participants Said
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote:
                  "GeeksforGeeks has truly transformed my learning journey! As someone passionate about improving in coding and computer science, GeeksforGeeks has been an incredible resource. Huge thanks to the GFG team for making quality tech education so accessible!",
                name: "Aurobinda Chainy",
              },
              {
                quote:
                  "GeeksforGeeks has been an incredible part of my learning journey. Their well-structured tutorials, coding challenges, and detailed explanations made complex topics easy to understand. Thanks to their resources, I strengthened my programming skills, prepared effectively for interviews, and eventually landed a great job in tech.",
                name: "Sakshi Shandilya",
              },
              {
                quote:
                  "I’ve been using GeeksforGeeks for a while now, and it’s honestly one of the best resources out there for learning coding and computer science topics. The articles are easy to follow, and the coding problems really help reinforce the concepts. It’s helped me a lot in preparing for interviews too.",
                name: "Priyanshu Rawat",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gray-50 rounded-2xl shadow-md"
              >
                <p className="text-gray-700 mb-4 italic text-sm sm:text-base">
                  “{t.quote}”
                </p>
                <p className="font-semibold text-green-600 text-sm sm:text-base">
                  — {t.name}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
