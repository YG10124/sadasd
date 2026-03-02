import { useState } from 'react';
import {
    Search, Filter, X, Play, FileText, Zap, Layers,
    Clock, Star, User, ChevronRight, Download,
    Heart, Share2, MessageSquare, Bookmark, Grid, List, BookOpen, CheckCircle2
} from 'lucide-react';
import { useLocalStore } from '@/store/useLocalStore';

interface ResourcesPageProps {
    searchQuery?: string;
    onSearchChange?: (q: string) => void;
}

export default function ResourcesPage({ searchQuery: searchProp = '', onSearchChange }: ResourcesPageProps) {
    const { savedItems, likedItems, toggleSaved, toggleLiked, markReviewed, reviewedItems, addNotification } = useLocalStore();
    const [localSearch, setLocalSearch] = useState('');
    const searchQuery = onSearchChange !== undefined ? searchProp : localSearch;
    const setSearchQuery = (q: string) => onSearchChange ? onSearchChange(q) : setLocalSearch(q);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedResource, setSelectedResource] = useState<number | null>(null);
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState<'content' | 'discussion' | 'related'>('content');
    const [toastMsg, setToastMsg] = useState<string | null>(null);

    const typeConfig: Record<string, { icon: typeof Play; color: string; label: string }> = {
        video: { icon: Play, color: 'var(--brand)', label: 'Video' },
        quiz: { icon: Zap, color: 'var(--success)', label: 'Quiz' },
        pdf: { icon: FileText, color: 'var(--warning)', label: 'PDF' },
        interactive: { icon: Layers, color: 'var(--info)', label: 'Interactive' },
    };

    const resources = [
        { id: 1, title: 'Introduction to Calculus: Limits and Derivatives', type: 'video', subject: 'Math', difficulty: 'Intermediate', duration: '25 min', rating: 4.8, ratingCount: 124, uses: 892, creator: 'Dr. Sarah Chen', description: 'A comprehensive introduction to limits and their application to finding derivatives.', savedCount: 56, hasQuiz: true },
        { id: 2, title: 'Chemistry Lab Safety Quiz', type: 'quiz', subject: 'Science', difficulty: 'Beginner', duration: '10 min', rating: 4.6, ratingCount: 89, uses: 534, creator: 'Prof. James Park', description: 'Test your knowledge of lab safety procedures.', savedCount: 32, hasQuiz: false },
        { id: 3, title: 'Essay Writing: Structure & Arguments', type: 'pdf', subject: 'English', difficulty: 'All Levels', duration: '15 min read', rating: 4.7, ratingCount: 67, uses: 421, creator: 'Ms. Emily Woods', description: 'Guide to structuring persuasive essays.', savedCount: 78, hasQuiz: true, fileSize: '2.4 MB' },
        { id: 4, title: 'Interactive World History Timeline', type: 'interactive', subject: 'History', difficulty: 'All Levels', duration: '20 min', rating: 4.9, ratingCount: 156, uses: 1203, creator: 'Mr. David Kim', description: 'Explore major world events with this interactive timeline.', savedCount: 112, hasQuiz: true },
        { id: 5, title: 'Physics Formulas Cheat Sheet', type: 'pdf', subject: 'Physics', difficulty: 'All Levels', duration: '5 min read', rating: 4.5, ratingCount: 201, uses: 1567, creator: 'Alex M. (Student)', description: 'All essential physics formulas organized by topic.', savedCount: 189, hasQuiz: false, fileSize: '1.1 MB' },
        { id: 6, title: 'Cell Biology: Mitosis & Meiosis', type: 'video', subject: 'Science', difficulty: 'Beginner', duration: '18 min', rating: 4.7, ratingCount: 93, uses: 678, creator: 'Prof. James Park', description: 'Visual walkthrough of cell division processes.', savedCount: 45, hasQuiz: true },
    ];

    const filtered = resources.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.creator.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 3000);
    };

    // Detail view
    if (selectedResource !== null) {
        const res = resources.find(r => r.id === selectedResource);
        if (!res) return null;
        const typeInfo = typeConfig[res.type];
        const TypeIcon = typeInfo.icon;
        const isSaved = savedItems.includes(`resource-${res.id}`);
        const isLiked = likedItems.includes(`resource-${res.id}`);
        const isReviewed = reviewedItems.includes(`resource-${res.id}`);

        return (
            <div className="space-y-6">
                <button
                    onClick={() => setSelectedResource(null)}
                    className="inline-flex items-center gap-2 text-sm font-medium min-h-[44px] underline"
                    style={{ color: 'var(--brand)' }}
                >
                    ← Back to Resources
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                            <div className="aspect-video flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, var(--bg), var(--card-alt))` }}>
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg" style={{ backgroundColor: 'var(--brand)', opacity: 0.9 }}>
                                        <TypeIcon size={28} className="text-white" />
                                    </div>
                                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{typeInfo.label} Content</p>
                                </div>
                            </div>
                            <div className="p-5">
                                <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{res.title}</h1>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="flex items-center gap-1"><User size={14} /> {res.creator}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {res.duration}</span>
                                    <span className="flex items-center gap-1"><Star size={14} className="fill-[#D97706] text-[#D97706]" /> {res.rating} ({res.ratingCount})</span>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{res.description}</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="rounded-xl border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                            <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
                                {(['content', 'discussion', 'related'] as const).map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className="px-4 py-3 text-sm font-medium border-b-2 min-h-[44px] capitalize transition-colors"
                                        style={{
                                            borderColor: activeTab === tab ? 'var(--brand)' : 'transparent',
                                            color: activeTab === tab ? 'var(--brand)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="p-5">
                                {activeTab === 'content' && (
                                    <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        <p>This resource covers the fundamentals with interactive examples and practice opportunities.</p>
                                        {res.hasQuiz && (
                                            <div className="p-3 border rounded-lg flex items-center gap-3" style={{ backgroundColor: 'var(--success-bg)', borderColor: 'var(--success)' }}>
                                                <Zap size={18} style={{ color: 'var(--success)' }} />
                                                <div className="flex-1">
                                                    <p className="font-medium" style={{ color: 'var(--text)' }}>Practice Quiz Available</p>
                                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Test your understanding</p>
                                                </div>
                                                <button
                                                    className="ml-auto px-3 py-2 text-xs font-semibold rounded-lg min-h-[36px]"
                                                    style={{ backgroundColor: 'var(--success)', color: '#FFFFFF' }}
                                                    onClick={() => showToast('🧪 Quiz started!')}
                                                >
                                                    Take Quiz
                                                </button>
                                            </div>
                                        )}
                                        {!isReviewed && (
                                            <button
                                                onClick={() => { markReviewed(`resource-${res.id}`); showToast('✅ Marked as reviewed!'); }}
                                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border min-h-[44px]"
                                                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                                            >
                                                <CheckCircle2 size={16} /> Mark as Reviewed
                                            </button>
                                        )}
                                        {isReviewed && (
                                            <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--success)' }}>
                                                <CheckCircle2 size={16} /> Reviewed
                                            </span>
                                        )}
                                    </div>
                                )}
                                {activeTab === 'discussion' && (
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: 'var(--brand-bg)', color: 'var(--brand)' }}>M</div>
                                                <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>Maria L.</span>
                                                <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>2 days ago</span>
                                            </div>
                                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Really helpful explanation!</p>
                                        </div>
                                        <button
                                            className="w-full p-3 border border-dashed rounded-lg text-sm font-medium min-h-[44px]"
                                            style={{ borderColor: 'var(--border)', color: 'var(--brand)' }}
                                            onClick={() => showToast('💬 Comment form opened!')}
                                        >
                                            + Add a comment
                                        </button>
                                    </div>
                                )}
                                {activeTab === 'related' && (
                                    <div className="space-y-2">
                                        {resources.filter(r => r.id !== res.id).slice(0, 3).map(r => {
                                            const ti = typeConfig[r.type];
                                            const TI = ti.icon;
                                            return (
                                                <button key={r.id} onClick={() => setSelectedResource(r.id)} className="w-full flex items-center gap-3 p-3 rounded-lg text-left min-h-[48px]" style={{ color: 'var(--text)' }}>
                                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--brand-bg)' }}>
                                                        <TI size={16} style={{ color: ti.color }} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{r.title}</div>
                                                        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{r.duration} · {ti.label}</div>
                                                    </div>
                                                    <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-4">
                        <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                            <div className="flex flex-col gap-2 mt-2">
                                <button
                                    onClick={() => { toggleSaved(`resource-${res.id}`); showToast(isSaved ? '🔖 Removed from playlist' : '🔖 Added to playlist!'); }}
                                    className="w-full inline-flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-xl text-sm min-h-[48px] transition-colors"
                                    style={{ backgroundColor: isSaved ? 'var(--warning)' : 'var(--brand)', color: '#FFFFFF' }}
                                >
                                    <Bookmark size={16} fill={isSaved ? '#FFFFFF' : 'none'} /> {isSaved ? 'In Playlist' : 'Add to Playlist'}
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { toggleLiked(`resource-${res.id}`); showToast(isLiked ? '💔 Unliked' : '❤️ Liked!'); }}
                                        className="flex-1 inline-flex items-center justify-center gap-1 border font-medium px-3 py-2.5 rounded-xl text-xs min-h-[44px]"
                                        style={{
                                            borderColor: isLiked ? 'var(--error)' : 'var(--border)',
                                            color: isLiked ? 'var(--error)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} /> {isLiked ? 'Liked' : 'Like'}
                                    </button>
                                    <button
                                        className="flex-1 inline-flex items-center justify-center gap-1 border font-medium px-3 py-2.5 rounded-xl text-xs min-h-[44px]"
                                        style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                                        onClick={() => showToast('🔗 Link copied to clipboard!')}
                                    >
                                        <Share2 size={14} /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {toastMsg && (
                    <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
                        <div className="px-5 py-3 rounded-xl shadow-lg text-sm font-medium" style={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}>{toastMsg}</div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-display)]" style={{ color: 'var(--text)' }}>Resources</h1>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Browse lessons, videos, quizzes, and downloads</p>
            </div>

            {/* Search & Controls */}
            <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search by title, subject, or creator..."
                            aria-label="Search resources"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border min-h-[44px] focus:outline-none"
                            style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderColor: 'transparent' }}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} aria-label="Clear search">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium min-h-[44px] transition-colors border"
                            style={{
                                backgroundColor: showFilters ? 'var(--brand)' : 'var(--card)',
                                color: showFilters ? '#FFFFFF' : 'var(--text)',
                                borderColor: showFilters ? 'var(--brand)' : 'var(--border)',
                            }}
                        >
                            <Filter size={16} /> Filters
                        </button>
                        <div className="hidden sm:flex rounded-lg p-1" style={{ backgroundColor: 'var(--bg)' }}>
                            <button onClick={() => setViewType('grid')} className="p-2 rounded-md min-w-[36px] min-h-[36px] flex items-center justify-center" style={{ backgroundColor: viewType === 'grid' ? 'var(--card)' : 'transparent', color: viewType === 'grid' ? 'var(--text)' : 'var(--text-secondary)' }} aria-label="Grid view">
                                <Grid size={16} />
                            </button>
                            <button onClick={() => setViewType('list')} className="p-2 rounded-md min-w-[36px] min-h-[36px] flex items-center justify-center" style={{ backgroundColor: viewType === 'list' ? 'var(--card)' : 'transparent', color: viewType === 'list' ? 'var(--text)' : 'var(--text-secondary)' }} aria-label="List view">
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{filtered.length} resources found</p>

            <div className={viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                {filtered.map(resource => {
                    const typeInfo = typeConfig[resource.type];
                    const TypeIcon = typeInfo.icon;
                    const isLiked = likedItems.includes(`resource-${resource.id}`);

                    return (
                        <button
                            key={resource.id}
                            onClick={() => setSelectedResource(resource.id)}
                            className="rounded-xl border transition-all text-left overflow-hidden hover:shadow-md"
                            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                        >
                            {viewType === 'grid' && (
                                <div className="aspect-[16/9] flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, var(--bg), var(--card-alt))` }}>
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--brand-bg)' }}>
                                        <TypeIcon size={24} style={{ color: typeInfo.color }} />
                                    </div>
                                </div>
                            )}
                            <div className="p-4">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: 'var(--brand-bg)', color: 'var(--brand)' }}>{resource.subject}</span>
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }}>{resource.difficulty}</span>
                                </div>
                                <h3 className="text-sm font-semibold line-clamp-2 leading-snug" style={{ color: 'var(--text)' }}>{resource.title}</h3>
                                <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="flex items-center gap-0.5"><Clock size={11} /> {resource.duration}</span>
                                    <span className="flex items-center gap-0.5"><Star size={11} className="fill-[#D97706] text-[#D97706]" /> {resource.rating}</span>
                                    {isLiked && <span className="flex items-center gap-0.5" style={{ color: 'var(--error)' }}><Heart size={11} fill="currentColor" /></span>}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {toastMsg && (
                <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
                    <div className="px-5 py-3 rounded-xl shadow-lg text-sm font-medium" style={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}>{toastMsg}</div>
                </div>
            )}
        </div>
    );
}
