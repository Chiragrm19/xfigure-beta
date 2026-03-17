import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, Code, Search, Image as ImageIcon, LineChart, Sigma } from 'lucide-react';
import '../styles/landing.css';

const AI_TOOLS = [
    { name: 'ChatGPT', specialty: 'General Conversation', color: 'var(--chatgpt)', icon: Bot },
    { name: 'Claude', specialty: 'Coding & Debugging', color: 'var(--claude)', icon: Code },
    { name: 'Perplexity', specialty: 'Web Research', color: 'var(--perplexity)', icon: Search },
    { name: 'Gemini', specialty: 'Multimodal & Visuals', color: 'var(--gemini)', icon: ImageIcon },
    { name: 'Grok', specialty: 'Market Analysis', color: 'var(--grok)', icon: LineChart },
    { name: 'DeepSeek', specialty: 'Mathematics & Logic', color: 'var(--deepseek)', icon: Sigma },
];

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Navbar Minimal */}
            <nav className="landing-nav container">
                <div className="logo font-bold">NexusAI</div>
                <div className="nav-links">
                    <button onClick={() => navigate('/login')} className="btn-ghost">Log in</button>
                    <button onClick={() => navigate('/signup')} className="btn-primary">Sign up</button>
                </div>
            </nav>

            <main className="landing-hero container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="tagline">
                        One Prompt. <br /><span className="gradient-text">Six Minds.</span>
                    </h1>
                    <p className="subtitle">
                        An intelligent router that automatically sends your query to the AI model best suited to answer it.
                    </p>

                    <div className="cta-wrapper">
                        <div className="input-glow-pulse">
                            <input
                                type="text"
                                placeholder="Ask anything..."
                                className="hero-input glass"
                                readOnly
                                onClick={() => navigate('/chat')}
                            />
                        </div>
                        <button onClick={() => navigate('/chat')} className="btn-primary cta-btn">
                            Start Chatting
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="floating-cards"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {AI_TOOLS.map((tool, index) => (
                        <motion.div
                            key={tool.name}
                            className="ai-card glass"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8, y: 20 },
                                visible: { opacity: 1, scale: 1, y: 0 }
                            }}
                            whileHover={{ y: -5, boxShadow: `0 0 20px ${tool.color}33`, borderColor: `${tool.color}66` }}
                        >
                            <div className="card-header">
                                <tool.icon style={{ color: tool.color }} size={24} />
                                <h3>{tool.name}</h3>
                            </div>
                            <p className="specialty">{tool.specialty}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            <footer className="landing-footer container">
                <p>&copy; 2026 NexusAI. Built with React & Node.</p>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
