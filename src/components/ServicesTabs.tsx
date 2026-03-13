import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode } from "react-icons/fa6";

const tabs = [
    { id: 'plan', label: 'Plan' },
    { id: 'design', label: 'Design' },
    { id: 'build', label: 'Build' },
    { id: 'scale', label: 'Scale' },
];

const tabContent = {
    plan: {
        title: 'PLAN',
        sections: [
            {
                title: 'Strategy & Discovery',
                desc: 'Planning is the foundation of everything we build. This phase aligns vision, users, and technology before execution begins.'
            },
            {
                title: 'Product Goals',
                desc: 'We identify what success looks like, defining clear objectives and measurable outcomes'
            },
            {
                title: 'User Research',
                desc: 'Understanding user needs, behaviors, and pain points to guide meaningful decisions'
            },
            {
                title: 'Technical Planning',
                desc: 'Selecting the right technologies, architecture, and development approach.'
            },
            {
                title: 'Scope Definition',
                desc: 'Breaking ideas into achievable features, timelines, and priorities.'
            }
        ]
    },
    design: {
        title: 'DESIGN',
        sections: [
            {
                title: 'UI/UX Design',
                desc: 'Creating intuitive, visually compelling interfaces that delight users.'
            },
            {
                title: 'Wireframing',
                desc: 'Mapping out user flows and layouts before development begins.'
            },
            {
                title: 'Prototyping',
                desc: 'Building interactive prototypes to validate design decisions.'
            },
            {
                title: 'Design Systems',
                desc: 'Establishing consistent components and styling guidelines.'
            },
            {
                title: 'Accessibility',
                desc: 'Ensuring designs are usable by everyone, regardless of ability.'
            }
        ]
    },
    build: {
        title: 'BUILD',
        sections: [
            {
                title: 'Frontend Development',
                desc: 'Building responsive, performant user interfaces with modern frameworks.'
            },
            {
                title: 'Backend Development',
                desc: 'Creating robust APIs and server-side logic for your application.'
            },
            {
                title: 'Database Design',
                desc: 'Structuring data for optimal performance and scalability.'
            },
            {
                title: 'Integration',
                desc: 'Connecting third-party services and APIs seamlessly.'
            },
            {
                title: 'Testing',
                desc: 'Rigorous quality assurance to catch issues before launch.'
            }
        ]
    },
    scale: {
        title: 'SCALE',
        sections: [
            {
                title: 'Performance Optimization',
                desc: 'Fine-tuning for speed, efficiency, and user experience.'
            },
            {
                title: 'Infrastructure',
                desc: 'Cloud architecture designed for growth and reliability.'
            },
            {
                title: 'Monitoring',
                desc: 'Real-time tracking of performance and error detection.'
            },
            {
                title: 'Maintenance',
                desc: 'Ongoing support and updates to keep your product running smoothly.'
            },
            {
                title: 'Growth Support',
                desc: 'Helping you scale from MVP to enterprise-level solutions.'
            }
        ]
    }
};

function ServicesTabs() {
    const [activeTab, setActiveTab] = useState('plan');
    const currentContent = tabContent[activeTab as keyof typeof tabContent];

    return (
        <div>
            {/* ========== TABS SECTION ========== */}
            <section className="pb-12">
                <div className="max-w-[90%] mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* TAB CONTENT */}
                        <div className="md:col-span-2 bg-card rounded-xl p-6 md:p-8">

                            {/* Tab Navigation */}
                            <div className="relative flex gap-6 mb-10 border-b border-border">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className="relative pb-4"
                                        >
                                            {/* Tab Label */}
                                            <motion.span
                                                layout
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                className={`text-sm font-medium ${isActive
                                                    ? 'text-foreground'
                                                    : 'text-muted-foreground hover:text-foreground'
                                                    }`}
                                            >
                                                {tab.label}
                                            </motion.span>

                                            {/* Animated Underline */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="active-tab-underline"
                                                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary rounded-full"
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 400,
                                                        damping: 35,
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Animated Tab Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{
                                        duration: 0.35,
                                        ease: 'easeOut',
                                    }}
                                >
                                    <motion.h2
                                        layout
                                        className="font-display text-2xl font-extrabold text-primary mb-6"
                                    >
                                        {currentContent.title}
                                    </motion.h2>

                                    <motion.div
                                        layout
                                        className="space-y-6"
                                    >
                                        {currentContent.sections.map((section, index) => (
                                            <motion.div
                                                key={section.title}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                    duration: 0.3,
                                                    ease: 'easeOut',
                                                }}
                                            >
                                                <h3 className="font-display font-semibold text-foreground mb-2">
                                                    {section.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm leading-[1.6]">
                                                    {section.desc}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* SIDE INFO */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="bg-card rounded-xl p-4"
                            >
                                <p className="text-sm text-muted-foreground mb-1">
                                    Develop frontend, backend, and integrations.
                                </p>
                                <p className="text-foreground">Build</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="bg-card rounded-xl p-4"
                            >
                                <p className="text-sm text-muted-foreground mb-1">
                                    Deploy, optimize, and grow with confidence.
                                </p>
                                <p className=" flex items-center gap-2 text-foreground">
                                    <FaCode className='text-primary' />  Scale
                                </p>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServicesTabs;