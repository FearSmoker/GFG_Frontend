import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion"; 
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const CIRCLE_MEMBERS = [
    { name: "Shivani Sharma", role: "CONTENT LEAD", img: "https://via.placeholder.com/200x350" },
    { name: "Pulkit Kapoor", role: "SOCIAL MEDIA LEAD", img: "https://via.placeholder.com/200x350" },
    { name: "Varsha Narwariya", role: "PR AND OUTREACH LEAD", img: "https://via.placeholder.com/200x350" },
    { name: "Ishaan Sharma", role: "TECHNICAL LEAD", img: "https://via.placeholder.com/200x350" },
    { name: "Bhoomi Garg", role: "MARKETING LEAD", img: "https://via.placeholder.com/200x350" },
];

const LEADS = [
    { name: "Priyanka Sikarwar", role: "PRESIDENT", img: "https://via.placeholder.com/500x550" },
    { name: "Bhumi Shivhare", role: "VICE PRESIDENT", img: "https://via.placeholder.com/500x550" },
];

const MeetOurGeeks = () => {
    const [isMeetGreen, setIsMeetGreen] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsMeetGreen(prev => !prev);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById("circle-container");
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75) {
                    setIsVisible(true);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const circlePositions = useMemo(() => {
        const radius = 500;
        return CIRCLE_MEMBERS.map((_, index) => {
            const angle = (index / CIRCLE_MEMBERS.length) * (2 * Math.PI);
            return {
                top: `calc(50% + ${Math.sin(angle) * radius}px - 175px)`,
                left: `calc(50% + ${Math.cos(angle) * radius}px - 125px)`,
                initialX: Math.cos(angle) > 0 ? 200 : -200, // Move from left or right
            };
        });
    }, []);

    return (
        <div>
            
            <div className="bg-black text-white w-full h-fit pb-20 flex flex-col items-center p-6 ">
                {/* Flickering Heading */}
                <h1 className="text-[120px] font-bold mb-6 text-center h-[225px] w-[1025px] flex items-center justify-center">
                    <span className={`font-bold ${isMeetGreen ? 'text-green-500' : 'text-white'}`}> MEET </span>&nbsp;
                    <span className={`font-bold ${isMeetGreen ? 'text-white' : 'text-green-500'}`}> OUR </span>&nbsp;
                    <span className={`font-bold ${isMeetGreen ? 'text-green-500' : 'text-white'}`}> GEEKS </span>
                </h1>
                {/* Leads */}
                <div className="flex gap-16 mb-16">
                    {LEADS.map(({ name, role, img }, idx) => (
                        <div key={idx} className="w-[300px] h-[500px] flex flex-col items-center">
                            <div className="profile-card">
                                <div className="content">
                                    <img src="https://via.placeholder.com/200x350" alt="Profile Name" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-center mt-6">{name}</h2>
                            <p className="text-green-400 text-center text-xl">{role}</p>
                        </div>
                    ))}
                </div>
                {/* Circular Formation */}
                <div id="circle-container" className="relative w-[1300px] h-[1300px] mx-auto">
                    {/* Center Person */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="profile-card">
                            <img src="https://via.placeholder.com/200x350" alt="Anushka Thapa" />
                        </div>
                        <h2 className="text-lg font-bold mt-6">Anushka Thapa</h2>
                        <p className="text-green-400 text-base">DESIGN LEAD</p>
                    </div>
                    {/* Circular Members with Side Entry Effect */}
                    {CIRCLE_MEMBERS.map(({ name, role, img }, index) => (
                        <motion.div
                            key={index}
                            className="absolute text-center"
                            style={circlePositions[index]}
                            initial={{ opacity: 0, x: circlePositions[index].initialX }} // Enter from left or right
                            animate={isVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1.2, delay: index * 0.3 }} // Increased duration for smooth effect
                        >
                            <div className="profile-card">
                                <img src={img} alt={name} />
                            </div>
                            <h2 className="text-lg font-bold mt-6">{name}</h2>
                            <p className="text-green-400 text-base">{role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default MeetOurGeeks;