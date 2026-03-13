import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function TextScroll() {
  const containerRef = useRef(null);
  
  const text = "Rheo turns complex workflows into smooth, manageable steps—planning, coding, and deploying with minimal friction so developers can focus on creating instead of troubleshooting.";
  
  const words = text.split(" ");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40,
    mass: 0.1
  });

  const totalChars = words.join("").length;
  let charCount = 0;

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] h-[250vh]">
      
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 md:px-12">
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="h-[40vh] w-[60vw] rounded-full bg-[#22d3ee]/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-center text-center">
          
          <p 
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            className="flex flex-wrap justify-center text-2xl font-medium leading-[1.4] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px]"
          >
            {words.map((word, wordIndex) => {
              const chars = word.split("");
              return (
                <span key={wordIndex} className="mr-[0.25em] inline-flex pb-1 md:pb-2">
                  {chars.map((char, charIndex) => {
                    const scrollWindow = 0.6;
                    const offsetStart = 0.2;
                    
                    const start = (charCount / totalChars) * scrollWindow + offsetStart;
                    const end = start + (scrollWindow / totalChars);
                    charCount++;
                    
                    return (
                      <Character 
                        key={charIndex} 
                        progress={smoothProgress}
                        range={[start, end]}
                      >
                        {char}
                      </Character>
                    );
                  })}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

const Character = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ['#333333', '#ffffff']);

  return (
    <span className="relative inline-block">
      {/* Dark gray baseline text */}
      <span className="absolute text-[#262626] pointer-events-none select-none">
        {children}
      </span>
      
      {/* Bright white revealing text */}
      <motion.span 
        style={{ opacity, color }} 
        className="relative will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
};