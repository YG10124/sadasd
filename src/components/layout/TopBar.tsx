import { Search, Bell, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/store/useThemeStore';
import { BookOpen } from 'lucide-react';

interface TopBarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
    onOpenSidebar: () => void;
    isSignedIn: boolean;
    sidebarExpanded: boolean;
    searchQuery?: string;
    onSearchChange?: (q: string) => void;
}

export default function TopBar({ currentPage, onNavigate, onOpenSidebar, isSignedIn, sidebarExpanded, searchQuery = '', onSearchChange }: TopBarProps) {
    const { themeMode, toggleTheme } = useTheme();

    const desktopLeft = isSignedIn ? (sidebarExpanded ? 240 : 68) : 0;

    return (
        <>
            {/* ====== DESKTOP TOP BAR ====== */}
            <header
                className="hidden lg:flex fixed top-0 right-0 h-14 items-center px-6 z-20 border-b transition-all duration-300"
                style={{
                    left: desktopLeft,
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                }}
            >
                <div className="flex-1 flex items-center">
                    {!isSignedIn && (
                        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mr-6 focus:outline-none">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--brand)' }}>
                                <BookOpen size={18} className="text-white" />
                            </div>
                            <h1 className="text-lg font-bold font-[family-name:var(--font-display)]" style={{ color: 'var(--text)' }}>ScienceSpire</h1>
                        </button>
                    )}
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--text-secondary)' }} />
                        <input
                            type="search"
                            placeholder="Search resources, sessions, people..."
                            aria-label="Search"
                            value={searchQuery}
                            onChange={e => onSearchChange?.(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: 'var(--bg)',
                                color: 'var(--text)',
                                borderColor: 'transparent',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.backgroundColor = 'var(--card)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = 'var(--bg)'; }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    {isSignedIn && (
                    <button
                        className="relative p-2.5 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label="Notifications (3 new)"
                    >
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--error)' }} aria-hidden="true" />
                    </button>
                    )}
                    {isSignedIn && (
                        <button
                            onClick={() => onNavigate('profile')}
                            className="flex items-center gap-2 ml-1 p-1.5 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6] flex items-center justify-center text-white text-xs font-bold">
                                JS
                            </div>
                        </button>
                    )}
                </div>
            </header>

            {/* ====== MOBILE TOP BAR ====== */}
            <header
                className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center px-4 z-30 border-b"
                style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                }}
            >
                {isSignedIn ? (
                    <button
                        onClick={onOpenSidebar}
                        className="p-2 -ml-1 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label="Open navigation menu"
                    >
                        <Menu size={22} />
                    </button>
                ) : null}
                <button onClick={() => onNavigate('home')} className="flex items-center gap-1.5 ml-1">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: 'var(--brand)' }}>
                        <BookOpen size={14} className="text-white" />
                    </div>
                    <span className="text-lg font-bold font-[family-name:var(--font-display)]" style={{ color: 'var(--text)' }}>ScienceSpire</span>
                </button>
                <div className="flex-1" />
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
                >
                    {themeMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                {isSignedIn && (
                <button
                    className="relative p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Notifications (3 new)"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--error)' }} aria-hidden="true" />
                </button>
                )}
            </header>
        </>
    );
}
