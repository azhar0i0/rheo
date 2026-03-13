import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Assets
import pipelineImg from '@/assets/web-dev-team.jpg';
import codeGenImg from '@/assets/blog-ai.jpg';

export default function AboutServicesSection() {
  const [activeTab, setActiveTab] = useState('pipeline');

  const tabs = {
    pipeline: {
      id: 'pipeline',
      label: 'Streamlined Pipeline',
      image: pipelineImg,
      title: 'Streamlined Development Pipeline.',
      desc: 'Our streamlined pipeline ensures every project moves from idea to deployment with clarity and precision. Automated workflows, version control, CI/CD, and modular architecture keep development fast, predictable, and scalable.',
    },
    codegen: {
      id: 'codegen',
      label: 'Smart Code Generation',
      image: codeGenImg,
      title: 'Smart Code Generation Engine.',
      desc: 'Smart code generation accelerates development by transforming ideas and logic into clean, efficient code. It reduces repetitive work, improves consistency, and helps teams focus on solving real complex problems.',
    },
  };

  const current = tabs[activeTab];

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-12"
        >
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8b2fc9]/20 text-[8px] text-[#8b2fc9]">
              ⬤
            </span>
            <span className="text-xs font-semibold tracking-widest text-[#8b2fc9] uppercase">
              How We Do Everything
            </span>
          </div>

          <h2 className="max-w-3xl text-3xl font-medium leading-[1.2] tracking-tight text-white md:text-4xl">
            Multiple workflows to build, all powered by one engine{' '}
            <span className="text-white/40">working quietly in the background.</span>
          </h2>
        </motion.div>

        {/* Interactive Tabs */}
        <div className="relative mb-12 flex w-full overflow-x-auto scrollbar-hide md:mb-20">
          {/* Base border line */}
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10" />

          <div className="relative flex gap-8 md:gap-12">
            {Object.values(tabs).map((tab) => {
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative whitespace-nowrap pb-4 text-sm font-medium transition-colors duration-300 md:text-base ${
                    isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab.label}

                  {/* Animated Active Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="servicesTabUnderline"
                      className="absolute bottom-0 left-0 z-10 h-[2px] w-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[500px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20"
            >
              
              {/* Left: Image Box */}
              <div className="group relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
                <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/10]">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Inner shadow/gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Right: Text Content */}
              <div className="flex flex-col items-start">
                <h3 className="mb-6 text-3xl font-semibold leading-tight text-white md:text-4xl">
                  {current.title}
                </h3>
                
                <p className="mb-10 text-base leading-relaxed text-gray-400 md:text-lg">
                  {current.desc}
                </p>

                <Link
                  to="/all-services"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Discover More</span>
                  {/* Subtle hover sweep effect */}
                  <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-[#22d3ee] transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}