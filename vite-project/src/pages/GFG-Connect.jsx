import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../context/ThemeContext";
import OtherPage1 from "../components/OtherPage1";
import ConnectBanner from "../assets/Nation-images/ConnectBanner.png";

import Pic01 from "../assets/Nation-images/Pic01.png";
import Pic02 from "../assets/Nation-images/Pic02.png";
import Pic03 from "../assets/Nation-images/Pic03.png";
import Pic04 from "../assets/Nation-images/Pic04.png";

export default function NationSkillUpPage() {
    // Carousel Images
    const images = [Pic01, Pic02, Pic03, Pic04];
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
                                className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
                                    }`}
                            >
                                &lt;
                            </span>
                            <span
                                className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
                                    } mx-2 `}
                            >GFG Connect
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
                            <p className="text-md px-2 sm:text-3xl font-semibold ">"Let's Grow Together <span className="text-emerald-600"> — Beyond Coding"</span> <span className="text-emerald-600"></span></p>
                            <p className="text-xs px-2 mt-3">Connect with trusted experts, anytime. Get real answers, real guidance, in real time.</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#059669", boxShadow: "0px 4px 20px rgba(16, 185, 129, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="scale-120 mt-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg shadow-md w-45"
                        >
                            <a target="_blank" href="https://www.geeksforgeeks.org/connect/explore">Register Now!</a>
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
                            className={`${isLightTheme ? "text-gray-700" : "text-white"
                                }`}
                        >
                            <h2
                                className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
                                    }  text-3xl sm:text-4xl font-bold mb-4 sm:mt-[-8rem]  text-center sm:text-left`}
                            >
                                About the Event
                            </h2>
                            <p className=" text-center sm:text-xl sm:text-left leading-relaxed ">
                                GfG CONNECT is a  <span className="text-emerald-600">1:1 mentorship program</span> designed to connect tech enthusiasts with verified industry professionals.

                                The program aims to provide personalized guidance, career advice, and skill development opportunities to help participants excel in their tech careers.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ x: 60, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="flex justify-center md:justify-end"
                        >
                            <img
                                src={ConnectBanner}
                                alt="Event Banner"
                                className="rounded-xl shadow-lg w-11/12 sm:w-3/4 md:w-full h-64 sm:h-80 md:h-96 object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Gallery Carousel */}
                <section className="py-16 relative px-4">
                    <h2
                        className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
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
                                            className="w-full sm:w-1/3 h-[520px] sm:h-[680px] md:h-[760px] object-cover rounded-lg"
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
                                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${current === idx ? "bg-green-500" : "bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>



                {/* Testimonials */}
                <section className="py-16 px-6 md:px-20">
                    <h2
                        className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
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
