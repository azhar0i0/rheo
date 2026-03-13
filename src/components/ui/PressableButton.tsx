import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PressableButton = () => {
  return (
    <Link to="/start-project" className="group relative inline-block outline-none cursor-pointer w-48">
      
      {/* 1. Bottom Depth Layer */}
      <div
        className="
          absolute inset-0 
          translate-y-[14px] 
          rounded-full 
          bg-[#183650] 
          border-[2px] border-black
        "
      />

      {/* 2. Middle Rim Layer */}
      <div
        className="
          absolute inset-0 
          translate-y-[10px] 
          rounded-full 
          bg-[#41b2ff] 
          border-[2px] border-black 
          overflow-hidden 
          flex justify-between px-6
        "
      >
        <div className="w-[2px] h-full bg-black" />
        <div className="w-[2px] h-full bg-black" />
      </div>

      {/* 3. Top Face */}
      <motion.div
        whileHover={{ y: 2 }}
        whileTap={{ y: 7 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="
          relative z-10 
          inline-flex items-center justify-center 
          rounded-full 
          bg-[#008cff] 
          border-[2px] border-black 
          px-6 py-4 w-full
        "
      >
        <span className="text-sm font-semibold tracking-wide text-white select-none">
          Start Your Project
        </span>
      </motion.div>
      
    </Link>
  );
};

export default PressableButton;