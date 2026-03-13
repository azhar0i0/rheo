import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import heroAbstract from '@/assets/hero-abstract.avif';
import PressableButton from '../ui/PressableButton';

gsap.registerPlugin(SplitText);

export default function HeroSection() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const textTargets = gsap.utils.toArray('.split-text') as Element[];

            gsap.set(textTargets, { opacity: 1 });
            gsap.set('.cta-wrapper', { opacity: 1 });

            const split = new SplitText(textTargets, { type: "chars" });

            const tl = gsap.timeline({ delay: 0.1 });

            tl.from(split.chars, {
                y: 20,
                autoAlpha: 0,
                stagger: 0.015,
                duration: 0.6,
                ease: "power2.out",
            })
                .from('.cta-wrapper', {
                    y: 20,
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: "power2.out",
                }, "-=0.4");

            return () => split.revert();

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-20 md:pt-0"
        >

            {/* Background layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={heroAbstract}
                    alt=""
                    role="presentation"
                    className="h-full w-full object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/40" />
            </div>

            {/* Unified Content layer */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
                <div className="mx-auto max-w-[92%] text-left md:max-w-4xl md:text-center">

                    {/* Eyebrow */}
                    <span className="split-text mb-4 inline-block text-xs font-semibold tracking-widest text-[#1fb6ff] uppercase opacity-0 md:text-sm">
                        Software Development Studio
                    </span>

                    {/* Headline */}
                    <h1 className="split-text font-display text-3xl font-bold leading-[1.1] tracking-tight text-white opacity-0 md:text-4xl lg:text-6xl">
                        From architecture to deployment
                        <span className="inline-flex items-center gap-2 md:mt-2">
                            <span className="hidden text-white/50 md:inline">—</span>
                            <span className="text-[#1fb6ff]">flawlessly executed.</span>
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="split-text mt-6 max-w-[320px] text-base leading-relaxed text-white/70 opacity-0 md:mx-auto md:max-w-xl md:text-lg">
                        Full-service software development delivering web, mobile, cloud,
                        and custom solutions from concept to scale.
                    </p>

                    {/* CTA */}
                    <div className="cta-wrapper mt-10 flex justify-start opacity-0 md:justify-center">
                        <PressableButton />
                    </div>

                </div>
            </div>
        </section>
    );
}