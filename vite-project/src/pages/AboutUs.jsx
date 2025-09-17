import React from "react";
import OtherPage1 from "../components/OtherPage1.jsx";
import useTheme from "../context/ThemeContext";
import "../css/OtherPage1.css";

const AboutUs = () => {
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";

  const cardData = [
    {
      title: "Our Vision",
      text: "At GFG Campus Body MITS DU, we aim to build a vibrant community of problem-solvers and programmers driven by curiosity and collaboration. We foster continuous learning, creativity, and inclusivity to empower students to innovate and create lasting technological impact.",
    },
    {
      title: "Our Mission",
      text: "To shape MITS DU’s premier hub for complete growth—where ambitious students gain advanced technical skills, entrepreneurial insight, communication mastery, and leadership through exclusive projects, hackathons, and mentorship with masters of their fields.",
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
          className="text-center  mt-10"
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

            <div
                className="text-center hover:cursor-pointer transform transition-transform duration-300 hover:scale-105  flex-1 lg:min-w-[580px] max-w-[420px] bg-[#002B46] rounded-[20px] border border-[#004C7C] p-6 flex flex-col"
                style={{ height: "374px" }}
              >
              <h2 className="text-[#00FFF2] text-[32px] font-bold font-[Cabin] mb-4 ">
                Our Motto
              </h2>
              <p className="text-white text-[18px] font-[Cabin] font-normal overflow-y-auto">
                Quality is not an act, it is a habit.
              </p>
              <p className="text-right md:mr-20">~ Aristotle</p>
            </div>

        <div className="tracking-wider flex flex-col lg:flex-row gap-34 justify-center items-stretch w-full max-w-[1400px] px-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="hover:cursor-pointer transform transition-transform duration-300 hover:scale-105 flex-1 min-w-[280px] max-w-[420px] bg-[#002B46] rounded-[20px] border border-[#004C7C] p-6 flex flex-col"
              style={{ height: "374px" }}
            >
              <h2 className="text-[#00FFF2] text-[32px] font-bold font-[Cabin] mb-4">
                {card.title}
              </h2>
              <p className="text-white text-[17px] font-[Cabin] font-normal overflow-y-auto">
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
