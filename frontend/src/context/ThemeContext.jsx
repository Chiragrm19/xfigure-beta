import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({});

const DEFAULT_COLORS = {
    chatgpt: '#10a37f',
    claude: '#d97706',
    perplexity: '#6366f1',
    gemini: '#4285f4',
    grok: '#1d9bf0',
    deepseek: '#ef4444',
    system: '#888888'
};

export const ThemeProvider = ({ children }) => {
    const [modelColors, setModelColors] = useState(() => {
        const saved = localStorage.getItem('nexusai_model_colors');
        return saved ? JSON.parse(saved) : DEFAULT_COLORS;
    });

    const [userQueryColor, setUserQueryColor] = useState(() => {
        const saved = localStorage.getItem('nexusai_user_query_color');
        return saved || '#ff3b30';
    });

    // Sidebar state for mobile responsiveness
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('nexusai_model_colors', JSON.stringify(modelColors));
    }, [modelColors]);

    useEffect(() => {
        localStorage.setItem('nexusai_user_query_color', userQueryColor);
    }, [userQueryColor]);

    const updateModelColor = (model, color) => {
        setModelColors(prev => ({
            ...prev,
            [model.toLowerCase()]: color
        }));
    };

    const updateUserQueryColor = (color) => {
        setUserQueryColor(color);
    };

    const resetColors = () => {
        setModelColors(DEFAULT_COLORS);
        setUserQueryColor('#ff3b30');
    };

    const toggleSidebar = (state) => {
        if (typeof state === 'boolean') {
            setIsSidebarOpen(state);
        } else {
            setIsSidebarOpen(prev => !prev);
        }
    };

    return (
        <ThemeContext.Provider value={{
            modelColors,
            updateModelColor,
            userQueryColor,
            updateUserQueryColor,
            resetColors,
            isSidebarOpen,
            toggleSidebar
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
