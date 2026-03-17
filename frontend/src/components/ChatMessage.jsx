import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ModelBadge = ({ model, reason }) => {
    const { modelColors } = useTheme();
    if (!model) return null;
    const color = modelColors[model.toLowerCase()] || 'var(--text-secondary)';
    const label = model.charAt(0).toUpperCase() + model.slice(1);

    return (
        <div
            className="model-badge-container"
            style={{
                borderColor: `${color}40`,
                backgroundColor: `${color}15`,
                color: color
            }}
        >
            <div className="color-dot" style={{ backgroundColor: color }}></div>
            <span>Answered by {label}</span>
            {reason && (
                <div className="routing-tooltip" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
                    <strong style={{ color }}>Routed here because:</strong> {reason}
                </div>
            )}
        </div>
    );
};

const ChatMessage = ({ message }) => {
    const { modelColors, userQueryColor } = useTheme();
    const isUser = message.role === 'user';
    const color = modelColors[message.model_used?.toLowerCase()] || 'var(--text-secondary)';

    return (
        <motion.div
            className={`snap-message-wrapper ${isUser ? 'snap-user' : 'snap-assistant'}`}
            style={{ '--model-accent': isUser ? userQueryColor : color }}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="snap-indicator"></div>
            <div className="snap-content">
                {!isUser && (
                    <ModelBadge model={message.model_used} reason={message.routing_reason} />
                )}
                <div className="snap-text-container">
                    {isUser ? (
                        <div className="snap-query-text">{message.content}</div>
                    ) : (
                        <div className="markdown-body snap-answer-text">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <div className="relative group/code my-2">
                                                <SyntaxHighlighter
                                                    {...props}
                                                    children={String(children).replace(/\n$/, '')}
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                />
                                            </div>
                                        ) : (
                                            <code {...props} className={className}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ChatMessage;
