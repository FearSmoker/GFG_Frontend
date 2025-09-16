import React from "react";
import MitsLogo from "../assets/MitsLogo.png";

const FacultyCard = ({ person, isLightTheme }) => {
  const firstName = person.displayName || person.name.split(" ")[0];

  return (
    <div className="group w-80 h-60 [perspective:1200px]">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* FRONT */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl shadow-lg [backface-visibility:hidden]
          ${
            isLightTheme
              ? "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900"
              : "bg-[#011725] text-white"
          }`}
        >
          {person.img ? (
            <img
              src={person.img}
              alt={person.name}
              className="w-32 h-32 rounded-full border-4 border-white mb-3 object-cover object-center"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-white mb-3 bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-bold">
              {person.name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}
          <h2 className="text-xl font-bold">{person.name}</h2>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-2xl shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
          {/* Split halves */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500 transform transition-transform duration-700 group-hover:-translate-x-full"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-green-500 transform transition-transform duration-700 group-hover:translate-x-full"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
            <h3 className="text-lg font-bold">Connect with {firstName}</h3>
            <div className="flex gap-4">
              {/* LinkedIn */}
              <a
                href={person.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0077B5] hover:bg-[#005885] text-white p-2 rounded-lg transition transform hover:scale-110"
              >
                {/* LinkedIn Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* MITS Logo */}
              <a
                href={person.social.mits}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-white p-2 rounded-lg transition transform hover:scale-110 flex items-center justify-center"
                title="MITS Gwalior Profile"
              >
                <img
                  src={MitsLogo}
                  alt="MITS Logo"
                  className="w-6 h-6 scale-150 object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
