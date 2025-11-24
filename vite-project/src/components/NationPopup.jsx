import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Nationpopup() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ x: 200, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="z-20 fixed top-36 md:w-80 right-6  flex items-center gap-4 bg-gradient-to-r  from-emerald-700   text-white p-4 sm:p-5 rounded-2xl shadow-xl max-w-xs sm:max-w-sm md:max-w-md"
        >
          {/* Illustration */}
          <div className="flex-shrink-0">
            <img
              src="../assets/Nation-images/Connect-Banner.png"
              alt="nation"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-emerald-300">
              GFG-Connect
            </h3>
            <p className="text-sm sm:text-base text-gray-100 leading-snug">
              connect now! 🚀
            </p>
            <button className="mt-2 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 transition">
              <Link to="https://www.geeksforgeeks.org/connect/explore">Register Now</Link> 
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </>
  );
}
