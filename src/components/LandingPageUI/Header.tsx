import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/rheo-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Services", path: "/all-services", id: "01" },
    { name: "Works", path: "/works", id: "02" },
    { name: "Blog", path: "/blog", id: "03" },
  ];

  const menuVariants : Variants = {
    closed: { 
      opacity: 0,
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    },
    open: { 
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const linkVariants : Variants = {
    closed: { y: 40, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <>
      <header 
        className={`fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-500 ${
          scrolled || isOpen ? "py-2" : "py-4"
        }`}
      >
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className={`relative flex items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled || isOpen 
              ? "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-16 px-6" 
              : "border-transparent bg-transparent h-20 px-2"
          }`}>
            
            {/* Logo Group */}
            <Link to="/" className="group relative z-50 flex items-center gap-1">
              <img
                src={logo}
                alt="Rheo Technologies"
                className="h-8 w-8 object-contain transition-transform duration-500 group-hover:rotate-12 md:h-10 md:w-10"
              />
              <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                heo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-5 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {/* Subtle hover effect */}
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 z-0 scale-50 rounded-full bg-white/5 opacity-0 transition-all duration-300 hover:scale-100 hover:opacity-100" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                to="/start-project"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
              >
                <span>Start Project</span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={12} />
                </div>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/10 bg-white/5 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-5 bg-white transition-transform"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                className="h-[2px] w-5 bg-white transition-all"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-5 bg-white transition-transform"
              />
            </button>

          </div>
        </div>
      </header>

      {/* --- CINEMATIC MOBILE FULL-SCREEN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[90] flex h-[100svh] w-full flex-col bg-[#050505]/95 px-6 pt-32 pb-12 backdrop-blur-2xl md:hidden"
          >
            {/* Huge Menu Links */}
            <nav className="flex flex-1 flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                >
                  <Link
                    to={link.path}
                    className="group flex items-end gap-4 border-b border-white/10 pb-4 text-4xl font-light tracking-tight text-white transition-colors hover:text-[#1fb6ff]"
                  >
                    <span className="text-sm font-mono text-gray-500 mb-2">
                      {link.id}
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Mobile Footer Area */}
            <motion.div 
              custom={3}
              variants={linkVariants}
              className="flex flex-col gap-8"
            >
              <div className="flex gap-6 text-sm font-medium text-gray-400">
                <a href="#" className="hover:text-white">Twitter</a>
                <a href="#" className="hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-white">Dribbble</a>
              </div>

              <Link
                to="/start-project"
                className="group flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-[#1fb6ff] to-[#0096C7] p-6 text-xl font-semibold text-white transition-transform active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;