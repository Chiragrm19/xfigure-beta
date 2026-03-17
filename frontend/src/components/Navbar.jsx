import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ title }) => {
    const navigate = useNavigate();
    const { toggleSidebar } = useTheme();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <button
                    className="btn-ghost mobile-only mr-2"
                    onClick={() => toggleSidebar(true)}
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={24} />
                </button>
            </div>

            <div className="nav-center font-medium truncate">
                {title || "NexusAI"}
            </div>

            <div className="nav-right flex items-center gap-3 text-secondary">
                <button className="btn-ghost" onClick={() => navigate('/settings')} title="Settings">
                    <Settings size={18} />
                </button>
                <button className="btn-ghost" title="Profile">
                    <User size={18} />
                </button>
                <button className="btn-ghost" onClick={handleLogout} title="Log Out">
                    <LogOut size={18} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
