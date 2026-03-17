import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import '../styles/auth.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Typically need to verify email, but assume we navigate or show message
            navigate('/chat');
        }
    };

    const handleOAuth = async (provider) => {
        await supabase.auth.signInWithOAuth({
            provider,
        });
    };

    return (
        <div className="auth-container">
            <motion.div
                className="auth-card glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Join NexusAI today</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSignup} className="auth-form">
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <button type="submit" className="btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Creating...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-divider"><span>or</span></div>

                <button onClick={() => handleOAuth('google')} className="btn-oauth glass">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
                    Continue with Google
                </button>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
