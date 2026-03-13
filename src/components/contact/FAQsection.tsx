import { motion } from 'framer-motion';
import FAQAccordion from '../FAQAccordion';

 const faqItems = [
    {
      question: 'What kind of services can I get from Rheo Technologies?',
      answer: 'Rheo Technologies offers comprehensive digital services including web development, mobile apps, UI/UX design, cloud solutions, DevOps automation, and full-stack development. We handle everything from MVPs to enterprise-level applications.'
    },
    {
      question: 'Can Rheo Technologies handle my project from start to finish?',
      answer: 'Yes, Rheo Technologies manages the entire process from planning and design to development, deployment, and ongoing support.'
    },
    {
      question: 'Do you build both web and mobile applications?',
      answer: 'Absolutely! We specialize in both web and mobile development, including cross-platform solutions using React Native and Flutter.'
    },
    {
      question: 'Can Rheo Technologies work with existing software or redesign my product?',
      answer: 'Yes, we can integrate with your existing software, perform redesigns, or build entirely new features on top of your current systems.'
    },
    {
      question: 'Will my software be scalable and secure?',
      answer: 'Security and scalability are core priorities. We implement best practices in security, use cloud-native architectures, and design systems that grow with your business.'
    },
    {
      question: 'Do you provide support after the project is launched?',
      answer: 'Yes, we offer ongoing maintenance, support packages, and continuous improvement services after launch.'
    }
  ];

export default function FAQsection() {
    
  return (
    <div>
      {/* FAQ Section */}
      <section className="py-20 pb-48">
        <div>
          <div className="faq-section px-8 md:px-12 rounded-3xl py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <p className="text-sm text-foreground/70 mb-2">(FAQ)</p>
              <h2 className="font-display text-3xl md:text-[60px] font-bold mb-2">
                Your Questions, Answered
              </h2>
              <p className="text-foreground/70">services that Rheo Technologies Provide</p>
            </motion.div>

            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </div>
  )
}
