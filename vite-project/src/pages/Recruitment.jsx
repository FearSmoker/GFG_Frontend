import React from "react";
import { motion } from "framer-motion";
import OtherPage1 from "../components/OtherPage1";

import useTheme from "../context/ThemeContext";


const domains = [
  {
    title: "Events & Operations",
    desc: "Plan and execute workshops, hackathons, and manage on-ground operations.",
  },
  {
    title: "Outreach & PR",
    desc: "Build campus visibility, handle sponsorships, collaborations, and campaigns.",
  },
  {
    title: "Technical",
    desc: "Work on development, DSA practice, contests, and project showcases.",
  },
  {
    title: "Creative Media",
    desc: "Design graphics, capture moments, and edit engaging videos.",
  },
  {
    title: "Promotions & Social Media",
    desc: "Run social platforms, create posts, reels, newsletters & track reach.",
  },
];

export default function RecruitmentPage() {
    const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";
  return (
    <>
    <OtherPage1/>
    <div className=" pt-20 sm:pt-40 min-h-screen  flex flex-col items-center justify-center px-6 py-12">
      {/* Heading */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`${
                  isLightTheme ? "text-black" : "text-gray-50"
                } text-4xl md:text-5xl font-extrabold  text-center mb-4 `}
      >
        <span
                className={`${
                  isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
                }`}
              >
                &lt;
              </span>
        <span className="text-emerald-600">GFG MITS</span> Recruitment Drive <span className="text-emerald-600">2025</span>

            <span
                className={`${
                  isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
                }`}
              >
                &gt;
              </span>

      </motion.h1>

      <p 
      className={`${
                  isLightTheme ? "text-gray-700" : "text-white"
                } text-lg  text-center max-w-2xl mb-10`}>
        Explore the <span className="text-emerald-600">domains</span> and choose where your passion fits best.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {domains.map((domain, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            className={`${
                  isLightTheme ? "bg-white" : "bg-gradient-to-br from-emerald-200 to-emerald-400"
                } group relative  rounded-2xl shadow-lg p-6 cursor-pointer overflow-hidden`}

          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
              {domain.title}
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
              {domain.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Placeholder for Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 w-full max-w-2xl text-center"
      >
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl py-10 px-6 shadow-inner">
          INSERT FORM HERE!!!
        </div>
      </motion.div>
    </div>
    </>
  );
}
