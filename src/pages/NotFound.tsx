import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Terminal } from 'lucide-react';

const NotFound = () => {
  // --- Parallax Mouse Tracking Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position between -1 and 1
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Apply spring physics so the movement feels heavy and premium, not jittery
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Map the normalized values to pixel translations
  const textX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const textY = useTransform(smoothY, [-1, 1], [-40, 40]);
  const glowX = useTransform(smoothX, [-1, 1], [-100, 100]);
  const glowY = useTransform(smoothY, [-1, 1], [-100, 100]);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* 1. Subtle Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      
      {/* 2. Interactive Glowing Orb that slightly follows the mouse */}
      <motion.div 
        style={{ x: glowX, y: glowY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="h-[50vh] w-[50vh] rounded-full bg-[#1fb6ff]/20 blur-[120px]" />
      </motion.div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        
        {/* The Massive Parallax 404 */}
        <div className="relative mb-8 flex items-center justify-center select-none pointer-events-none">
          <motion.h1 
            style={{ x: textX, y: textY }}
            className="text-[150px] font-black leading-none tracking-tighter md:text-[250px] lg:text-[300px]"
          >
            {/* Custom CSS text-stroke for that hollow, architectural look */}
            <span 
              className="text-transparent" 
              style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)' }}
            >
              404
            </span>
          </motion.h1>
          
          {/* Overlapping Solid Text for depth */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex items-center justify-center"
          >
             <span className="text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 blur-[2px] md:text-[250px] lg:text-[300px]">
              404
            </span>
          </motion.div>
        </div>

        {/* Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-20"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
              Signal Lost
            </span>
          </div>
          
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            We've searched the entire system.
          </h2>
          
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-gray-400">
            The node you're looking for has been moved, renamed, or never existed in the current architecture. Let's reroute you to safety.
          </p>
        </motion.div>

        {/* Interactive Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-20 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            to="/"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95 sm:w-auto"
          >
            <Home size={18} className="transition-transform group-hover:-translate-y-0.5" />
            Towards Home
          </Link>

          <Link
            to="/start-project"
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-[#1fb6ff]/50 hover:bg-[#1fb6ff]/10 sm:w-auto"
          >
            <Terminal size={18} className="text-gray-400 transition-colors group-hover:text-[#1fb6ff]" />
            Start a Project
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default NotFound;