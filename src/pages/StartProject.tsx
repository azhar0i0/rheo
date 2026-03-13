import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Footer from '@/components/Footer';
import contactIllustration from '@/assets/contact-illustration.png';
import FAQsection from '@/components/contact/FAQsection';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

// 1. Define initial state to make resetting easy
const initialFormState = {
  name: '',
  email: '',
  service: '',
  description: ''
};

const StartProject = () => {
  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    service?: string;
    description?: string;
  }>({});

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const navigate = useNavigate();

  const services = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Cloud Solutions',
    'DevOps & Automation',
    'Full Stack Development',
    'Other Services'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/rheotechnologies1@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.description,
          _subject: `New Project Inquiry: ${formData.service}`,
          _template: "table"
        })
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // 2. Clear the form data upon success
        setFormData(initialFormState);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      alert("There was an error sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const SuccessState = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="flex flex-col items-start justify-center py-12"
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
          <path d="M15 5L8 12L15 19" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>
      <motion.div
        variants={{
          hidden: { scale: 0, rotate: -20 },
          visible: {
            scale: 1,
            rotate: 0,
            transition: { type: "spring", stiffness: 200, damping: 15 }
          }
        }}
        className="mb-10 p-5 rounded-3xl bg-primary/5 border border-primary/20 relative group"
      >
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />

        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary relative z-10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13"></path>
          <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
        </svg>
      </motion.div>

      <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter leading-none">
        Inquiry <br />
        <span className="text-primary">Received.</span>
      </h2>

      <p className="text-muted-foreground text-lg md:text-xl max-w-sm mb-10 leading-relaxed">
        Your project details are now with our strategy team. We'll review everything and reach out you as soon as possible.
      </p>

      <button
        onClick={() => setIsSubmitted(false)}
        className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-white/50 hover:text-primary transition-colors uppercase"
      >
        <div className="w-8 h-[1px] bg-white/20 group-hover:bg-primary transition-colors" />
        Send another inquiry
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#000000]">

      {/* Desktop Form Section */}
      <section className="pt-24 pb-20 hidden md:block">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              inherit={false}
            >
              {!isSubmitted ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 5L8 12L15 19"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Back
                  </button>
                  <div className="mb-16">
                    <p className="text-primary text-sm">Rheo Technologies</p>
                    <h1 className="font-display text-[67px] font-bold">
                      <span className="text-foreground">Start your</span>{' '}
                      <span className="text-primary">Project</span>
                    </h1>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm text-foreground mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your Name"
                        className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />{errors.name && (
                        <p className="text-red-500 text-xs mt-2">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-foreground mb-2">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter the Email"
                        className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />{errors.email && (
                        <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                      )}
                    </div>

                    {/* Service Select */}
                    <div className="relative">
                      <label className="block text-sm text-foreground mb-2">What you need from us?</label>
                      <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full flex items-center justify-between bg-transparent border-b border-border pb-3 text-left"
                      >
                        <span className={formData.service ? 'text-foreground' : 'text-muted-foreground'}>
                          {formData.service || 'Select'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {errors.service && (
                        <p className="text-red-500 text-xs mt-2">{errors.service}</p>
                      )}

                      {isSelectOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute z-50 top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                        >
                          {services.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, service }));
                                setIsSelectOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left text-foreground hover:bg-secondary transition-colors"
                            >
                              {service}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm text-foreground mb-2">Project Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Type Here..."
                        rows={4}
                        className="w-full bg-transparent border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-xs mt-2">{errors.description}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      // 3. UPDATED CLASS: Removed md:w-auto, added md:min-w to prevent shrink
                      className="btn-primary w-full md:w-auto md:min-w-[200px] text-white hover:bg-[#87C296] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Project Query'}
                    </button>
                  </form>
                </>
              ) : (
                <SuccessState />
              )}
            </motion.div>

            {/* Contact Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex justify-end mt-24"
            >
              <div className="relative">
                <div>
                  <img
                    src={contactIllustration}
                    alt="Contact illustration"
                    className="w-120 h-120 object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Mobile Form Section */}
      <section className="block md:hidden pt-20 pb-24">
        <div className="mx-auto max-w-[92%]">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {!isSubmitted ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L8 12L15 19"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back
                </button>

                <div className="mb-12">
                  <p className="text-[#1fb6ff] text-xs tracking-widest uppercase mb-3">
                    Rheo Technologies
                  </p>

                  <h1 className="font-display text-3xl font-bold leading-tight text-white">
                    Start your
                    <br />
                    <span className="text-[#1fb6ff]">Project</span>
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-7">

                  {/* Name */}
                  <div>
                    <label className="block text-xs text-white/70 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#1fb6ff]"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-2">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-white/70 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#1fb6ff]"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                    )}
                  </div>

                  {/* Service Select */}
                  <div className="relative">
                    <label className="block text-xs text-white/70 mb-2">
                      What you need from us?
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      className="w-full flex items-center justify-between border-b border-white/20 pb-3 text-left"
                    >
                      <span className={formData.service ? 'text-white' : 'text-white/40'}>
                        {formData.service || 'Select a service'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-white/60 transition-transform ${isSelectOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {errors.service && (
                      <p className="text-red-500 text-xs mt-2">{errors.service}</p>
                    )}

                    {isSelectOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-50 left-0 right-0 mt-2 bg-black border border-white/10 rounded-xl overflow-hidden"
                      >
                        {services.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, service }));
                              setIsSelectOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/5 transition"
                          >
                            {service}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs text-white/70 mb-2">
                      Project Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your project..."
                      rows={4}
                      className="w-full bg-transparent border border-white/20 rounded-xl p-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#1fb6ff] resize-none"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-2">{errors.description}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-full bg-[#1fb6ff] py-4 text-sm font-semibold text-black transition hover:bg-[#7fd4ff] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Project Query'}
                  </button>
                </form>
              </>
            ) : (
              <SuccessState />
            )}
          </motion.div>

        </div>
      </section>

      {/* FAQ Section */}
      <FAQsection />

      <Footer />
    </div>
  );
};

export default StartProject;