import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  reverse?: boolean;
}

const ServiceCard = ({ title, description, image, tags, reverse = false }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center gap-12 border-t border-white/10 py-16 transition-colors duration-700 hover:bg-white/[0.02] lg:flex-row lg:gap-24 lg:py-24"
    >
      {/* puls icon on hover */}
      <Plus className="absolute -top-3 left-0 h-6 w-6 text-[#1fb6ff]/0 transition-opacity duration-500 group-hover:text-[#1fb6ff]/50" strokeWidth={1} />
      <Plus className="absolute -top-3 right-0 h-6 w-6 text-[#1fb6ff]/0 transition-opacity duration-500 group-hover:text-[#1fb6ff]/50" strokeWidth={1} />

      {/* --- CONTENT HALF --- */}
      <div className={`flex w-full flex-col lg:w-1/2 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        
        <div className="mb-8 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1fb6ff] transition-all duration-300 group-hover:border-[#1fb6ff]/30 group-hover:bg-[#1fb6ff]/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="mb-8 text-5xl font-bold leading-[0.9] tracking-tighter text-white transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#1fb6ff] md:text-6xl lg:text-[80px]">
          {title}
        </h2>

        {/* Relaxed, readable description */}
        <p className="mb-12 max-w-lg text-lg leading-relaxed text-gray-400 md:text-xl">
          {description}
        </p>

        {/* Creative CTA Button */}
        <Link 
          to="/start-project" 
          className="flex w-max items-center gap-4 outline-none"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 group-hover:text-[#1fb6ff]">
            Explore Service
          </span>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-transparent transition-all duration-500 group-hover:scale-110 group-hover:border-[#1fb6ff] group-hover:bg-[#1fb6ff]/10 group-hover:shadow-[0_0_20px_rgba(31,182,255,0.3)]">
            <ArrowUpRight className="h-6 w-6 text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#1fb6ff]" />
          </div>
        </Link>
      </div>

      {/* --- IMAGE HALF --- */}
      <div className={`w-full lg:w-1/2 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        
        <Link to="/start-project" className="relative block aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-white/5 bg-[#050505] transition-all duration-700 group-hover:border-[#1fb6ff]/30 group-hover:shadow-[0_0_40px_rgba(31,182,255,0.1)]">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          />

          {/* Blueprint Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1fb6ff0a_1px,transparent_1px),linear-gradient(to_bottom,#1fb6ff0a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />
          
          {/* Inner Vignette Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </Link>
        
      </div>
    </motion.div>
  );
};

export default ServiceCard;