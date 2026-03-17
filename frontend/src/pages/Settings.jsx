import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { RotateCcw } from 'lucide-react';

const Settings = () => {
    const { modelColors, updateModelColor, userQueryColor, updateUserQueryColor, resetColors } = useTheme();
    const [keys, setKeys] = useState({
        openai: '',
        anthropic: '',
        perplexity: '',
        gemini: '',
        grok: '',
        deepseek: ''
    });

    const handleSave = (e) => {
        e.preventDefault();
        // Simulate save to backend
        alert('API Keys saved securely.');
    };

    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <Navbar title="Settings" />
                <div className="settings-container p-8 scrollable" style={{ maxWidth: '800px', margin: '0 auto' }}>

                    <motion.div
                        className="settings-section glass p-6 rounded-card"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h2 className="mb-2 text-xl font-semibold">API Keystore</h2>
                        <p className="text-secondary mb-6 text-sm">
                            Enter your own API keys. They will be encrypted and stored securely in your Supabase profile.
                        </p>

                        <form onSubmit={handleSave} className="flex-col gap-4">
                            {['OpenAI', 'Anthropic', 'Perplexity', 'Gemini', 'Grok', 'DeepSeek'].map((provider) => {
                                const pKey = provider.toLowerCase();
                                return (
                                    <div key={pKey} className="input-group">
                                        <label>{provider} API Key</label>
                                        <input
                                            type="password"
                                            placeholder={`sk-...${pKey}...`}
                                            value={keys[pKey]}
                                            onChange={(e) => setKeys({ ...keys, [pKey]: e.target.value })}
                                            className="glass font-mono"
                                            style={{ padding: '0.75rem', borderRadius: '8px' }}
                                        />
                                    </div>
                                )
                            })}

                            <button type="submit" className="btn-primary mt-4 self-start">
                                Save Keys
                            </button>
                        </form>
                    </motion.div>

                    {/* Model Customization Section */}
                    <motion.div
                        className="settings-section glass p-6 rounded-card mt-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-semibold">Model Customization</h2>
                                <p className="text-secondary text-sm">Pick your favorite color accents for each tool.</p>
                            </div>
                            <button
                                onClick={resetColors}
                                className="flex items-center gap-2 text-xs text-secondary hover:text-primary transition-colors"
                            >
                                <RotateCcw size={14} />
                                Reset to Defaults
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {['ChatGPT', 'Claude', 'Perplexity', 'Gemini', 'Grok', 'DeepSeek'].map((model) => {
                                const mKey = model.toLowerCase();
                                return (
                                    <div key={mKey} className="flex items-center justify-between p-3 rounded-lg border border-border bg-black/20">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: modelColors[mKey] }}
                                            ></div>
                                            <span className="font-medium">{model}</span>
                                        </div>
                                        <input
                                            type="color"
                                            value={modelColors[mKey]}
                                            onChange={(e) => updateModelColor(mKey, e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                        />
                                    </div>
                                )
                            })}

                            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-black/20 col-span-2 mt-2">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: userQueryColor }}
                                    ></div>
                                    <div>
                                        <span className="font-medium">Input query</span>
                                        <p className="text-[10px] text-secondary">Changes the color of your sent messages</p>
                                    </div>
                                </div>
                                <input
                                    type="color"
                                    value={userQueryColor}
                                    onChange={(e) => updateUserQueryColor(e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Preferences Section Placeholder */}
                    <motion.div
                        className="settings-section glass p-6 rounded-card mt-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="mb-2 text-xl font-semibold">Preferences</h2>
                        <div className="flex items-center justify-between mt-4 border-b border-border pb-4">
                            <div>
                                <div className="font-medium">Dark Mode</div>
                                <div className="text-xs text-secondary">Aesthetic is locked to dark mode by default for premium feel.</div>
                            </div>
                            <div className="px-3 py-1 bg-hover rounded text-xs">Always On</div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
