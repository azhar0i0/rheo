import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Send, CheckCircle } from 'lucide-react';
import contactIllustration from '@/assets/contact-illustration.png';

const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Solutions",
  "Full-Stack Engineering"
];

export default function ContactForm() {
  const navigate = useNavigate();
  
  // State management
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', description: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const formVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] px-6 py-24 md:px-12 lg:py-32">
      
      {/* Subtle Ambient Background */}
      <div className="pointer-events-none absolute -left-[20%] top-0 h-[70vh] w-[70vw] rounded-full bg-[#1fb6ff]/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          
          {/* --- LEFT: FORM SECTION --- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className="relative z-10 w-full max-w-xl"
          >
            {/* Elegant Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="group mb-12 flex items-center gap-3 text-sm font-semibold tracking-wide text-gray-500 transition-colors hover:text-white outline-none"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:bg-white/10 group-active:scale-95">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </div>
              GO BACK
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col"
                >
                  <div className="mb-12">
                    <span className="mb-4 inline-block rounded-full border border-[#1fb6ff]/30 bg-[#1fb6ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1fb6ff]">
                      Rheo Technologies
                    </span>
                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                      Start your <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1fb6ff] to-[#8b2fc9]">Project.</span>
                    </h1>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    
                    {/* Floating Label Input: Name */}
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder=" " 
                        className="peer w-full rounded-2xl border border-white/10 bg-white/[0.02] px-6 pb-3 pt-7 text-white outline-none transition-all focus:border-[#1fb6ff]/50 focus:bg-white/[0.05]"
                      />
                      <label 
                        htmlFor="name"
                        className="pointer-events-none absolute left-6 top-5 text-gray-500 transition-all peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-[#1fb6ff] peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                      >
                        Your Name
                      </label>
                      {errors.name && <p className="mt-2 pl-4 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="peer w-full rounded-2xl border border-white/10 bg-white/[0.02] px-6 pb-3 pt-7 text-white outline-none transition-all focus:border-[#1fb6ff]/50 focus:bg-white/[0.05]"
                      />
                      <label 
                        htmlFor="email"
                        className="pointer-events-none absolute left-6 top-5 text-gray-500 transition-all peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-[#1fb6ff] peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                      >
                        Your Email
                      </label>
                      {errors.email && <p className="mt-2 pl-4 text-xs text-red-400">{errors.email}</p>}
                    </div>

                    {/* Custom Select Dropdown */}
                    <div className="relative z-50">
                      <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className={`flex w-full items-center justify-between rounded-2xl border border-white/10 px-6 py-5 text-left outline-none transition-all hover:bg-white/[0.04] ${isSelectOpen ? 'bg-white/[0.05] border-[#1fb6ff]/50' : 'bg-white/[0.02]'}`}
                      >
                        <span className={formData.service ? 'text-white' : 'text-gray-500'}>
                          {formData.service || 'What do you need from us?'}
                        </span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isSelectOpen ? 'rotate-180 text-[#1fb6ff]' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isSelectOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                          >
                            <div className="flex max-h-60 flex-col overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                              {services.map((service) => (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, service }));
                                    setIsSelectOpen(false);
                                  }}
                                  className="w-full rounded-xl px-4 py-3 text-left text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                  {service}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {errors.service && <p className="mt-2 pl-4 text-xs text-red-400">{errors.service}</p>}
                    </div>

                    {/* Floating Label Textarea */}
                    <div className="relative group">
                      <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder=" "
                        rows={4}
                        className="peer w-full resize-none rounded-2xl border border-white/10 bg-white/[0.02] px-6 pb-4 pt-7 text-white outline-none transition-all focus:border-[#1fb6ff]/50 focus:bg-white/[0.05]"
                      />
                      <label 
                        htmlFor="description"
                        className="pointer-events-none absolute left-6 top-5 text-gray-500 transition-all peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-[#1fb6ff] peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-400"
                      >
                        Project Description
                      </label>
                      {errors.description && <p className="mt-2 pl-4 text-xs text-red-400">{errors.description}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative mt-4 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-5 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 md:w-max md:min-w-[240px]"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Transmitting Data...' : 'Submit Project Query'}
                      </span>
                      {!isSubmitting && (
                        <Send className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                      {/* Sweeping hover gradient */}
                      <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-gradient-to-r from-[#1fb6ff] to-[#8b2fc9] transition-transform duration-300 group-hover:translate-y-0" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* --- BEAUTIFUL SUCCESS STATE --- */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-[3rem] border border-white/10 bg-white/[0.02] p-12 text-center backdrop-blur-md"
                >
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#1fb6ff]/20">
                    <CheckCircle className="h-12 w-12 text-[#1fb6ff]" />
                  </div>
                  <h3 className="mb-4 text-3xl font-bold text-white">Transmission Successful</h3>
                  <p className="mb-8 text-gray-400">
                    Your project query has been received by the Rheo team. We will analyze your requirements and reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="rounded-full border border-white/20 bg-transparent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* --- RIGHT: PARALLAX IMAGERY --- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex lg:h-full lg:items-center lg:justify-end"
          >
            <div className="relative w-full max-w-[600px]">
              <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
              <div className="absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 border-dashed animate-[spin_60s_linear_infinite]" />
              
              <img
                src={contactIllustration}
                alt="Digital Collaboration"
                className="relative z-10 w-full object-contain drop-shadow-[0_0_60px_rgba(31,182,255,0.2)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}