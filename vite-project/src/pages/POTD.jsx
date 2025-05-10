import NeonText from "../components/NeonText";
import GradientBoxx from "../components/Gradientforpotd";
import GradientBox from "../components/GradientBox";
const POTD = () => {
          const today=new Date();
          const todaysDate=today.toLocaleDateString();
          const hideP = () => {
            const element = document.querySelector(".question");
            if (element) {
              element.style.display = "block";
            }
          };
  return (
      
      <div
        className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-10 px-4 overflow-hidden "
        style={{ backgroundImage: "url('/src/assets/potd-bg.jpg')" }}
      >
      
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
        {/* Neon Heading */}
        <div className="z-10 mb-10 mt-[-5rem] xl:mt-[-20rem] ">
          <NeonText text="POTD" color="text-emerald-400 underline scale-150 pt-20 " />
        </div>
        <div className="z-10 mb-5 mt-[-80px] border-4 border-emerald-500 bg-black  rounded-xl text-white p-6 text-center" >
          <NeonText text="Problem Of The Day" color="text-white text-[25px]"/>
          <div className="flex gap-8 md:gap-70 mt-2  justify-center">
            <div className="text-white text-xl md:text-3xl">{todaysDate}
                  <div className="text-sm text-start">
                      <div>Name:</div>
                      <div>Difficulty:</div>
                  </div>
            </div>
            
              <div className=" flex items-center"  onClick={hideP}><GradientBox text="&nbsp;Show Problem&nbsp;" color="text-[0.8rem] md:text-xl"/></div>
              
          </div>
        </div>
      

        {/* POTD question */}
    
        <div className="z-10 question hidden md:mb-[-15rem] ">
          <div className="z-10 w-full max-w-4xl">
            <GradientBoxx
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </div>
          <a  href="https://www.geeksforgeeks.org/problem-of-the-day" target="_blank">
              <div className="z-10 w-full max-w-4xl mt-8 flex justify-center scale-140">
                
                    <GradientBox text="&nbsp;Solve&nbsp;" />
               
              </div>
          </a>
        </div>
      </div>
  );
};

export default POTD;
