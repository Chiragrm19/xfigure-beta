import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
    const [sessions, setSessions] = useState(() => {
        const saved = localStorage.getItem('nexusai_sessions');
        return saved ? JSON.parse(saved) : [];
    });
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    // Derive messages from current session
    const messages = React.useMemo(() => {
        if (!currentSessionId) return [];
        const session = sessions.find(s => s.id === currentSessionId);
        return session ? session.messages : [];
    }, [sessions, currentSessionId]);

    const saveSessions = (updatedSessions) => {
        setSessions(updatedSessions);
        localStorage.setItem('nexusai_sessions', JSON.stringify(updatedSessions));
    };

    const addMessageToSession = (sessionId, message) => {
        setSessions(prevSessions => {
            const updatedSessions = [...prevSessions];
            const sessionIndex = updatedSessions.findIndex(s => s.id === sessionId);

            if (sessionIndex === -1) {
                // New session: title is the first USER message
                const newSession = {
                    id: sessionId,
                    // Use message text as title, but fallback to "New Chat" if somehow empty
                    title: message.role === 'user'
                        ? (message.text?.length > 40 ? message.text.substring(0, 40) + '...' : message.text)
                        : "New Chat",
                    timestamp: Date.now(),
                    messages: [message]
                };
                const finalSessions = [newSession, ...updatedSessions];
                localStorage.setItem('nexusai_sessions', JSON.stringify(finalSessions));
                return finalSessions;
            } else {
                // Existing session: append message
                const session = { ...updatedSessions[sessionIndex] };
                session.messages = [...session.messages, message];
                updatedSessions[sessionIndex] = session;
                localStorage.setItem('nexusai_sessions', JSON.stringify(updatedSessions));
                return updatedSessions;
            }
        });
    };

    const value = {
        messages,
        sessions,
        setSessions: saveSessions,
        currentSessionId,
        setCurrentSessionId,
        isTyping,
        setIsTyping,
        addMessageToSession
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};
