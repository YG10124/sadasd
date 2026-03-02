import { useState, useEffect, useRef } from 'react';

const headlines = [
    { topic: 'Quantum Physics', tagline: 'Explore the strange world of particles and waves' },
    { topic: 'Molecular Biology', tagline: 'Unravel the code of life inside every cell' },
    { topic: 'Astrophysics', tagline: 'Journey through galaxies, stars, and black holes' },
    { topic: 'Chemistry', tagline: 'Discover reactions that shape our world' },
    { topic: 'Mathematics', tagline: 'The universal language of patterns and logic' },
    { topic: 'Neuroscience', tagline: 'Map the billions of connections in your brain' },
    { topic: 'Ecology', tagline: 'Understand the web of life on Earth' },
];

export default function RotatingHeadline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Respect prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (prefersReducedMotion) return;

        intervalRef.current = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setActiveIndex(prev => (prev + 1) % headlines.length);
                setIsVisible(true);
            }, 400);
        }, 4000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [prefersReducedMotion]);

    const current = headlines[activeIndex];

    return (
        <div className="text-center min-h-[120px] flex flex-col items-center justify-center">
            <div
                className="transition-all duration-400"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                }}
            >
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
                    style={{
                        backgroundColor: 'var(--brand-bg)',
                        color: 'var(--brand)',
                    }}
                >
                    🔬 {current.topic}
                </div>
                <h2
                    className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-display)]"
                    style={{ color: 'var(--text)' }}
                >
                    {current.tagline}
                </h2>
            </div>

            {/* Dots indicator */}
            <div className="flex items-center gap-1.5 mt-4">
                {headlines.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setActiveIndex(i); setIsVisible(true); }}
                        className="rounded-full transition-all duration-300"
                        style={{
                            width: i === activeIndex ? 20 : 6,
                            height: 6,
                            backgroundColor: i === activeIndex ? 'var(--brand)' : 'var(--border)',
                        }}
                        aria-label={`Go to headline ${i + 1}: ${headlines[i].topic}`}
                    />
                ))}
            </div>
        </div>
    );
}
