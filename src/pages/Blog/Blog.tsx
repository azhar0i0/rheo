import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

import blogAi from '@/assets/blog-ai.jpg';
import blogRobot from '@/assets/blog-robot.jpg';
import blogNetwork from '@/assets/blog-network.jpg';
import cloudSolutions from '@/assets/cloud-solutions.jpg';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      category: "Workflow",
      readTime: "4 min read",
      image: blogAi,
      quote: "Discover the latest trends, tools, and techniques shaping today's digital landscape. From custom web development to mobile apps and SaaS platforms, our blog provides practical insights to help you stay ahead."
    },
    {
      category: "Engineering",
      readTime: "6 min read",
      image: blogRobot,
      quote: "Dive into a world of ideas, strategies, and stories behind successful software projects. Our blog explores design, development, and workflow processes, giving you practical guidance to create impactful experiences."
    },
    {
      category: "Future Tech",
      readTime: "5 min read",
      image: blogNetwork,
      quote: "Gain insights into cutting-edge development practices, workflow optimization, and platform strategies. Learn how to craft scalable, efficient, and user-centric software that drives innovation."
    },
    {
      category: "Cloud",
      readTime: "8 min read",
      image: cloudSolutions,
      quote: "Learn how to optimize workflows, build scalable solutions, and implement best practices in software development, mobile apps, and SaaS platforms to achieve measurable success and operational efficiency."
    }
  ];

  const works = [
    {
      name: 'FlowDesk',
      attributes: ['Secure', 'Intuitive'],
      tags: ['Fast', 'Scalable'],
      description: 'A productivity web platform'
    },
    {
      name: 'PulseApp',
      attributes: ['Reliable', 'Modern'],
      tags: ['Responsive', 'Smooth'],
      description: 'A cross-platform mobile application'
    },
    {
      name: 'CoreAPI',
      attributes: ['Efficient', 'Stable'],
      tags: ['Robust', 'Flexible'],
      description: 'A backend and integration system'
    },
    {
      name: 'CloudNest',
      attributes: ['Monitored', 'Optimized'],
      tags: ['Automated', 'Scalable'],
      description: 'A cloud and DevOps solution'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#1fb6ff]/30">

      <PageHeader
        title="The Rheo Intel"
        subtitle="Insights & Architecture"
        description="Ideas, stories, and strategies from the creative edge covering design, development, and the tools that bring bold digital work to life."
      />

      {/* --- EDITORIAL BLOG SECTION --- */}
      <section className="relative overflow-hidden py-24 md:py-40">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <div className="flex flex-col gap-32 md:gap-48">
            {blogPosts.map((post, index) => {
              const isEven = index % 2 === 0;

              return (
                <Link to="/blog-detail">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col items-center gap-12 lg:flex-row lg:gap-24"
                  >
                    {/* Image Half */}
                    <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl transition-all duration-700 group-hover:border-[#1fb6ff]/30 group-hover:shadow-[0_0_40px_rgba(31,182,255,0.15)] md:rounded-[3rem]">
                        <img
                          src={post.image}
                          alt="Blog insight"
                          className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                        {/* Glassmorphic Top Badge */}
                        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6ff] shadow-[0_0_10px_#1fb6ff]" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quote / Content Half */}
                    <div className={`relative flex w-full flex-col lg:w-1/2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      {/* Giant Watermark Quote Mark */}
                      <span className="pointer-events-none absolute -left-8 -top-16 text-[150px] font-serif leading-none text-white/5 transition-colors duration-500 group-hover:text-[#1fb6ff]/10 md:-left-12 md:-top-20 md:text-[200px]">
                        "
                      </span>

                      <div className="relative z-10">
                        <p className="mb-8 text-xl font-medium leading-relaxed text-gray-300 md:text-2xl lg:text-3xl lg:leading-[1.4]">
                          {post.quote}
                        </p>

                        <div className="flex items-center justify-between border-t border-white/10 pt-6 transition-colors duration-500 group-hover:border-[#1fb6ff]/30">
                          <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                            {post.readTime}
                          </span>
                          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-[#1fb6ff] group-hover:text-black">
                            <ArrowUpRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SWISS GRID WORKS SECTION --- */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#020202] py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b2fc9]/20 text-[10px] text-[#8b2fc9]">
                ⬤
              </span>
              <span className="text-sm font-bold tracking-widest text-[#8b2fc9] uppercase">
                Featured Architectures
              </span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              Engineered for scale.
            </h2>
          </motion.div>

          <div className="flex flex-col border-t border-white/10">
            {works.map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative grid cursor-pointer grid-cols-1 items-center gap-6 border-b border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-[1.5fr_1fr_1fr_auto] md:gap-12 md:py-12 px-4"
              >
                <div className="absolute left-0 top-0 h-full w-[2px] scale-y-0 bg-[#1fb6ff] transition-transform duration-300 group-hover:scale-y-100" />

                {/* 1. Project Name & Description */}
                <div className="flex flex-col">
                  <h4 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#1fb6ff] md:text-3xl">
                    {work.name}
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">
                    {work.description}
                  </p>
                </div>

                {/* 2. Attributes */}
                <div className="hidden flex-col md:flex">
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">Core</span>
                  <p className="text-sm font-medium text-gray-300">
                    {work.attributes.join(' · ')}
                  </p>
                </div>

                {/* 3. Tags */}
                <div className="hidden flex-col md:flex">
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">Specs</span>
                  <p className="text-sm text-gray-400">
                    {work.tags.join(' · ')}
                  </p>
                </div>

                {/* 4. Interactive Icon */}
                <div className="hidden md:flex justify-end">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-transparent transition-all duration-300 group-hover:border-[#1fb6ff]/50 group-hover:bg-[#1fb6ff]/10">
                    <ArrowUpRight className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1fb6ff]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;