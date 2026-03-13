import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// Import images
import heroAbstract from '@/assets/hero-abstract.avif';
import webDevTeam from '@/assets/web-dev-team.jpg';
import mobileDev from '@/assets/mobile-dev.jpg';
import uiUxDesign from '@/assets/ui-ux-design.jpg';
import cloudSolutions from '@/assets/cloud-solutions.jpg';
import devops from '@/assets/devops.jpg';
import flowFunction from '@/assets/flow-function.jpg';
// UI Components
import Header from '@/components/LandingPageUI/Header';
import PressableButton from '@/components/ui/PressableButton';
import HeroLoop from '@/components/ui/HeroLoop';
import ProcedurePlan from '@/components/LandingPageUI/ProcedurePlan';
import DiscoverCards from '@/components/LandingPageUI/DiscoverCards';
import BlogSection from '@/components/LandingPageUI/BlogSection';
import OurWorks from '@/components/LandingPageUI/OurWorks';
import AboutServicesSection from '@/components/LandingPageUI/AboutServicesSection';
import WorkflowSection from '@/components/LandingPageUI/WorkflowSection';
import Footer from '@/components/Footer';
import TextScroll from '@/components/LandingPageUI/TextScroll';
import ServicesSection from './Services';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const Index = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* ========== NAVBAR ========== */}
      <Header />

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-20 md:pt-0">

        {/* Background layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={heroAbstract}
            alt=""
            role="presentation"
            className="h-full w-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/40" />
        </div>

        {/* Unified Content layer */}
        <div className="relative z-10 w-full mx-auto max-w-7xl px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-[92%] text-left md:max-w-4xl md:text-center"
          >
            {/* Eyebrow */}
            <motion.span
              variants={itemVariants}
              className="mb-4 inline-block text-xs font-semibold tracking-widest text-[#1fb6ff] uppercase md:text-sm"
            >
              Software Development Studio
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-7xl"
            >
              From architecture{" "}
              <br className="hidden md:block" />
              <span className="md:hidden">to deployment — </span>
              <span className="hidden md:inline">to deployment </span>
              <span className="inline-flex items-center gap-2 md:mt-2">
                <span className="hidden text-white/50 md:inline">—</span>
                <span className="text-[#1fb6ff]">flawlessly executed.</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[320px] text-base leading-relaxed text-white/70 md:mx-auto md:max-w-xl md:text-lg"
            >
              Full-service software development delivering web, mobile, cloud,
              and custom solutions — from concept to scale.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex justify-start md:justify-center"
            >
              <PressableButton />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== HERO LOOP ========== */}
      <HeroLoop />

      {/* ========== SERVICES SECTION ========== */}
      <ServicesSection />

      {/* ========== PROCEDURE PLAN SECTION ========== */}
      <ProcedurePlan />

      {/* ========== DISCOVER CARDS SECTION ========== */}
      <DiscoverCards />

      {/* ========== OUR WORKS SECTION ========== */}
      <OurWorks />

      {/* ========== Scrolling Text ========== */}
      <TextScroll />

      {/* ========== BLOG SECTION ========== */}
      <BlogSection />

      {/* ========== ABOUT SERVICES SECTION ========== */}
      <AboutServicesSection />

      {/* ========== WORKFLOW SECTION ========== */}
      <WorkflowSection />

      {/* ========== JOIN US SECTION ========== */}
      <section>
        {/* Laptop view */}
        <section className="bg-black pt-24 overflow-hidden hidden md:block">
          <div className="relative px-6">

            <div className="relative max-w-[520px] md:-translate-x-10">

              <div className="relative rounded-2xl border border-white/10 bg-black px-8 py-10 pl-[60px]">
                {/* Hide left border */}
                <div className="absolute left-0 top-0 h-full w-6 bg-black" />

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }} className="text-white text-[26px] font-semibold mb-4">
                  Join Us
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-white/70 text-[15px] leading-[1.7] max-w-[420px] mb-8">
                  Be part of a team that builds meaningful software with
                  clarity, creativity, and purpose.
                </motion.p>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-[#0b0b0b] border border-[#1f1f1f]
                    rounded-xl px-4 pr-28 py-4 text-[14px] text-white
                    placeholder:text-[#666] outline-none
                    focus:border-[#1fb6ff]/50"
                  />

                  <Link to="/start-project">
                    <button
                      className="absolute right-1 top-1 bottom-1
                      bg-[#0196c8] hover:bg-[#1fb6ff]
                      transition-colors text-white text-[14px] font-bold
                      px-10 rounded-md"
                    >
                      Enter
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Mobile view */}
        <section className="bg-black pt-20 md:pt-28 overflow-hidden block md:hidden">
          <div className="relative px-4 sm:px-6">

            {/* Wrapper */}
            <div className="
      relative
      mx-auto
      max-w-[520px]
      sm:-translate-x-4
      md:-translate-x-10
    ">

              {/* Card */}
              <div className="
        relative
        rounded-2xl
        border border-white/10
        bg-black
        px-6
        sm:px-8
        py-8
        sm:py-10
        pl-10
        sm:pl-[60px]
      ">
                {/* Hide left border */}
                <div className="absolute left-0 top-0 h-full w-4 sm:w-6 bg-black" />

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  viewport={{ once: true }}
                  className="
            text-white
            font-semibold
            text-xl
            sm:text-[26px]
            mb-3
            sm:mb-4
          "
                >
                  Join Us
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  viewport={{ once: true }}
                  className="
            text-white/70
            text-sm
            sm:text-[15px]
            leading-relaxed
            max-w-[420px]
            mb-6
            sm:mb-8
          "
                >
                  Be part of a team that builds meaningful software with
                  clarity, creativity, and purpose.
                </motion.p>

                {/* Input + CTA */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="
              w-full
              bg-[#0b0b0b]
              border border-[#1f1f1f]
              rounded-xl
              px-4
              py-4
              pr-24
              sm:pr-28
              text-sm
              text-white
              placeholder:text-[#666]
              outline-none
              focus:border-[#1fb6ff]/50
            "
                  />

                  <Link to="/start-project">
                    <button
                      className="
                absolute
                right-1
                top-1
                bottom-1
                rounded-lg
                bg-[#0196c8]
                px-6
                sm:px-8
                text-sm
                font-semibold
                text-white
                transition-colors
                hover:bg-[#1fb6ff]
                active:scale-95
              "
                    >
                      Enter
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      </section>

      {/* ========== FOOTER ========== */}
      <Footer />
    </div>
  );
};

export default Index;
