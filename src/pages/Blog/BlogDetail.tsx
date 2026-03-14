import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin } from 'lucide-react';
//assets
import coverImg from '@/assets/blog-ai.jpg'; 
import authorAvatar from '@/assets/cloud-solutions.jpg';

export default function BlogDetail() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // --- Scroll Physics ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ['0%', '50%']);
  const heroOpacity = useTransform(scrollY, [0, 500], [0.6, 0]);

  return (
    <article ref={containerRef} className="relative min-h-screen bg-[#050505] selection:bg-[#1fb6ff]/30">
      
      {/* --- SCROLL PROGRESS BAR --- */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#1fb6ff] to-[#8b2fc9]"
        style={{ scaleX }}
      />

      {/* --- FLOATING BACK BUTTON --- */}
      <div className="fixed left-6 top-8 z-40 hidden md:block">
        <button
          onClick={() => navigate(-1)}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:border-[#1fb6ff]/50 hover:bg-[#1fb6ff]/10 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5 text-white transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      {/* --- CINEMATIC PARALLAX HERO --- */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-black">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img
            src={coverImg}
            alt="Blog Cover"
            className="h-full w-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        </motion.div>

        {/* Hero Content aligned to the bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-24 md:px-12">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Monospace Metadata for a "Technical" vibe */}
              <div className="mb-8 flex flex-wrap items-center gap-5 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase font-mono">
                <span className="rounded-sm border border-[#1fb6ff]/30 bg-[#1fb6ff]/10 px-3 py-1 text-[#1fb6ff]">
                  Architecture
                </span>
                <span className="flex items-center gap-1.5"><Calendar size={12} /> Mar 14, 2026</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> 6 Min Read</span>
              </div>
              
              {/* Aggressive, massive sans-serif title */}
              <h1 className="mb-10 font-sans text-5xl font-black leading-[0.95] tracking-tighter text-white md:text-7xl lg:text-[80px]">
                Optimizing Workflow Efficiency in Modern SaaS Platforms.
              </h1>

              {/* Author Badge */}
              <div className="flex items-center gap-4">
                <img src={authorAvatar} alt="Author" className="h-14 w-14 rounded-full border border-white/20 object-cover" />
                <div>
                  <p className="font-sans text-lg font-bold tracking-tight text-white">Ahmed Zahoor</p>
                  <p className="font-mono text-xs tracking-widest text-[#1fb6ff] uppercase mt-0.5">Senior Systems Architect</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- EDITORIAL CONTENT SECTION --- */}
      <div className="relative z-20 -mt-10 rounded-t-[3rem] bg-[#050505] px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[1fr_200px]">
          
          {/* Main Reading Column - Injected Serif font for high-end readability */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-3xl prose-p:font-serif prose-p:text-lg lg:prose-p:text-xl prose-p:leading-[1.8] prose-p:text-gray-300 prose-headings:font-sans prose-headings:tracking-tight prose-headings:text-white prose-a:text-[#1fb6ff] prose-a:no-underline hover:prose-a:underline"
          >
            <p className="first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:font-sans first-letter:text-7xl first-letter:font-black first-letter:leading-none first-letter:text-[#1fb6ff]">
              The digital landscape is shifting rapidly. As we build more complex, scalable architectures, the bottleneck is rarely the hardware anymore—it's the workflow. How do engineering teams move from concept to deployment without burning out or breaking the system?
            </p>

            <h2 className="mt-20 text-3xl font-bold tracking-tight md:text-4xl">The Anatomy of a Flawless Pipeline</h2>
            <p>
              When we built the core infrastructure for our latest product, we realized that relying on fragmented tools was causing massive cognitive load. Developers were context-switching between Jira, GitHub, Vercel, and Slack just to push a single feature.
            </p>

            {/* Editorial Serif Pull Quote */}
            <div className="relative my-20 py-8 md:px-10">
              <span className="absolute -left-2 -top-12 font-serif text-[140px] leading-none text-white/5 md:-left-6">"</span>
              <p className="relative z-10 font-serif text-3xl italic leading-[1.3] text-white/90 md:text-4xl">
                The best infrastructure is invisible. It should feel like writing code on a blank canvas, not assembling an engine mid-flight.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-[2px] w-12 bg-[#1fb6ff]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1fb6ff]">Rheo Engineering Principle</span>
              </div>
            </div>

            <p>
              To solve this, we implemented a unified deployment architecture. By leveraging smart code generation and automated CI/CD protocols, we removed the friction. The result? A 40% reduction in deployment time and a significantly happier engineering team.
            </p>

            <h3 className="mt-16 text-2xl font-bold tracking-tight">Moving Forward</h3>
            <p>
              If your team is struggling with velocity, don't look at their output first. Look at their tools. Streamlining the workflow is the single highest-ROI investment a tech company can make today.
            </p>
          </motion.div>

          {/* Sticky Share Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Share Article
              </span>
              <div className="flex flex-col gap-4">
                <button className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[#1fb6ff] hover:bg-[#1fb6ff]/10 hover:text-[#1fb6ff]">
                  <Twitter className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#1fb6ff]" />
                </button>
                <button className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[#0a66c2] hover:bg-[#0a66c2]/10 hover:text-[#0a66c2]">
                  <Linkedin className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#0a66c2]" />
                </button>
                <button className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-white/30 hover:bg-white/10">
                  <Share2 className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- NEXT ARTICLE FOOTER --- */}
      <div className="border-t border-white/10 bg-[#020202] px-6 py-32 md:px-12 text-center">
        <span className="mb-6 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Index // All Blogs</span>
        <Link to="/blog" className="group inline-block">
          <h2 className="font-sans text-5xl font-black tracking-tighter text-white transition-colors duration-300 group-hover:text-[#1fb6ff] md:text-7xl">
            Read all Transmissions.
          </h2>
          <div className="mx-auto mt-12 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:border-[#1fb6ff] group-hover:bg-[#1fb6ff]/10">
            <ArrowLeft className="h-8 w-8 rotate-180 text-white transition-colors group-hover:text-[#1fb6ff]" />
          </div>
        </Link>
      </div>

    </article>
  );
}