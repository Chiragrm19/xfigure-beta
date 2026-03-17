import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import InputBar from '../components/InputBar';
import ChatMessage from '../components/ChatMessage';
import { useChat } from '../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Code, LineChart, Search } from 'lucide-react';
import '../styles/chat.css';
import axios from 'axios';

const Chat = () => {
    const { messages, isTyping, setIsTyping, currentSessionId, setCurrentSessionId, sessions, addMessageToSession } = useChat();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (content, modelOverride) => {
        if (!content.trim()) return;

        // Generate session ID if not present
        let sessionId = currentSessionId;
        if (!sessionId) {
            sessionId = 'session_' + Date.now();
            setCurrentSessionId(sessionId);
        }

        const newMsg = { id: Date.now(), role: 'user', content: content, text: content };
        addMessageToSession(sessionId, newMsg);
        setIsTyping(true);

        try {
            const response = await axios.post(`/api/chat`, {
                message: content,
                sessionId: sessionId,
                forceModel: modelOverride
            });

            const data = response.data;
            const aiMsg = {
                id: Date.now() + 1,
                role: 'assistant',
                content: data.response,
                text: data.response, // Adding text field for title generation logic
                model_used: data.model_used,
                routing_reason: data.routing_reason,
                response_time_ms: data.response_time_ms
            };

            addMessageToSession(sessionId, aiMsg);

        } catch (error) {
            console.error('Failed to send message:', error);
            const errorMsg = {
                id: Date.now() + 1,
                role: 'assistant',
                content: 'Sorry, I encountered an error connecting to the server.',
                text: 'Error occurred',
                model_used: 'system',
                routing_reason: 'Error occurred'
            };
            addMessageToSession(sessionId, errorMsg);
        } finally {
            setIsTyping(false);
        }
    };

    const EmptyState = () => (
        <div className="initial-state">
            <h2>How can I help you today?</h2>
            <div className="suggestions-grid">
                {[
                    { icon: Search, text: "What's the latest news on SpaceX?", hint: "Routes to Perplexity" },
                    { icon: Code, text: "Debug this Python function", hint: "Routes to Claude" },
                    { icon: LineChart, text: "Current TSLA stock trend", hint: "Routes to Grok" },
                    { icon: Bot, text: "Write a poem about a robot", hint: "Routes to Gemini" }
                ].map((s, i) => (
                    <div key={i} className="suggestion-card glass" onClick={() => handleSendMessage(s.text)}>
                        <div className="flex items-center gap-2 mb-2 text-secondary">
                            <s.icon size={16} />
                            <span className="text-xs">{s.hint}</span>
                        </div>
                        <p className="text-sm font-medium">{s.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <Navbar title={currentSessionId ? "Chat Session" : "New Chat"} />

                <div className="chat-area">
                    <div className="messages-list">
                        {messages.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <AnimatePresence initial={false}>
                                {messages.map((msg) => (
                                    <ChatMessage key={msg.id} message={msg} />
                                ))}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex text-secondary items-center gap-2"
                                    >
                                        <Bot size={20} />
                                        <span className="text-sm italic tracking-widest animate-pulse">Routing query...</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <InputBar onSend={handleSendMessage} disabled={isTyping} messageCount={messages.length} />
                </div>
            </main>
        </div>
    );
};

export default Chat;
