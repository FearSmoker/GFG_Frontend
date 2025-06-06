import { useEffect, useState } from "react";
import GradientBox from "../components/GradientBox";
import CurrentDate from "../components/CurrentDate";
import { getTodayProblem } from "../api/Potd_api.js";

const POTD = () => {
  const [problem, setProblem] = useState(null);
  const [showProblem, setShowProblem] = useState(false);

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

  return (
    <div
      className="relative min-h-screen w-full bg-[#011725] text-white backdrop-blur-[25px] overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ fontFamily: "Cabin, sans-serif" }}
    >

      {/* Heading */}
      <h1 className="z-10 text-[#0E86D2] text-4xl md:text-5xl font-bold tracking-wide mb-12 text-center">
       <span className="text-[#0E86D2]">&lt;</span>
      <span className="text-[#00FFAF] mx-2">Problem Of The Day</span>
      <span className="text-[#0E86D2]">&gt;</span>
      </h1>

      {/* POTD Container */}
      <div className="w-full bg-[#002B46]/60 border border-[#004C7C] rounded-[20px] p-6">
    

        {/* Info Row */}
        <div className="flex justify-between items-center mb-4">
          <CurrentDate />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Problem Info */}
          <div className="font-[Cabin] p-6 mb-6 rounded-xl border border-[#004C7C] flex flex-col text-left text-sm md:text-base">
            <div>
              <strong>Name:</strong>{" "}
              {problem ? problem.problem_name : "Loading..."}
            </div>
            <div>
              <strong>Difficulty:</strong>{" "}
              {problem ? problem.difficulty : "Loading..."}
            </div>
          </div>

          {/* Show Problem Button */}
          <button
            onClick={() => setShowProblem(true)}
            className="bg-[#00FFAF] border border-[#004C7C] text-black font-semibold px-6 py-2 rounded-md text-sm md:text-base"
          >
            Show Problem
          </button>
        </div>
      </div>

      {/* Problem Description Box */}
      {showProblem && (
        <div className="z-10 w-full max-w-3xl mt-10 bg-[#002B46]/60 border border-[#004C7C] backdrop-blur-sm rounded-[20px] p-6 transition-all duration-5000 ease-out opacity-100 scale-100"
        >
          <div className="bg-[#002B46]/60 border border-[#004C7C] rounded-lg p-4 mb-4">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {problem ? problem.description : "Loading..."}
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href="https://www.geeksforgeeks.org/problem-of-the-day"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className=" w-full md:text-base px-6 py-2 h-[40px] bg-[#00FFAF] border border-[#004C7C] rounded-md flex items-center justify-center">
        <span className="text-[#002B46] text-sm font-semibold">Submit</span>
      </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default POTD;
