import React from "react";
import OtherPage1 from "../components/OtherPage1.jsx";
import useTheme from "../context/ThemeContext";
import "../css/OtherPage1.css";

const AboutUs = () => {
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";

  const cardData = [
    {
      title: "Who are we?",
      text: "GFG Campus Body MITS DU is your on-campus GeeksforGeeks chapter—a vibrant, student-led tech community empowering learners through coding, collaboration, and career development. Founded to build a culture of peer learning and innovation, we organize workshops, coding contests, mentorship programs, and hands-on projects to help every member grow and lead in the world of technology.",
    },
    {
      title: "Our Vision",
      text: "At GFG Campus Body MITS DU, our vision is to nurture a dynamic ecosystem of passionate problem-solvers and programmers who are well-equipped to excel in an ever-evolving tech landscape. We aspire to foster a culture of continuous learning, creativity, and inclusive community engagement, empowering students across disciplines to innovate and make meaningful technological impact.",
    },
    {
      title: "Our Mission",
      text: "Our mission is to build a thriving campus coding culture by organizing hands-on workshops, interactive hackathons, expert sessions, and collaborative projects. We strive to enhance technical skills, promote peer-to-peer mentorship, facilitate industry exposure, and prepare students at MITS DU for successful careers in technology—all while forging connections, leadership, and confidence.",
    },
  ];

  return (
    <>
      <OtherPage1 />
      <div className="otherpage1-content min-h-screen text-white flex flex-col items-center gap-10 py-20 px-4 justify-center">
        <h1
          style={{
            fontFamily: "Cabin, sans-serif",
            textAlign: "center",
            userSelect: "none",
            fontSize: "60px",
          }}
          className="text-center mb-4"
        >
          <span
            className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
          >
            &lt;{" "}
          </span>
          <span
            className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"}`}
          >
            {" "}
            About Us{" "}
          </span>
          <span
            className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
          >
            &gt;
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch w-full max-w-[1400px] px-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex-1 min-w-[280px] max-w-[420px] bg-[#002B46] rounded-[20px] border border-[#004C7C] p-6 flex flex-col"
              style={{ height: "374px" }}
            >
              <h2 className="text-[#00FFF2] text-[32px] font-bold font-[Cabin] mb-4">
                {card.title}
              </h2>
              <p className="text-white text-[16px] font-[Cabin] font-normal overflow-y-auto">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
