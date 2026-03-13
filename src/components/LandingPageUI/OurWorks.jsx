import { motion } from 'framer-motion';

export default function OurWorks() {
  return (
    <section className="bg-black text-white px-2 md:px-24 mt-24 mx-auto" style={{width:'90%'}}>
      {/* Header Line */}
      <div className="flex items-center gap-4 mb-24">
        <span className="text-sm text-gray-400">⬤ ‎  Works </span>
        <hr className="flex-1 h-px" />
      </div>
      {/* works data */}
      <div className="relative">
        <WorkRow
          title="SmartCity Dashboard"
          subtitle="Traffic Monitoring"
          tech="IoT Integrations, Modular data pipelines"
          focus="Optimizing urban infrastructure and city planning efficiency"
        />

        <WorkRow
          title="EduLearn Platform"
          subtitle="AI-powered progress tracking"
          tech="microservices, microservices"
          focus="Enhancing online learning and student engagement"
        />

        <WorkRow
          title="FinSecure Portal"
          subtitle="Secure digital transactions"
          tech="Encrypted database architecture"
          focus="Providing safe, reliable financial services to users"
        />

        <WorkRow
          title="TravelMate App"
          subtitle="Real-time itinerary updates"
          tech="Cloud-based backend"
          focus="Improving traveler experience and convenience"
        />
      </div>
    </section>
  );
}

function WorkRow({ title, subtitle, tech, focus }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="relative md:mt-24 mb-24">
      {/* Row Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-8 py-2 md:py-16">
        {/* Left */}
        <h3 className="w-1/3 p-4 text-xl lg:text-2xl font-bold">
          {title}
        </h3>

        {/* Middle */}
        <div className='w-1/3 p-4'>
          <p className="text-lg font-semibold">
            {subtitle}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {tech}
          </p>
        </div>

        {/* Right */}
        <p className="w-1/3 p-4 text-sm text-gray-400 leading-relaxed max-w-md">
          <span className="text-gray-500">Focus:</span> {focus}
        </p>
      </div>

      {/* FULL-WIDTH DIVIDER */}
      <div className="relative h-px bg-gray-200 md:mt-24 mt-8">
        <hr />
        {/* Circle */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2
                     w-5 h-5 rounded-full border border-white/30 bg-black"
        />
      </div>
    </motion.div>
  );
}
