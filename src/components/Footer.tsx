import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
//assets
import earthFooter from '@/assets/earth-footer.avif';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants : Variants ={
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <footer className="relative pt-24">
      {/* Earth Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.img
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          src={earthFooter}
          alt="Earth from space"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 section-container pt-40 pb-8"
      >
        {/* Navigation Links */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          <motion.div variants={itemVariants}>
            <h4 className="text-muted-foreground mb-4">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {['/', '/all-services', '/services', '/blog'].map((path, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    to={path}
                    className="text-foreground hover:text-primary transition-colors text-2xl font-bold"
                  >
                    {['About', 'Works', 'Services', 'Blog'][i]}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-muted-foreground mb-4">Social</h4>
            <nav className="flex flex-col gap-3">
              {['Twitter(X)', 'LinkedIn', 'Dribbble'].map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-foreground hover:text-primary transition-colors text-2xl font-bold"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30"
        >
          <p className="text-sm text-muted-foreground shadow-lg">
            © 2026 Rheo Technologies. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground shadow-lg">
            Pakistan {currentTime}
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors shadow-lg"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
