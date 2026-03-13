import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
// assets
import blogAi from '@/assets/blog-ai.jpg';
import blogRobot from '@/assets/blog-robot.jpg';
import blogNetwork from '@/assets/blog-network.jpg';

export default function BlogSection() {
  const blogs = [
    {
      image: blogAi,
      tag: 'Workflows',
      time: '4 min read',
      title: 'Optimizing Workflow Efficiency',
      desc: 'Learn strategies to streamline business processes and software workflows. Reduce bottlenecks and enhance productivity.',
    },
    {
      image: blogRobot,
      tag: 'Architecture',
      time: '6 min read',
      title: 'Building Scalable SaaS Platforms',
      desc: 'Architecture, design patterns, and best practices for SaaS apps. Multi-tenant, cloud-ready, and built to scale.',
    },
    {
      image: blogNetwork,
      tag: 'Mobile Eng',
      time: '5 min read',
      title: 'Advanced Mobile App Techniques',
      desc: 'Performance optimization, cross-platform strategies, and modern mobile engineering approaches.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    },
  };

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[90%] ">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-6xl">
            <motion.div variants={itemVariants} className="mb-2 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b2fc9]/20 text-[10px] text-[#8b2fc9]">
                ⬤
              </span>
              <span className="text-sm font-bold tracking-widest text-[#8b2fc9] uppercase">
                The Rheo Intel
              </span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl font-medium leading-[1.2] tracking-tight text-white md:text-5xl lg:text-5xl">
              Channel futuristic force to innovate boldly, focus deeply, and achieve more.
            </motion.h2>
          </div>
        </motion.div>

        {/* The Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {blogs.map((blog, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Link
                to="/blog"
                className="group relative flex h-full flex-col overflow-hidden rounded-[32px] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Glassmorphic */}
                <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md transition-colors group-hover:border-[#22d3ee]/50">
                  <span className="h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" />
                  <span className="text-xs uppercase tracking-wider text-white">
                    {blog.tag}
                  </span>
                </div>

                {/* Image Container */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#111]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                  <div>
                    <h3 className="mb-4 text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#22d3ee]">
                      {blog.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">
                      {blog.desc}
                    </p>
                  </div>
                  
                  {/* Bottom Interactive Row */}
                  <div className="mt-8 flex items-end justify-end border-t border-white/5 pt-6 transition-colors group-hover:border-[#22d3ee]/20">
                    <span className="text-sm font-semibold text-white transition-colors group-hover:text-[#22d3ee]">
                      Read Article
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all group-hover:bg-[#22d3ee]/20">
                      <ArrowUpRight size={18} className="text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#22d3ee]" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}