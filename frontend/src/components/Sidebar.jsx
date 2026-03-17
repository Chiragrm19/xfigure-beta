import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Plus, MessageSquare, LayoutDashboard, Settings, X } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';

const SidebarItem = ({ icon: Icon, label, to, active, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded bg-transparent transition-all ${active ? 'active text-primary' : 'text-secondary hover:text-primary'}`}
    >
        <Icon size={18} />
        <span className="text-sm font-medium truncate">{label}</span>
    </Link>
);

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentSessionId, setCurrentSessionId, sessions } = useChat();
    const { isSidebarOpen, toggleSidebar } = useTheme();

    const handleNewChat = () => {
        setCurrentSessionId(null);
        toggleSidebar(false);
        navigate('/chat');
    };

    const handleNavigation = (path, sessionId = null) => {
        if (sessionId) {
            setCurrentSessionId(sessionId);
        }
        toggleSidebar(false);
        navigate(path);
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => toggleSidebar(false)}
                ></div>
            )}

            <div className={`sidebar p-5 flex-col justify-between ${isSidebarOpen ? 'open' : ''}`}>
                <div className="top-section">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div className="font-bold text-xl tracking-tight cursor-pointer" onClick={() => handleNavigation('/')}>
                            Nexus<span className="text-secondary font-medium">AI</span>
                        </div>
                        <button
                            className="btn-ghost mobile-only"
                            onClick={() => toggleSidebar(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <button
                        onClick={handleNewChat}
                        className="w-full flex items-center justify-center gap-2 btn-primary rounded-card px-4 py-3 mb-8 hover:brightness-110 active:scale-95 transition-all"
                    >
                        <Plus size={18} />
                        <span>New Chat</span>
                    </button>

                    <div className="text-xs text-secondary font-medium px-2 mb-3 mt-4 uppercase tracking-wider">
                        Main
                    </div>
                    <div className="flex-col gap-sidebar mb-6">
                        <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" active={location.pathname === '/dashboard'} onClick={() => toggleSidebar(false)} />
                        <SidebarItem icon={MessageSquare} label="Chat" to="/chat" active={location.pathname === '/chat'} onClick={() => toggleSidebar(false)} />
                        <SidebarItem icon={Settings} label="Settings" to="/settings" active={location.pathname === '/settings'} onClick={() => toggleSidebar(false)} />
                    </div>

                    <div className="text-xs text-secondary font-medium px-2 mb-3 mt-6 uppercase tracking-wider">
                        Recent Chats
                    </div>
                    <div className="flex-col gap-sidebar overflow-y-auto" style={{ maxHeight: '40vh' }}>
                        {sessions.length > 0 ? (
                            sessions.slice(0, 10).map(session => (
                                <button
                                    key={session.id}
                                    className={`sidebar-item flex items-center gap-3 px-3 py-2.5 text-sm text-left rounded bg-transparent transition-all truncate ${currentSessionId === session.id ? 'active text-primary' : 'text-secondary hover:text-primary'}`}
                                    onClick={() => handleNavigation('/chat', session.id)}
                                >
                                    <MessageSquare size={16} className="shrink-0" />
                                    <span className="truncate">{session.title}</span>
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-xs text-muted italic">
                                No previous queries yet
                            </div>
                        )}
                    </div>
                </div>

                <div className="bottom-section border-t border-border pt-5 mt-4 pb-2">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-sm font-bold shrink-0">
                            U
                        </div>
                        <div className="flex-col overflow-hidden">
                            <span className="text-sm font-medium truncate">User Studio</span>
                            <span className="text-xs text-secondary truncate">Free Tier</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
