import { motion } from 'framer-motion';

const WORKFLOW_DATA = [
    {
        tag: "Design",
        step: "01",
        title: "Crafting Intuitive, Engaging Digital Experiences",
        points: [
            { label: "Wireframing & Mockups:", text: "Visualizing layouts for seamless user flow." },
            { label: "UI/UX Design:", text: "Creating engaging interfaces with intuitive navigation." },
            { label: "Prototyping:", text: "Testing early concepts before development begins." },
            { label: "Responsive Design:", text: "Ensuring consistent experience across all devices." },
        ],
    },
    {
        tag: "Development",
        step: "02",
        title: "Turning Designs Into Functional Systems",
        points: [
            { label: "Front-End Development:", text: "Crafting visually dynamic and interactive interfaces." },
            { label: "Framework Selection:", text: "Choosing the best technologies for performance." },
            { label: "Coding Standards:", text: "Writing clean, maintainable, and scalable code." },
            { label: "Component Development:", text: "Building reusable UI elements for efficiency." },
        ],
    },
    {
        tag: "Integration",
        step: "03",
        title: "Structuring the Core of Applications",
        points: [
            { label: "Page Construction:", text: "Assembling layouts and navigation structure." },
            { label: "Module Development:", text: "Creating functional units for seamless operations." },
            { label: "Version Control:", text: "Managing updates and collaborative coding effectively." },
            { label: "Optimization:", text: "Improving performance for speed and reliability.", text: "Assembling layouts and navigation structure." },
        ],
    },
    {
        tag: "Backend",
        step: "04",
        title: "Powering Systems with Robust Infrastructure",
        points: [
            { label: "Client Review:", text: "Structuring data for efficiency and security." },
            { label: "API Development:", text: "Enabling communication between frontend and backend." },
            { label: "Server Configuration:", text: "Optimizing servers for stability and speed." },
            { label: "Security Implementation:", text: "Protecting applications against threats and breaches." },
        ],
    },
    {
        tag: "Integration",
        step: "05",
        title: "Connecting Systems for Seamless Operation",
        points: [
            { label: "Third-Party Services:", text: "Linking external tools and APIs." },
            { label: "Payment Gateways:", text: "Securely enabling financial transactions." },
            { label: "Authentication Systems:", text: "Managing user accounts and access control." },
            { label: "Automation Tools:", text: "Streamlining repetitive processes efficiently." },
        ],
    },
    {
        tag: "Launch",
        step: "06",
        title: "Ensuring Flawless Performance and Reliability",
        points: [
            { label: "Unit Testing:", text: "Verifying individual components function correctly." },
            { label: "System Testing:", text: "Checking overall system stability and performance." },
            { label: "Bug Fixing:", text: "Identifying and resolving errors promptly." },
            { label: "User Acceptance Testing:", text: "Ensuring product meets client expectations." },
        ],
    },
];

const WorkflowSection = () => {
    return (
        <section className="bg-black py-28">
            {/* Laptop view */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-[90%] mx-auto hidden md:block">

                {/* Header */}
                <div className="mb-24">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[#1fb6ff] text-[14px] tracking-wide">
                            ⬤ ‎ ‎ WorkFlow
                        </span>
                    </div>

                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[100px] leading-[1.15]">
                        Rheo Technologies SmartBuild Process
                    </h2>
                </div>

                {/* Workflow Rows */}
                {WORKFLOW_DATA.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        key={item.step}
                        className={`border-t border-[#1fb6ff]/40 py-20`}
                    >
                        <div
                            className="grid gap-20 mt-20"
                            style={{ gridTemplateColumns: "160px 1fr" }}
                        >

                            {/* Left Tag */}
                            <div>
                                <span className="inline-flex items-center justify-center px-6 py-2 rounded-full border text-[#1fb6ff] text-[14px]">
                                    {item.tag}
                                </span>
                            </div>

                            {/* Right Content */}
                            <div className="flex gap-20">
                                <span className="text-[#1fb6ff] text-4xl font-medium">
                                    {item.step}
                                </span>

                                <div>
                                    <h3 className="text-white text-[22px] font-semibold mb-6">
                                        {item.title}
                                    </h3>

                                    <ul className="space-y-3 text-white/60 text-[15px] leading-[1.7]">
                                        {item.points.map((point, idx) => (
                                            <li key={idx}>
                                                <span className="text-white">{point.label}</span>{" "}
                                                {point.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                ))}

            </motion.div>

            {/* Mobile Layout */}
            <div className="block w-full px-5 py-12 md:hidden relative">
                {/* Mobile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-[#1fb6ff]">
                            ⬤
                        </span>
                        <span className="text-xs font-bold tracking-widest text-[#1fb6ff] uppercase">
                            Workflow
                        </span>
                    </div>
                    <h2 className="text-3xl font-medium leading-[1.2] tracking-tight text-white">
                        Rheo SmartBuild <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1fb6ff] to-[#8b2fc9]">
                            Process.
                        </span>
                    </h2>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    <div className="absolute bottom-0 left-[15px] top-2 w-[2px] bg-gradient-to-b from-[#1fb6ff]/50 via-[#8b2fc9]/30 to-transparent" />

                    <div className="flex flex-col gap-10">
                        {WORKFLOW_DATA.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: -20, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    delay: 0.1
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="relative pl-12"
                            >
                                {/* Timeline Node */}
                                <div className="absolute left-[8px] top-6 flex h-[16px] w-[16px] items-center justify-center rounded-full">
                                    <div className="h-[6px] w-[6px] rounded-full bg-[#1fb6ff]" />
                                </div>

                                {/* The Card */}
                                <div className="group relative overflow-hidden border border-white/10 rounded-sm p-6">

                                    <span className="pointer-events-none absolute -bottom-6 right-4 text-[120px] font-black leading-none text-gray-300">
                                        {item.step}
                                    </span>

                                    {/* Glassmorphic Tag */}
                                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#1fb6ff]" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                                            {item.tag}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="relative z-10 mb-6 text-xl font-semibold leading-snug text-white">
                                        {item.title}
                                    </h3>

                                    {/* Points List */}
                                    <ul className="relative z-10 flex flex-col gap-3">
                                        {item.points.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-gray-400">
                                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#8b2fc9]" />
                                                <p>
                                                    <span className="font-medium text-gray-200">
                                                        {point.label}
                                                    </span>{" "}
                                                    {point.text}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;
