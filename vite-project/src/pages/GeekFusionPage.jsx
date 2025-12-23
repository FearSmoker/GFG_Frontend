import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../context/ThemeContext";
import OtherPage1 from "../components/OtherPage1";

import gf1 from '../assets/GeekFusion2026/gf1.jpeg'
import gf2 from '../assets/GeekFusion2026/gf2.jpeg'
import gf3 from '../assets/GeekFusion2026/gf3.jpeg'
import gf4 from '../assets/GeekFusion2026/gf4.jpeg'
import gf5 from '../assets/GeekFusion2026/gf5.jpg'

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const hoverEffect = {
  scale: 1.03,
  y: -5,
  transition: { type: "spring", stiffness: 300 },
};

// Placeholder Images - REPLACE THESE WITH YOUR ACTUAL CLOUDINARY/ASSET LINKS
const eventImages = [gf1,gf2,gf3,gf4,gf5];

export default function GeekFusionPage() {
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";

  // --- CAROUSEL STATE ---
  const [current, setCurrent] = useState(0);

  // --- AUTO SLIDE LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === eventImages.length - 1 ? 0 : prev + 1));
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const primaryText = isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]";
  const accentText = isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]";
  const bodyText = isLightTheme ? "text-gray-700" : "text-white";

  const cardBg = isLightTheme
    ? "bg-gray-50 border-gray-200 shadow-md"
    : "bg-black/60 border-[#00FFAF]/30 backdrop-blur-sm";

  const cardBorder = isLightTheme ? "border-gray-300" : "border-[#00FFAF]/50";

  return (
    <>
      <OtherPage1 />

      <div className="otherpage1-content w-full min-h-screen font-sans overflow-hidden pb-12">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-24 pb-12 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4">
              <span className={accentText}>&lt;</span>
              <span className={`${primaryText} mx-2`}>GEEKFUSION 2025</span>
              <span className={accentText}>&gt;</span>
            </h1>
            <p className={`${bodyText} text-lg sm:text-xl font-medium mb-8`}>
              Crack the Code to Your Dream Career
            </p>

            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 20px rgba(0, 255, 175, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 text-lg font-bold rounded-full shadow-[0_0_20px_rgba(0,255,175,0.4)] text-white 
                ${
                  isLightTheme
                    ? "bg-[#0A7956] hover:bg-[#086345]"
                    : "bg-gradient-to-r from-[#00FFAF] to-[#008f62] text-black hover:bg-[#00d492]"
                }`}
            >
              (( REGISTER NOW ))
            </motion.button>
          </motion.div>
        </section>

        {/* ================= LAYER 1: ABOUT ================= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-6 md:px-16 py-8 max-w-7xl mx-auto"
        >
          <h3
            className={`${primaryText} text-xl font-bold mb-6 border-b inline-block border-opacity-50 border-current`}
          >
            About The Event
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className={`p-6 rounded-xl border ${cardBg} shadow-lg cursor-default`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🧠</span>
                <h4 className={`font-bold text-lg ${primaryText}`}>CONCEPT</h4>
              </div>
              <p className={bodyText}>
                Mock Placement Drive designed to simulate the actual recruitment
                process.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className={`p-6 rounded-xl border ${cardBg} shadow-lg cursor-default`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🤝</span>
                <h4 className={`font-bold text-lg ${primaryText}`}>
                  VALUE PROPOSITION
                </h4>
              </div>
              <p className={bodyText}>
                Experience real recruitment pressure before the actual placement
                season begins.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className={`p-6 rounded-xl border ${cardBg} shadow-lg cursor-default`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📋</span>
                <h4 className={`font-bold text-lg ${primaryText}`}>
                  KEY HIGHLIGHTS
                </h4>
              </div>
              <p className={bodyText}>3 Stages | Real-Time Feedback.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= LAYER 2: ROADMAP ================= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-6 md:px-16 py-12 max-w-7xl mx-auto"
        >
          <h3
            className={`${primaryText} text-xl font-bold mb-8 border-b inline-block border-opacity-50 border-current`}
          >
            Roadmap
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className={`relative w-full md:w-1/3 p-6 rounded-xl border-2 ${cardBorder} ${cardBg} text-center z-10`}
            >
              <h4 className={`${primaryText} font-bold text-xl mb-1`}>
                ROUND 1
              </h4>
              <h5
                className={`${
                  isLightTheme ? "text-black" : "text-white"
                } font-bold mb-2`}
              >
                THE SYNTAX SIEGE
              </h5>
              <p className={`text-sm ${bodyText}`}>
                Online Coding Round (Bring your own laptop).
                <br />
                DSA & Problem Solving.
                <br />
                Pen-paper/Lab-based.
              </p>
            </motion.div>

            <div
              className={`hidden md:block h-1 flex-1 ${
                isLightTheme ? "bg-gray-300" : "bg-[#00FFAF]/30"
              }`}
            ></div>
            <div className={`md:hidden text-3xl ${primaryText} my-2`}>⬇</div>

            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className={`relative w-full md:w-1/3 p-6 rounded-xl border-2 ${cardBorder} ${cardBg} text-center z-10`}
            >
              <h4 className={`${primaryText} font-bold text-xl mb-1`}>
                ROUND 2
              </h4>
              <h5
                className={`${
                  isLightTheme ? "text-black" : "text-white"
                } font-bold mb-2`}
              >
                THE DISCUSSION PHASE
              </h5>
              <p className={`text-sm ${bodyText}`}>
                Group Discussion.
                <br />
                Communication, Leadership.
                <br />
                Critical Thinking.
              </p>
            </motion.div>

            <div
              className={`hidden md:block h-1 flex-1 ${
                isLightTheme ? "bg-gray-300" : "bg-[#00FFAF]/30"
              }`}
            ></div>
            <div className={`md:hidden text-3xl ${primaryText} my-2`}>⬇</div>

            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className={`relative w-full md:w-1/3 p-6 rounded-xl border-2 ${cardBorder} ${cardBg} text-center z-10`}
            >
              <h4 className={`${primaryText} font-bold text-xl mb-1`}>
                ROUND 3
              </h4>
              <h5
                className={`${
                  isLightTheme ? "text-black" : "text-white"
                } font-bold mb-2`}
              >
                THE FINAL FRONTIER
              </h5>
              <p className={`text-sm ${bodyText}`}>
                Personal Interview.
                <br />
                1-on-1 Technical + HR.
                <br />
                Exclusive for Shortlisted.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= LAYER 3: INTELLIGENCE ================= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-6 md:px-16 py-8 max-w-7xl mx-auto"
        >
          <h3
            className={`${primaryText} text-xl font-bold mb-6 border-b inline-block border-opacity-50 border-current`}
          >
            The Intelligence
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <motion.div
              whileHover={hoverEffect}
              className={`p-4 rounded-lg border ${cardBorder} ${cardBg}`}
            >
              <span className="text-xs font-bold text-gray-400 uppercase">
                Date
              </span>
              <p
                className={`font-semibold ${
                  isLightTheme ? "text-black" : "text-white"
                }`}
              >
                Jan 17-18, 2025
              </p>
            </motion.div>
            <motion.div
              whileHover={hoverEffect}
              className={`p-4 rounded-lg border ${cardBorder} ${cardBg}`}
            >
              <span className="text-xs font-bold text-gray-400 uppercase">
                Time
              </span>
              <p
                className={`font-semibold ${
                  isLightTheme ? "text-black" : "text-white"
                }`}
              >
                To Be Declared
              </p>
            </motion.div>
            <motion.div
              whileHover={hoverEffect}
              className={`p-4 rounded-lg border ${cardBorder} ${cardBg} col-span-2 md:col-span-1`}
            >
              <span className="text-xs font-bold text-gray-400 uppercase">
                Venue
              </span>
              <p
                className={`font-semibold ${
                  isLightTheme ? "text-black" : "text-white"
                }`}
              >
                To Be Declared
              </p>
            </motion.div>
            <motion.div
              whileHover={hoverEffect}
              className={`p-4 rounded-lg border ${cardBorder} ${cardBg}`}
            >
              <span className="text-xs font-bold text-gray-400 uppercase">
                Eligibility
              </span>
              <p
                className={`font-semibold ${
                  isLightTheme ? "text-black" : "text-white"
                }`}
              >
                Everyone
              </p>
            </motion.div>
            <motion.div
              whileHover={hoverEffect}
              className={`p-4 rounded-lg border ${cardBorder} ${cardBg}`}
            >
              <span className="text-xs font-bold text-gray-400 uppercase">
                Reg Fee
              </span>
              <p
                className={`font-semibold ${
                  isLightTheme ? "text-black" : "text-white"
                }`}
              >
                To Be Declared
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= LAYER 4: INCENTIVES ================= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-6 md:px-16 py-12 mb-12 max-w-7xl mx-auto"
        >
          <h3
            className={`${primaryText} text-xl font-bold mb-6 border-b inline-block border-opacity-50 border-current`}
          >
            Incentives
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className={`flex items-start gap-4 p-6 rounded-xl border ${cardBorder} ${cardBg}`}
            >
              <div
                className={`p-3 rounded-full ${
                  isLightTheme ? "bg-green-100" : "bg-green-900"
                }`}
              >
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <h4 className={`font-bold text-xl mb-2 ${primaryText}`}>
                  PRIZES
                </h4>
                <ul className={`list-disc pl-5 ${bodyText} space-y-1`}>
                  <li>✔ E-Certificates for everyone</li>
                  <li>🏆 Exciting prizes for top ranks</li>
                  <li>🤩 A perfect chance to flex those brain muscles!</li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverEffect}
              className={`flex items-start gap-4 p-6 rounded-xl border ${cardBorder} ${cardBg}`}
            >
              <div
                className={`p-3 rounded-full ${
                  isLightTheme ? "bg-blue-100" : "bg-blue-900"
                }`}
              >
                <span className="text-2xl">🎁</span>
              </div>
              <div>
                <h4 className={`font-bold text-xl mb-2 ${primaryText}`}>
                  PERKS
                </h4>
                <ul className={`list-disc pl-5 ${bodyText} space-y-1`}>
                  <li>Direct entry to final rounds</li>
                  <li>Resume review</li>
                  <li>Placement Prep</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= FIXED: EVENT HIGHLIGHTS SECTION ================= */}
        <section className="py-6 relative px-4 max-w-7xl mx-auto">
          <h2
            className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"} 
              text-xl sm:text-2xl font-bold text-center mb-6`}
          >
            Event Highlights
          </h2>

          <div className="relative w-full max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div
              className={`relative w-full aspect-video overflow-hidden rounded-2xl shadow-2xl border ${cardBorder}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={eventImages[current]}
                    alt={`Highlight ${current + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Optional Overlay to make text readable if you add captions later */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="absolute -bottom-8 w-full flex justify-center space-x-2">
              {eventImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    current === idx
                      ? isLightTheme
                        ? "bg-[#0A7956]"
                        : "bg-[#00FFAF]"
                      : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
