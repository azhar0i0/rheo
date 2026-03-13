import { motion } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiFlutter, 
  SiNodedotjs, 
  SiDjango, 
  SiCplusplus, 
  SiSharp
} from "react-icons/si";

const techStack = [
  { name: "React", Icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", Icon: SiNextdotjs, color: "text-white" },
  { name: "Flutter", Icon: SiFlutter, color: "text-[#54C5F8]" },
  { name: "Node.js", Icon: SiNodedotjs, color: "text-[#5FA04E]" },
  { name: "Django", Icon: SiDjango, color: "text-[#44B78B]" },
  { name: "ReactNative", Icon: SiReact, color: "text-[#61DAFB]" },
  { name: "C++", Icon: SiCplusplus, color: "text-[#659AD2]" },
  { name: "C#", Icon: SiSharp, color: "text-[#9B4F96]" },
];

const HeroLoop = () => {
  const duplicatedItems = [...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <section className="relative flex w-full items-center overflow-hidden border-y border-white/5 bg-[#1B1B1B] py-6">
      
      <div className="absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[#050505] to-transparent md:w-48" />
      <div className="absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[#050505] to-transparent md:w-48" />

      {/* Ticker Container */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-6 pr-6 md:gap-8 md:pr-8"
          animate={{
            x: ["0%", "-50%"], 
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedItems.map((tech, index) => (
            <div
              key={index}
              className="group flex cursor-default items-center gap-6 pr-6 md:gap-8 md:pr-8 transition-all duration-300 "
            >
              {/* The Brand Icon */}
              <tech.Icon 
                className={`text-3xl transition-colors duration-300 ${tech.color}`} 
              />
              
              {/* The Brand Name */}
              <span className="text-sm font-semibold tracking-wide transition-colors duration-300 text-white/60 md:text-base">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroLoop;