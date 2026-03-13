import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, ArrowLeft } from 'lucide-react';
import servicesHeader from '@/assets/services-header.webp';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

const PageHeader = ({ title, subtitle, description }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full bg-black">
      <div className="relative flex min-h-[60vh] w-full flex-col overflow-hidden">
        
        {/* --- CINEMATIC BACKGROUND --- */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={servicesHeader}
            alt="Header background"
            className="h-full w-full object-cover mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 md:hidden" />
        </div>

        {/* --- TOP NAVIGATION BAR --- */}
        <div className="relative z-20 flex w-full items-center justify-between p-6 md:p-10">
          
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={handleBack}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-white transition-transform group-hover:-translate-x-1" />
          </motion.button>

          {/* Search Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 active:scale-95"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
          </motion.button>
        </div>

        {/* --- MAIN CONTENT REVEAL --- */}
        <div className="relative z-10 flex flex-1 items-center md:justify-center px-4 md:px-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl text-left md:text-center"
          >
            {/* Title */}
            <motion.h1 
              variants={itemVariants}
              className="mb-2 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.h2 
                variants={itemVariants}
                className="mb-6 text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#1fb6ff] to-[#8b2fc9] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {subtitle}
              </motion.h2>
            )}

            {/* Description */}
            {description && (
              <motion.p 
                variants={itemVariants}
                className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:mx-auto md:text-lg lg:text-xl"
              >
                {description}
              </motion.p>
            )}

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="mt-10 md:mt-12">
              <button
                onClick={() => navigate('/start-project')}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
              >
                Start your project
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            </motion.div>

          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default PageHeader;