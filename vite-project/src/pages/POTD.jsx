import { useEffect, useState } from "react";
import CurrentDate from "../components/CurrentDate";
import { getTodayProblem } from "../api/Potd_api.js";
import useTheme from "../context/ThemeContext";

const POTD = () => {
  const [problem, setProblem] = useState(null);
  const [showProblem, setShowProblem] = useState(false);
  
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === 'light';

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
      className={`relative min-h-screen w-full backdrop-blur-[25px] overflow-hidden flex flex-col items-center justify-center px-4 ${
        isLightTheme 
          ? 'bg-white text-black' 
          : 'bg-[#011725] text-white'
      }`}
      style={{ fontFamily: "Cabin, sans-serif" }}
    >
      {/* Heading */}
      <h1 className="z-10 text-[#0E86D2] text-4xl md:text-5xl font-bold tracking-wide mb-12 text-center">
       <span className="text-[#0E86D2]">&lt;</span>
      <span className="text-[#00FFAF] mx-2">Problem Of The Day</span>
      <span className="text-[#0E86D2]">&gt;</span>
      </h1>
      
      {/* POTD Container */}
      <div className={`w-full rounded-[20px] p-6 ${
        isLightTheme
          ? 'bg-[rgba(0,43,70,0.6)] border border-[#004C7C]'
          : 'bg-[#002B46]/60 border border-[#004C7C]'
      }`}>
   
        {/* Info Row */}
        <div className="flex justify-between items-center mb-4">
          <CurrentDate />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Problem Info */}
          <div className={`font-[Cabin] p-6 mb-6 rounded-xl border flex flex-col text-left text-sm md:text-base ${
            isLightTheme
              ? 'border-[#66BEF5] text-white'
              : 'border-[#004C7C]'
          }`}>
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
            className={`font-semibold px-6 py-2 rounded-md text-sm md:text-base ${
              isLightTheme
                ? 'bg-[#18EDAA] border border-[#004C7C] text-[#014570]'
                : 'bg-[#00FFAF] border border-[#004C7C] text-black'
            }`}
          >
            Show Problem
          </button>
        </div>
      </div>
      
      {/* Problem Description Box */}
      {showProblem && (
        <div className={`z-10 w-full max-w-3xl mt-10 backdrop-blur-sm rounded-[20px] p-6 transition-all duration-5000 ease-out opacity-100 scale-100 ${
          isLightTheme
            ? 'bg-[rgba(0,43,70,0.6)] border border-[#004C7C]'
            : 'bg-[#002B46]/60 border border-[#004C7C]'
        }`}>
          <div className={`rounded-lg p-4 mb-4 border ${
            isLightTheme
              ? 'border-[#66BEF5] bg-[#3D6075]'
              : 'bg-[#002B46]/60 border-[#004C7C]'
          }`}>
            <p className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
              isLightTheme ? 'text-white' : 'text-gray-300'
            }`}>
              {problem ? problem.description : "Loading..."}
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="https://www.geeksforgeeks.org/problem-of-the-day"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={`w-full md:text-base px-6 py-2 h-[40px] rounded-md flex items-center justify-center ${
                isLightTheme
                  ? 'bg-[#18EDAA] border border-[#004C7C]'
                  : 'bg-[#00FFAF] border border-[#004C7C]'
              }`}>
                <span className={`text-sm font-semibold ${
                  isLightTheme ? 'text-[#014570]' : 'text-[#002B46]'
                }`}>Submit</span>
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default POTD;