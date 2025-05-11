import { Linkedin,Instagram,Copyright} from "lucide-react"; 
import NeonText from "../components/NeonText";
import { useNavigation } from "../context/NavigationContext";
import { useState } from "react";
const Footer=()=>{
    const { goTo } = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    return(
        <footer>
            <div className="bg-black border-t w-full md:h-[15rem] h-[10rem] flex flex-col items-center text-white">
            <NeonText color={"mt-2 md:mt-5"} text={"GET IN TOUCH"}/>
             <div className="flex justify-center md:gap-10 gap-2 md:pt-5 pt-3">
                <button onClick={() => goTo("/contact-us")} className="border-b-3  border-black  rounded-2xl px-3 bg-gradient-to-bl from-blue-400 to-emerald-500 font-bold  active:translate-y-0.5 active:border-b-2 hover:cursor-pointer">Contact Us</button>
                <a href="https://www.geeksforgeeks.org" className="text-emerald-200 flex items-center text-[0.7rem] md:text-[1.4rem] h-fit mt-1 ml-2 md:ml-0">www.geeksforgeeks.org</a>
                  <a href="https://www.linkedin.com/in/geeksforgeeks-mits-student-chapter-5b2986293 " target="_blank"><Linkedin className="md:w-10 md:h-10 hidden md:block "/></a>
                  <a href="https://www.instagram.com/geeksforgeeks_mits/ " target="_blank"><Instagram className="md:w-10 md:h-10 hidden md:block "/></a>
                  <p className="flex justify-center items-center text-xs md:text-xl">Visits:</p>
             </div>
             <p className="flex gap-3 md:pt-7  md:text-lg justify-center text-[0.7rem] pt-2"><Copyright className="w-5 md:w-10"/> Copyrights 2025 by GFG MITS-DU Gwalior. All Rights Reserved.</p>
        </div>
        </footer>
    );
}
export default Footer;