import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../context/ThemeContext";
import OtherPage1 from "../components/OtherPage1";
import Logo from "../assets/NewLogoDark.png";

import CR_Post from "../assets/CodeRush-Poster.png";
export default function GFGCodeRushPage() {
    // Carousel Images
    const images = [CR_Post];
    const { themeMode } = useTheme();
    const isLightTheme = themeMode === "light";
    const [current, setCurrent] = useState(0);

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
                        <h1 className="z-10 mt-20 pt-8 text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide mb-6 sm:mb-12 text-center leading-snug">
                            <span
                                className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
                                    }`}
                            >
                                &lt;
                            </span>
                            <span
                                className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
                                    } mx-2 `}
                            >GFG CodeRush 2.0
                            </span>
                            <span
                                className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
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
                        className={`${isLightTheme ? "text-gray-700" : "text-white"
                            } relative z-10 text-lg md:text-xl max-w-4xl px-2 flex flex-col items-center`}
                    >
                        <div className="scale-120 mb-10">
                            <p className="text-md px-2 sm:text-3xl font-semibold ">"Code. Compete. Conquer <span className="text-emerald-600">— Unleash Your Inner Debugging Beast!"</span> <span className="text-emerald-600"></span></p>
                            <p className="text-sm px-2 mt-3">A high-voltage coding showdown designed to push your logic, speed, strategy, and DSA mastery to the next level.</p>
                            
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#059669", boxShadow: "0px 4px 20px rgba(16, 185, 129, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="scale-120 mt-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg shadow-md w-45"
                        >
                            <a target="_blank" href="https://docs.google.com/forms/d/1-b-S5N3k15PC_J2tyDHalgnNEW3K0Irq-zTT5eLszo4/edit">Register Now!</a>
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
      className={`${isLightTheme ? "text-gray-700" : "text-white"} flex flex-col justify-center`}
    >
      <h2
        className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"} text-3xl sm:text-4xl font-bold mb-4 text-center md:text-left`}
      >
        About the Event
      </h2>

      <p className="text-center md:text-left sm:text-xl leading-relaxed">
        GFG CodeRush 2.0 is a competitive coding event crafted to challenge participants with real-world
        programming problems and dynamic algorithmic tasks. The contest is designed to boost
        problem-solving abilities, sharpen coding speed, and enhance technical confidence through
        structured, time-bound challenges.
        This event aims to provide an engaging platform where learners can test their fundamentals,
        explore new concepts, and compete with fellow coding enthusiasts. Whether you're polishing
        your basics or pushing your limits with advanced techniques, CodeRush 2.0 offers the perfect
        arena to showcase your skills and grow as a programmer.
      </p>
    </motion.div>

   
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center md:justify-end"
    >
      <img
        src={Logo}
        alt="Event Banner"
        className="rounded-xl shadow-lg w-10/12 sm:w-3/4 md:w-full max-w-lg h-64 sm:h-80 md:h-96 object-contain"
      />
    </motion.div>
  </div>
</section>


{/* Gallery Carousel */}
<section className="py-6 relative px-4"> 
  <h2
    className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"} 
    text-xl sm:text-2xl font-bold text-center mb-4`}
  >
    Event Highlights
  </h2>

  <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-lg">
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.7 }}
        className="relative w-full bg-black/80 rounded-xl"
      >
        {/* FIXED 4:5 ASPECT RATIO CONTAINER */}
        <div className="relative w-full" style={{ paddingBottom: "125%" }}>
          <img
            src={images[current]}
            alt={`Slide ${current}`}
            className="absolute inset-0 w-full h-full object-contain object-center rounded-xl bg-black"
            loading="lazy"
          />
        </div>
      </motion.div>
    </AnimatePresence>

    {/* Circles */}
    <div className="absolute bottom-2 w-full flex justify-center space-x-1.5">
      {images.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrent(idx)}
          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
            current === idx ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  </div>
</section>
                      
            </div>
        </>
    );
}
