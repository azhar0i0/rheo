import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

// Assets
import discoverBg from '@/assets/discover-bg.jpg';
import phoneMockup from '@/assets/phone-mockup.png';

const cards = [
  {
    id: '01',
    title: 'Custom Web & App Development',
    subtitle: 'tailor-made web solutions',
    heading: 'Secure & Reliable',
    description:
      'Our backend solutions ensure fast, secure, and scalable systems that can handle complex business logic and high traffic efficiently.',
    properties: [
      'Fully Customizable Design',
      'Responsive Across Devices',
      'Scalable Architecture',
      'SEO & Performance Optimized',
    ],
  },
  {
    id: '02',
    title: 'UI / UX Design',
    subtitle: 'experience driven design',
    heading: 'Modern & Intuitive',
    description:
      'We craft visually stunning interfaces with user-first experiences that increase engagement and conversions.',
    properties: [
      'User-Centered Design',
      'Interactive Prototypes',
      'Design Systems',
      'Accessibility Ready',
    ],
  },
  {
    id: '03',
    title: 'Performance Optimization',
    subtitle: 'speed that converts',
    heading: 'Fast & Optimized',
    description:
      'We optimize load times, rendering, and architecture to deliver blazing-fast digital experiences.',
    properties: [
      'Core Web Vitals',
      'Code Splitting',
      'Image Optimization',
      'Caching Strategies',
    ],
  },
];

const Card = ({ card, index, progress, totalCards }) => {
  const isLast = index === totalCards - 1;
  const start = index * (1 / totalCards);
  const end = (index + 1) * (1 / totalCards);

  // Animation values
  const scaleRaw = useTransform(progress, [start, end - 0.10, end], [1, 1, isLast ? 1 : 0.8]);
  const opacityRaw = useTransform(progress, [start, end - 0.10, end], [1, 1, isLast ? 1 : 0]);
  const rotateRaw = useTransform(progress, [start, end - 0.10, end], [0, 0, isLast ? 0 : -5]);

  const springConfig = { stiffness: 500, damping: 60, mass: 0.01 };
  const scale = useSpring(scaleRaw, springConfig);
  const opacity = useSpring(opacityRaw, springConfig);
  const rotate = useSpring(rotateRaw, springConfig);

  return (
    <div className="h-[80vh] flex items-center justify-center sticky top-0 px-4">
      <motion.div
        style={{
          scale,
          opacity,
          rotate,
          top: `calc(5% + ${index * 25}px)`, 
        }}
        className="relative w-full max-w-6xl h-[65vh] md:h-[550px] rounded-[30px] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col"
      >
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none">
           <img 
             src={discoverBg} 
             alt="" 
             className="w-full h-full object-cover opacity-20" 
           />
        </div>

        {/* Card Content - Responsive Grid */}
        <div className="relative z-10 w-full h-full p-6 md:p-10 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 items-center">
          
          {/* Column 1: Title & ID */}
          <div className="flex flex-col justify-start md:justify-between h-full order-1">
             <div>
                <span className="text-xs md:text-sm font-mono text-red-500 mb-2 block">
                  {card.id} / 03
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white">
                  {card.title}
                </h3>
             </div>
             <div className="hidden md:block">
                <ul className="space-y-2">
                  {card.properties.map((prop, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {prop}
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Column 2: Image (Center) */}
          <div className="flex justify-center items-center order-3 md:order-2 h-[200px] md:h-full">
            <img 
              src={phoneMockup} 
              alt="Feature Mockup" 
              className="max-h-full w-auto object-contain drop-shadow-2xl" 
            />
          </div>

          {/* Column 3: Details */}
          <div className="flex flex-col justify-center order-2 md:order-3">
             <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-2">
               {card.subtitle}
             </p>
             <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">
               {card.heading}
             </h4>
             <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 md:line-clamp-none">
               {card.description}
             </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default function DiscoverCards() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container} className="relative bg-black mb-48">
      <div className="h-[20vh] md:h-[30vh] flex flex-col items-center justify-center text-center px-4 pt-10">
        <h2 className="text-red-500 font-bold tracking-[0.2em] text-xs uppercase mb-4">
          Our Capabilities
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
          Discover Our Top Services
        </h1>
      </div>

      {/* Cards Container */}
      <div className="relative w-full">
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            card={card}
            progress={scrollYProgress}
            totalCards={cards.length}
          />
        ))}
      </div>
    </main>
  );
}