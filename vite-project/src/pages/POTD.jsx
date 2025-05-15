import NeonText from "../components/NeonText";
import GradientBoxx from "../components/Gradientforpotd";
import GradientBox from "../components/GradientBox";
import CurrentDate from "../components/CurrentDate.jsx";
import { getTodayProblem } from "../api/POTD_api.js";
import { useEffect, useState } from "react";

const POTD = () => {
  console.log("POTD component rendered");
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await getTodayProblem();
        setProblem(data);
      } catch (error) {
        console.error("Failed to load problem of the day:", error);
      }
    };

    fetchProblem();
  }, []);

  const hideP = () => {
    const element = document.querySelector(".question");
    if (element) {
      element.style.display = "block";
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-10 px-4 overflow-hidden"
      style={{ backgroundImage: "url('/src/assets/potd-bg.jpg')" }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      {/* Neon Heading */}
      <div className="z-10 mb-10 mt-[-5rem] xl:mt-[-20rem]">
        <NeonText
          text="POTD"
          color="text-emerald-400 underline scale-150 pt-20"
        />
      </div>

      {/* POTD Box */}
      <div className="z-10 mb-5 mt-[-80px] border-4 border-emerald-500 bg-black rounded-xl text-white p-6 text-center">
        <NeonText text="Problem Of The Day" color="text-white text-[25px]" />

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-4">
          {/* Left Column: Date + Problem Info */}
          <div className="flex flex-col text-white text-left text-sm md:text-base">
            <div className="flex justify-center md:justify-start">
              <CurrentDate />
            </div>
            <div className="mt-2">
              <div><strong>Name:</strong> {problem ? problem.problem_name : "Loading..."}</div>
              <div><strong>Difficulty:</strong> {problem ? problem.difficulty : "Loading..."}</div>
            </div>
          </div>

          {/* Right: Button */}
          <div className="flex items-center" onClick={hideP}>
            <GradientBox
              text="&nbsp;Show Problem&nbsp;"
              color="text-[0.6rem] md:text-xl"
            />
          </div>
        </div>
      </div>

      {/* POTD question */}
      <div className="z-10 question hidden md:mb-[-15rem]">
        <div className="z-10 w-full max-w-4xl">
          <GradientBoxx text={problem ? problem.description : "Loading..."} />
        </div>
        <a href="https://www.geeksforgeeks.org/problem-of-the-day" target="_blank">
          <div className="z-10 w-full max-w-4xl mt-8 flex justify-center scale-140">
            <GradientBox text="&nbsp;Solve&nbsp;" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default POTD;
