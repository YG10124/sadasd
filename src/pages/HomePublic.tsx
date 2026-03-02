import { ArrowRight, Users, Calendar, Sparkles } from 'lucide-react';
import RotatingHeadline from '@/components/home/RotatingHeadline';
import FloatingScienceGallery from '@/components/home/FloatingScienceGallery';

interface HomePublicProps {
    onNavigate: (page: string) => void;
    onSignIn: () => void;
}

export default function HomePublic({ onNavigate, onSignIn }: HomePublicProps) {
    // #region agent log
    if (typeof window !== 'undefined') fetch('http://127.0.0.1:7805/ingest/412aa953-0d13-4424-9bc9-75257ad8e06f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'5ab780'},body:JSON.stringify({sessionId:'5ab780',location:'HomePublic.tsx:10',message:'onSignIn prop',data:{onSignInDefined:typeof onSignIn==='function'},hypothesisId:'A',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return (
        <div className="space-y-8 lg:space-y-12">
            {/* ====== HERO SECTION ====== */}
            <section className="relative rounded-3xl overflow-hidden py-16 lg:py-24 px-6 lg:px-12" style={{ background: 'linear-gradient(145deg, var(--card) 0%, var(--card-alt) 100%)' }}>
                <FloatingScienceGallery />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                        style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)' }}>
                        <Sparkles size={14} />
                        Science-Powered Learning
                    </div>

                    <h1
                        className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-display)] leading-tight mb-4"
                        style={{ color: 'var(--text)' }}
                    >
                        Learn. Discover.{' '}
                        <span style={{ color: 'var(--brand)' }}>Grow.</span>
                    </h1>

                    <p className="text-base lg:text-lg mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Join live sessions, access curated resources, and collaborate with peers.
                        Your science-powered learning journey starts here.
                    </p>

                    {/* CTA Stack */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={onSignIn}
                            className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors min-h-[48px] shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: 'var(--brand)', color: '#FFFFFF' }}
                        >
                            Get Started Free
                            <ArrowRight size={16} />
                        </button>
                        <button
                            onClick={() => onNavigate('schedule')}
                            className="inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-xl text-sm transition-colors min-h-[48px] border"
                            style={{
                                borderColor: 'var(--border)',
                                color: 'var(--text)',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <Calendar size={16} />
                            See Current Sessions
                        </button>
                        <button
                            onClick={() => onNavigate('resources')}
                            className="inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-xl text-sm transition-colors min-h-[48px] border"
                            style={{
                                borderColor: 'var(--brand)',
                                color: 'var(--brand)',
                                backgroundColor: 'transparent',
                            }}s
                        >
                            Explore as Guest
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ====== ROTATING HEADLINE ====== */}
            <section className="py-4">
                <RotatingHeadline />
            </section>

            {/* ====== FEATURE CARDS ====== */}
            <section>
                <h2 className="text-center text-lg font-bold font-[family-name:var(--font-display)] mb-6" style={{ color: 'var(--text)' }}>
                    Why Learners Choose <span style={{ color: 'var(--brand)' }}>ScienceSpire</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {[
                        {
                            icon: Calendar, color: 'var(--brand)', colorBg: 'var(--brand-bg)',
                            title: 'Live Sessions', desc: 'Join tutors and study groups in real-time with interactive tools',
                        },
                        {
                            icon: Users, color: 'var(--success)', colorBg: 'var(--success-bg)',
                            title: 'Community', desc: 'Ask questions, share knowledge, and grow together with peers',
                        },
                        {
                            icon: Sparkles, color: 'var(--warning)', colorBg: 'var(--warning-bg)',
                            title: 'Science-Themed', desc: 'Explore STEM topics with beautifully curated resources',
                        },
                    ].map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl p-6 text-center transition-all hover:shadow-lg border"
                                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    style={{ backgroundColor: f.colorBg }}
                                >
                                    <Icon size={24} style={{ color: f.color }} />
                                </div>
                                <h3 className="font-semibold text-base mb-1 font-[family-name:var(--font-display)]" style={{ color: 'var(--text)' }}>
                                    {f.title}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ====== STATS BAR ====== */}
            <section className="rounded-2xl p-6 lg:p-8" style={{ backgroundColor: 'var(--brand)' }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
                    {[
                        { value: '1,200+', label: 'Active Learners' },
                        { value: '250+', label: 'Resources' },
                        { value: '50+', label: 'Weekly Sessions' },
                        { value: '4.8★', label: 'Average Rating' },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-display)]">{stat.value}</div>
                            <div className="text-sm opacity-80 mt-0.5">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ====== FINAL CTA ====== */}
            <section className="text-center py-8">
                <h2 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-display)] mb-3" style={{ color: 'var(--text)' }}>
                    Ready to start your learning journey?
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Join thousands of students already using ScienceSpire.
                </p>
                <button
                    onClick={onSignIn}
                    className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-sm transition-colors min-h-[48px] shadow-lg"
                    style={{ backgroundColor: 'var(--brand)', color: '#FFFFFF' }}
                >
                    Sign Up — It's Free
                    <ArrowRight size={16} />
                </button>
            </section>
        </div>
    );
}
