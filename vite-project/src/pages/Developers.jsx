import bgImage from "../assets/gfgback.jpg";
import NeonText from "../components/NeonText";
import NeonTextSmall from "../components/NeonTextSmall";
import pic from "../assets/pic.jpg";

// Card styling
const cardStyle = {
  position: "relative",
  borderRadius: "24px",
  overflow: "hidden",
  zIndex: 0,
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  padding: "20px",
};

const borderEffect = {
  content: '""',
  position: "absolute",
  inset: 0,
  padding: "6.5px",
  borderRadius: "24px",
  background: "linear-gradient(135deg, #10b981, #3b82f6)", 
  WebkitMask:
    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
  pointerEvents: "none",
  zIndex: -1,
};


const Developers = () => {
  return (
    <div
      className="min-h-screen py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Heading */}
      <div className="flex justify-center gap-5 items-center pt-10 flex-wrap text-center">
        <NeonText text="OUR" color="text-white  underline" />
        <NeonText text="DEVELOPERS" color="text-emerald-400 underline" />
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center  mt-16 px-6 place-items-center">
        {/* Card 1*/}
        <div className=" w-160 h-65 text-white mx-10 my-5" style={cardStyle}>
          {/* Gradient border */}
          <div style={borderEffect}></div>

          <div className="flex items-center">
            <img
              src={pic}
              alt="Priyansh"
              className="w-46 h-56 rounded-xl object-cover"
            />
            <div className="ml-6  flex flex-col justify-center">
              <NeonTextSmall
                text="PRIYANSH SONI"
                color="text-green-400 text-[2.5rem] mr-2"
              />
              <NeonTextSmall
                text="Role: Frontend Developer"
                color="text-blue-400 text-[1.5rem]"
              />
              <p className="text-lg mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                ea accusantium iure persp
              </p>
            </div>
          </div>
        </div>
        {/* Card 2*/}
        <div className=" w-160 h-65 text-white mx-10 my-5" style={cardStyle}>
          {/* Gradient border */}
          <div style={borderEffect}></div>

          <div className="flex items-center">
            <img
              src={pic}
              alt="Titiksha"
              className="w-46 h-56 rounded-xl object-cover"
            />
            <div className="ml-6  flex flex-col justify-center">
              <NeonTextSmall
                text="TITIKSHA YADAV"
                color="text-green-400 text-[2.5rem] mr-2"
              />
              <NeonTextSmall
                text="Role: UI/UX Designer"
                color="text-blue-400 text-[1.5rem]"
              />
              <p className="text-lg mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                ea accusantium iure persp
              </p>
            </div>
          </div>
        </div>
        <div className=" w-160 h-65 text-white mx-10 my-5" style={cardStyle}>
          {/* Gradient border */}
          <div style={borderEffect}></div>

          <div className="flex items-center">
            <img
              src={pic}
              alt="Titiksha"
              className="w-46 h-56 rounded-xl object-cover"
            />
            <div className="ml-6  flex flex-col justify-center">
              <NeonTextSmall
                text="JAGRAT AGRAWAL"
                color="text-green-400 text-[2.5rem] mr-2"
              />
              <NeonTextSmall
                text="Role: Frontend Developer"
                color="text-blue-400 text-[1.5rem]"
              />
              <p className="text-lg mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                ea accusantium iure persp
              </p>
            </div>
          </div>
        </div>
        <div className=" w-160 h-65 text-white mx-10 my-5" style={cardStyle}>
          {/* Gradient border */}
          <div style={borderEffect}></div>

          <div className="flex items-center">
            <img
              src={pic}
              alt="Titiksha"
              className="w-46 h-56 rounded-xl object-cover"
            />
            <div className="ml-6  flex flex-col justify-center">
              <NeonTextSmall
                text="PRASANNA SAXENA"
                color="text-green-400 text-[2.5rem] mr-2"
              />
              <NeonTextSmall
                text="Role: Frontend Developer"
                color="text-blue-400 text-[1.5rem]"
              />
              <p className="text-lg mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                ea accusantium iure persp
              </p>
            </div>
          </div>
        </div>
        <div className=" w-160 h-65 text-white mx-10 my-5" style={cardStyle}>
          {/* Gradient border */}
          <div style={borderEffect}></div>

          <div className="flex items-center">
            <img
              src={pic}
              alt="Titiksha"
              className="w-46 h-56 rounded-xl object-cover"
            />
            <div className="ml-6  flex flex-col justify-center">
              <NeonTextSmall
                text="UNNATI JADON"
                color="text-green-400 text-[2.5rem] mr-2"
              />
              <NeonTextSmall
                text="Role: Frontend Developer"
                color="text-blue-400 text-[1.5rem]"
              />
              <p className="text-lg mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                ea accusantium iure persp
              </p>
            </div>
          </div>
        </div>
        <div className=" w-160 h-65 text-white mx-10 my-5" style={cardStyle}>
          {/* Gradient border */}
          <div style={borderEffect}></div>

          <div className="flex items-center">
            <img
              src={pic}
              alt="Titiksha"
              className="w-46 h-56 rounded-xl object-cover"
            />
            <div className="ml-6  flex flex-col justify-center">
              <NeonTextSmall
                text="SNEHA TOMAR"
                color="text-green-400 text-[2.5rem] mr-2"
              />
              <NeonTextSmall
                text="Role: Frontend Developer"
                color="text-blue-400 text-[1.5rem]"
              />
              <p className="text-lg mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                ea accusantium iure persp
              </p>
            </div>
          </div>
        </div>
        <div className=" w-160 h-65 text-white mx-10 my-5" style={cardStyle}>
          {/* Gradient border */}
          <div style={borderEffect}></div>

          <div className="flex items-center">
            <img
              src={pic}
              alt="Titiksha"
              className="w-46 h-56 rounded-xl object-cover"
            />
            <div className="ml-6  flex flex-col justify-center">
              <NeonTextSmall
                text="ROHAN MALAKAR"
                color="text-green-400 text-[2.5rem] mr-2"
              />
              <NeonTextSmall
                text="Role: Frontend Developer"
                color="text-blue-400 text-[1.5rem]"
              />
              <p className="text-lg mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                ea accusantium iure persp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
