import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, ChevronDown, Search } from 'lucide-react';

const InputBar = ({ onSend, disabled, messageCount }) => {
    const [content, setContent] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const textareaRef = useRef(null);

    const isExpanded = isFocused || isHovered || content.length > 0 || disabled || messageCount === 0;

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    useEffect(() => {
        resizeTextarea();
    }, [content]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (!content.trim() || disabled) return;
        onSend(content, selectedModel === '' ? null : selectedModel);
        setContent('');
        setIsFocused(false);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    return (
        <div className="input-area-wrapper">
            <div
                className={`input-box glass ${isExpanded ? 'expanded' : 'shrunk'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {!isExpanded && (
                    <div className="search-placeholder-icon">
                        <Search size={22} className="text-secondary" />
                    </div>
                )}

                <textarea
                    ref={textareaRef}
                    className={`chat-input ${!isExpanded ? 'opacity-0' : 'opacity-100'}`}
                    placeholder="Ask anything..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    rows={1}
                    disabled={disabled}
                />

                {isExpanded && (
                    <div className="input-actions">
                        <div className="flex items-center gap-2">
                            <button className="btn-ghost" title="Attach file (UI Mock)">
                                <Paperclip size={18} />
                            </button>

                            <div className="relative group">
                                <select
                                    className="model-select"
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                    <option value="">Auto-Route (Smart)</option>
                                    <option value="chatgpt">Force ChatGPT</option>
                                    <option value="claude">Force Claude</option>
                                    <option value="perplexity">Force Perplexity</option>
                                    <option value="gemini">Force Gemini</option>
                                    <option value="grok">Force Grok</option>
                                    <option value="deepseek">Force DeepSeek</option>
                                </select>
                                <ChevronDown size={14} className="select-chevron" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted font-mono">{content.length} / 4000</span>
                            <button
                                className="btn-send"
                                onClick={handleSend}
                                disabled={disabled || !content.trim()}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputBar;
