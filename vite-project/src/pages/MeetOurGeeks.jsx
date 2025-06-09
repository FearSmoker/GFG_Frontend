import pic from "../assets/pic.jpg";
import useTheme from "../context/ThemeContext";
const CIRCLE_MEMBERS = [
  { name: "Shivani Sharma", role: "Content Lead", img: pic ,link:""},
  { name: "Pulkit Kapoor", role: "Social-Media Lead", img: pic ,link:""},
  { name: "Varsha Narwariya", role: "PR and Outreach Lead", img: pic ,link:""},
  { name: "Ishaan Sharma", role: "Technical Lead", img: pic ,link:""},
  { name: "Bhoomi Garg", role: "Marketing Lead", img: pic ,link:""},
];
const DEV_MEMBERS = [
    { name: "Aryan Saxena", role: "Full-Stack Developer", img: pic ,link:""},
    { name: "Priyansh Soni", role: "Frontend Developer", img: pic ,link:""},
    { name: "Titiksha Yadav", role: "Designer", img: pic ,link:""},
    { name: "Harshit Tiwari", role: "Frontend Developer", img: pic,link:"" },
    { name: "Jagrat Agrawal", role: "Frontend Developer", img: pic ,link:""},
    { name: "Unnati Jadon", role: "Frontend Developer", img: pic ,link:""},
    { name: "Sneha Tomar", role: "Frontend Developer", img: pic ,link:""},
  ];
const LEADS = [
  { name: "Priyanka Sikarwar", role: "President", img: pic ,link:""},
  { name: "Bhumi Shivhare", role: "Vice president", img: pic ,link:""},
];

const MeetOurGeeks = () => {
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";
  return (
    <div style={{ fontFamily: 'Cabin, sans-serif' }} className={`p-10 min-h-screen w-full px-4 py-10 overflow-hidden 
      ${isLightTheme
    ? "bg-gradient-to-b from-white via-emerald-300 to-white text-black"
    : "bg-gradient-to-b from-[#011725] via-[#013a28] to-[#011725] text-white"
} `}>
      
      <h1 className={`text-center text-4xl md:text-[3rem] mb-4`}><span className={`${isLightTheme
    ? " text-[#2195DE]"
    : " text-[#0065A5]"
}`}>&lt; </span><span className={`
  ${isLightTheme
    ? " text-[#0A7956]"
    : " text-[#00FFAF]"
}
  `}> Meet Our Geeks</span> <span className={`${isLightTheme
        ? " text-[#2195DE]"
        : " text-[#0065A5]"
    }`}>&gt;</span></h1>
      <p className={`text-center text-lg md:text-xl mb-15 text-[#A6A6A6]`}>
        The Hardworkers behind the Success of <span className={` ${isLightTheme
    ? " text-[#02875D]"
    : " text-[#00895E]"
}`}>Geeks<span className={`text-[#0065A5]`}>For</span>Geeks</span>
      </p>

      {/* Leads Section */}
      <div className={` flex flex-wrap justify-center  gap-14 xl:gap-52 mb-10`}>
        {LEADS.map((person, index) => (
          <div key={index} className={`
            ${isLightTheme
              ? " bg-[#3CA8EB] border-[0.1px] border-white shadow-[0_0_4px_0.5px_gray]"
              : " bg-[#011725] border-[0px] border-white shadow-[0_0_4px_0.1px_white] "
          }
           text-black rounded-lg p-4 w-96 flex flex-col  `}>
            <div className={` 
              
              flex`}>
                <img src={person.img} alt={person.name} className={`w-24 h-24 object-cover  rounded-full border-3 border-white`}/>
                <div>
                    <h2 className={`text-2xl text-[#FFFFFF] pl-3  mt-2`}>{person.name}</h2>
                    <p className={`text-lg  pl-3
                      ${isLightTheme
                        ? " text-[#02875D] font-semibold"
                        : " text-[#00FFAF]"
                    }`}>{person.role}</p>
                </div>
            </div>
            <a href={person.link} className={` w-40 ml-24 `}>
              <button className={`border-[0px] hover:cursor-pointer border-white shadow-[0_0_4px_0.1px_white] text-lg w-40    text-white py-2 px-4 rounded hover:bg-teal-700
                ${isLightTheme
                  ? " bg-gradient-to-r from-[#002B46] to-[#00895E]"
                  : " bg-gradient-to-r from-[#0BA5C9] to-[#00fcB1]  "
              }
                `}>
                View Profile
              </button>
            </a>
          </div>
        ))}
      </div>
      {/*  */}
      <p className={`flex justify-center text-4xl mb-10
        ${isLightTheme
          ? " text-[#7D7D7D]"
          : " text-white"
      }`}>Leads</p>
      {/* Circle Members Section */}
      <div className={` flex flex-wrap justify-center gap-14`}>
        {CIRCLE_MEMBERS.map((person, index) => (
          <div key={index} className={`
            ${isLightTheme
              ? " bg-[#3CA8EB] border-[0.1px] border-white shadow-[0_0_4px_0.5px_gray]"
              : " bg-[#011725] border-[0px] border-white shadow-[0_0_4px_0.1px_white] "
          }
           text-black rounded-lg p-4 w-96 flex flex-col  `}>
            <div className={`flex`}>
                <img src={person.img} alt={person.name} className={`w-24 h-24 object-cover  rounded-full border-3 border-white`}/>
                <div>
                    <h2 className={`text-2xl text-[#FFFFFF] pl-3  mt-2`}>{person.name}</h2>
                    <p className={`text-lg  pl-3
                      ${isLightTheme
                        ? " text-[#02875D] font-semibold"
                        : " text-[#00FFAF]"
                    }`}>{person.role}</p>
                </div>
            </div>
            <a href={person.link} className={` w-40 ml-24 `}>
              <button className={`border-[0px] hover:cursor-pointer border-white shadow-[0_0_4px_0.1px_white] text-lg w-40    text-white py-2 px-4 rounded hover:bg-teal-700
                ${isLightTheme
                  ? " bg-gradient-to-r from-[#002B46] to-[#00895E]"
                  : " bg-gradient-to-r from-[#0BA5C9] to-[#00fcB1]  "
              }
                `}>
                View Profile
              </button>
            </a>
          </div>
        ))}
      </div>
      {/*  */}
      <h1 className={`text-center text-2xl sm:text-3xl mt-24
        ${isLightTheme
          ? " text-[#7D7D7D]"
          : " text-white"
      }
        `}>Meet Our Designer(s) & Developers</h1>
      <p className={`text-center mb-14 mt-4 text-lg sm:text-xl 
        ${isLightTheme
          ? " text-[#7D7D7D]"
          : " text-[#A6A6A6]"
      }
        `}>
        The Brilliant Minds behind the making of <span className={`text-emerald-700`}>Geeks<span className={`text-[#0065A5]`}>For</span>Geeks</span> Website
      </p>
      {/* DEVS */}
      <div className={` flex flex-wrap justify-center gap-14`}>
        {DEV_MEMBERS.map((person, index) => (
          <div key={index} className={`
            ${isLightTheme
              ? " bg-[#409476] border-[0.1px] border-white shadow-[0_0_4px_0.5px_gray]"
              : " bg-[#335065] border-[0px] border-white shadow-[0_0_4px_0.1px_white] "
          }
           text-black rounded-lg p-4 w-96 flex flex-col  `}>
            <div className={`flex`}>
                <img src={person.img} alt={person.name} className={`w-24 h-24 object-cover  rounded-full border-3 border-white`}/>
                <div>
                    <h2 className={`text-2xl text-[#FFFFFF] pl-3  mt-2`}>{person.name}</h2>
                    <p className={`text-lg  pl-3
                      ${isLightTheme
                        ? " text-[#00FFAF]"
                        : " text-[#00FFAF]"
                    }`}>{person.role}</p>
                </div>
            </div>
            <a href={person.link} className={` w-40 ml-24 `}>
              <button className={`border-[0px] hover:cursor-pointer border-white shadow-[0_0_4px_0.1px_white] text-lg w-40    text-white py-2 px-4 rounded hover:bg-teal-700
                ${isLightTheme
                  ? " bg-gradient-to-r from-[#002B46] to-[#00895E]"
                  : " bg-gradient-to-r from-[#0BA5C9] to-[#00fcB1]  "
              }
                `}>
                View Profile
              </button>
            </a>
          </div>
        ))}
      </div>
      {/*  */}
      
    </div>
  );
};

export default MeetOurGeeks;
