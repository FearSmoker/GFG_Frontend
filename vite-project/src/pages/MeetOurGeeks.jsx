import pic from "../assets/pic.jpg";
import useTheme from "../context/ThemeContext";

const CAMPUS_MANTRI = [
  {
    name: "Parthivendra Singh",
    role: "Campus Mantri",
    img: pic,
    social: {
      linkedin: "https://linkedin.com/in/parthivendra-singh",
      instagram: "https://instagram.com/parthivendra",
      github: "https://github.com/parthivendra",
    },
  },
];

const LEADS = [
  {
    name: "Aryan Saxena",
    role: "Tech Head",
    img: pic,
    social: {
      linkedin: "https://linkedin.com/in/aryan-saxena",
      instagram: "https://instagram.com/aryansaxena",
      github: "https://github.com/aryansaxena",
    },
  },
  {
    name: "Nikita Jain",
    role: "Event Head",
    img: pic,
    social: {
      linkedin: "https://linkedin.com/in/nikita-jain",
      instagram: "https://instagram.com/nikitajain",
      github: "https://github.com/nikitajain",
    },
  },
  {
    name: "Mukul Sharma",
    role: "Outreach Head",
    img: pic,
    social: {
      linkedin: "https://linkedin.com/in/mukul-sharma",
      instagram: "https://instagram.com/mukulsharma",
      github: "https://github.com/mukulsharma",
    },
  },
  {
    name: "Kunal Barange",
    role: "Creative Head",
    img: pic,
    social: {
      linkedin: "https://linkedin.com/in/kunal-barange",
      instagram: "https://instagram.com/kunalbarange",
      github: "https://github.com/kunalbarange",
    },
  },
  {
    name: "Harsh Yadav",
    role: "Promotions Head",
    img: pic,
    social: {
      linkedin: "https://linkedin.com/in/harsh-yadav",
      instagram: "https://instagram.com/harshyadav",
      github: "https://github.com/harshyadav",
    },
  },
];

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ProfileCard = ({ person, isLightTheme }) => {
  const firstName = person.name.split(" ")[0];

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
          }
        `}
        >
          <img
            src={person.img}
            alt={person.name}
            className="w-20 h-20 rounded-full border-4 border-white mb-3"
          />
          <h2 className="text-lg font-bold">{person.name}</h2>
          <p
            className={`text-sm font-semibold ${
              isLightTheme ? "text-blue-600" : "text-[#00FFAF]"
            }`}
          >
            {person.role}
          </p>
        </div>

        {/* BACK (split halves reveal) */}
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
                <LinkedInIcon />
              </a>
              {/* Instagram */}
              <a
                href={person.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white p-2 rounded-lg transition transform hover:scale-110"
              >
                <InstagramIcon />
              </a>
              {/* GitHub */}
              <a
                href={person.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#333] hover:bg-[#24292e] text-white p-2 rounded-lg transition transform hover:scale-110"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MeetOurGeeks = () => {
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";

  return (
    <div
      style={{ fontFamily: "Cabin, sans-serif" }}
      className={`p-10 min-h-screen w-full px-4 pt-32 pb-20 overflow-hidden ${
        isLightTheme
          ? "bg-gradient-to-b from-white via-emerald-300 to-white text-black"
          : "bg-gradient-to-b from-[#011725] via-[#013a28] to-[#011725] text-white"
      }`}
    >
      <h1 className="text-center text-4xl md:text-[3rem] mb-4">
        <span className={isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}>
          &lt;{" "}
        </span>
        <span className={isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"}>
          Meet Our Geeks
        </span>{" "}
        <span className={isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}>
          &gt;
        </span>
      </h1>
      <p className="text-center text-lg md:text-xl mb-15 text-[#A6A6A6]">
        The Hardworkers behind the Success of{" "}
        <span className={isLightTheme ? "text-[#02875D]" : "text-[#00895E]"}>
          Geeks<span className="text-[#0065A5]">For</span>Geeks
        </span>
      </p>

      {/* Campus Mantri Section */}
      <div className="flex flex-wrap justify-center gap-14 mb-10">
        {CAMPUS_MANTRI.map((person, index) => (
          <ProfileCard
            key={index}
            person={person}
            isLightTheme={isLightTheme}
          />
        ))}
      </div>

      {/* Leads Section */}
      <p
        className={`flex justify-center text-4xl mb-10 ${
          isLightTheme ? "text-[#7D7D7D]" : "text-white"
        }`}
      >
        Leads
      </p>
      <div className="flex flex-wrap justify-center gap-14">
        {LEADS.map((person, index) => (
          <ProfileCard
            key={index}
            person={person}
            isLightTheme={isLightTheme}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetOurGeeks;
