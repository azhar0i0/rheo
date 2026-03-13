import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// Make sure your image is imported correctly
import heroAbstract from '@/assets/contact-illustration.png';

const ProcedurePlan = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Rheo Vision: Strategizing Next-Gen Workflows',
      desc: 'Planning adaptive, scalable workflows for tomorrow’s digital challenges. We analyze your core infrastructure to build a resilient foundation.',
      image: heroAbstract,
    },
    {
      title: 'Rheo Architecture: Building Intelligent Systems',
      desc: 'Designing AI-powered, modular systems that optimize operations seamlessly. Every component is engineered for maximum performance and security.',
      image: heroAbstract, // Ideally, pass different images here to see the AnimatePresence effect
    },
    {
      title: 'Rheo Impact: Delivering Scalable Solutions',
      desc: 'Deploying workflows that drive measurable results and business growth. Transition from architecture to execution with zero friction.',
      image: heroAbstract,
    },
  ];

  // --- Variants for Scroll Animation Orchestration ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-7xl px-6 md:px-8"
      >
        {/* Top Header Section */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-12 max-w-3xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[10px] text-[#8b2fc9]">⬤</span>
            <span className="text-sm font-semibold tracking-widest text-[#8b2fc9] uppercase">
              Plan. Build. Deploy.
            </span>
          </div>

          <h2 className="text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
            Rheo plannings Building, <br className="hidden md:block" />
            <span className="text-white/40">to deployment.</span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          
          {/* LEFT: Interactive Step List */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isLast = index === steps.length - 1;

              return (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`group relative cursor-pointer pl-8 md:pl-10 ${
                    isLast ? '' : 'pb-12' // Replaces gap/space-y for better line tracking
                  }`}
                >
                  {/* The Background Track Line */}
                  <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-white/10" />

                  {/* The Animated Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepIndicator"
                      className="absolute bottom-0 left-0 top-0 w-[2px] bg-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Content */}
                  <div className="transition-transform duration-300 ease-out group-hover:translate-x-2">
                    <h3
                      className={`mb-3 text-xl font-medium leading-snug transition-colors duration-300 md:text-2xl ${
                        isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {step.title}
                    </h3>
                    
                    {/* Animate Height of description so it collapses when inactive (Optional, but highly premium) */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="max-w-md overflow-hidden text-base leading-relaxed text-[#9ca3af]"
                        >
                          <span className="block pt-2">{step.desc}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Visual Showcase */}
          <motion.div 
            variants={itemVariants}
            className="order-1 lg:order-2 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep}
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default ProcedurePlan;