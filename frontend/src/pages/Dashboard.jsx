import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import '../styles/dashboard.css';

const COLORS = ['#10a37f', '#7c3aed', '#3b82f6', '#f59e0b', '#d946ef', '#ec4899'];

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalQueries: 0,
        mostUsedAI: 'ChatGPT',
        avgResponseTime: 0,
        modelDistribution: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const chartData = stats.modelDistribution.length > 0
        ? stats.modelDistribution
        : [
            { name: 'ChatGPT', value: 1, color: 'var(--chatgpt)' },
            { name: 'Claude', value: 0, color: 'var(--claude)' },
            { name: 'Perplexity', value: 0, color: 'var(--perplexity)' },
            { name: 'Gemini', value: 0, color: 'var(--gemini)' },
            { name: 'Grok', value: 0, color: 'var(--grok)' },
            { name: 'DeepSeek', value: 0, color: 'var(--deepseek)' }
        ];

    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <Navbar title="Dashboard" />
                <div className="dashboard-container p-8 scrollable">

                    <motion.div
                        className="stats-grid"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="stat-card glass flex-col">
                            <span className="stat-label">Total Queries</span>
                            <span className="stat-value">{stats.totalQueries.toLocaleString()}</span>
                        </div>
                        <div className="stat-card glass flex-col">
                            <span className="stat-label">Most Used AI</span>
                            <span className="stat-value" style={{ color: `var(--${stats.mostUsedAI.toLowerCase()})` }}>
                                {stats.mostUsedAI}
                            </span>
                        </div>
                        <div className="stat-card glass flex-col">
                            <span className="stat-label">Avg Response Time</span>
                            <span className="stat-value">{stats.avgResponseTime}s</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="charts-section glass mt-8 p-6 rounded-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3>AI Usage Distribution</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                                        itemStyle={{ color: 'var(--text-primary)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div
                        className="recent-chats glass mt-8 p-6 rounded-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Recent Activity</h3>
                        <table className="mt-4 w-full text-left">
                            <thead>
                                <tr className="text-secondary border-b border-border pb-2">
                                    <th className="font-medium pb-2">Query</th>
                                    <th className="font-medium pb-2">Routed To</th>
                                    <th className="font-medium pb-2 text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="3" className="py-4 text-center">Loading activity...</td></tr>
                                ) : (
                                    [
                                        { q: "React hook dependency array infinite loop", ai: "Claude", time: "2m ago" },
                                        { q: "Write a polite email to my boss", ai: "ChatGPT", time: "15m ago" },
                                        { q: "Current stock price of NVDA", ai: "Grok", time: "1h ago" }
                                    ].map((item, i) => (
                                        <tr key={i} className="border-b border-border last:border-0 hover:bg-hover transition-colors">
                                            <td className="py-3 px-2 rounded-l">{item.q}</td>
                                            <td className="py-3"><span className="badge badge-sm">{item.ai}</span></td>
                                            <td className="py-3 px-2 text-right text-secondary rounded-r">{item.time}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
