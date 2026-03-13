import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  LayoutGrid,
  Smartphone,
  Server,
  Code2,
  Plug,
} from "lucide-react";
import { GrCloudSoftware } from "react-icons/gr";

const servicesData = [
  {
    title: "Web Development",
    description: "Modern, fast, and scalable websites and web applications.",
    icon: LayoutGrid,
    link: "/web-services",
  },
  {
    title: "Mobile App Development",
    description: "Mobile solutions crafted to inspire, engage, and provide user-friendly interfaces.",
    icon: Smartphone,
    link: "/app-services",
  },
  {
    title: "Backend Development",
    description: "Powerful systems behind the scenes, properly and professionally managed.",
    icon: Server,
    link: "/backend-services",
  },
  {
    title: "SaaS Model",
    description: "Cloud-ready SaaS products engineered to scale with your business and future needs.",
    icon: Code2,
    link: "/saas-services",
  },
  {
    title: "Custom Software",
    description: "Bespoke software solutions built specifically for efficiency and scale.",
    icon: GrCloudSoftware ,
    link: "/custom-software-services",
  },
  {
    title: "API & Integrations",
    description: "Systems that communicate seamlessly, perfectly, and professionally.",
    icon: Plug,
    link: "/api-integration-services",
  },
];

export default function ServicesSection() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const leftColumnVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-16 xl:grid-cols-[340px_1fr] items-start"
        >
          {/* LEFT CONTENT */}
          <motion.div variants={leftColumnVariants} className="md:sticky top-24">
            {/* Label */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs text-[#8b2fc9]">⬤</span>
              <span className="text-xs tracking-widest text-[#8b2fc9] uppercase font-semibold">
                Services
              </span>
            </div>

            {/* Heading */}
            <h2 className="mb-2 text-xl font-medium leading-tight text-white md:text-2xl">
              Our development services cover every stage of building modern software.
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-sm text-base leading-relaxed text-gray-400">
              From idea to launch, we develop software that scales, performs, and connects.
            </p>

            {/* Button */}
            <Link
              to="/all-services"
              className="group flex w-full max-w-sm items-center justify-between rounded-lg bg-[#0096C7] px-5 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#0289b6] hover:shadow-[0_0_20px_rgba(0,150,199,0.3)]"
            >
              <span>All Services</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} variants={cardVariants}>
                  <Link to={service.link} className="block h-full outline-none">
                    {/* The Card */}
                    <div className="group flex h-full min-h-[220px] flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 transition-all duration-300 hover:border-[#22d3ee]/40 hover:bg-white/[0.05]">
                      
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl text-[#06b6d4] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                        <Icon size={24} />
                      </div>

                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-[#22d3ee]">
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}