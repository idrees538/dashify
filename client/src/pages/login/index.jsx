import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.data?.message || err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
            <div className="w-full max-w-[400px] animate-fade-in">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#ff8c42] shadow-lg mb-4">
                        <span className="text-white text-2xl font-black tracking-tight">D</span>
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary tracking-tight">Welcome back</h1>
                    <p className="text-sm text-text-secondary mt-1">Sign in to your Dashify account</p>
                </div>

                {/* Login Card */}
                <div className="bg-bg-secondary border border-border-color rounded-2xl p-6 shadow-lg">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Error */}
                        {error && (
                            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium animate-slide-up">
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wider">Email</label>
                            <div className="relative">
                                <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-color bg-bg-primary text-text-primary text-sm transition-colors focus:outline-none focus:border-accent placeholder:text-text-secondary/50"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-border-color bg-bg-primary text-text-primary text-sm transition-colors focus:outline-none focus:border-accent placeholder:text-text-secondary/50"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <IoEyeOffOutline className="text-lg" /> : <IoEyeOutline className="text-lg" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className="w-full py-3 mt-1 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[#ff8c42] text-white font-semibold text-sm shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:shadow-xl hover:not-disabled:scale-[1.02] active:not-disabled:scale-[0.98]"
                        >
                            {loading ? (
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Signing in…
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-border-color"></div>
                        <span className="text-[11px] text-text-secondary font-medium uppercase tracking-wider">Quick access</span>
                        <div className="flex-1 h-px bg-border-color"></div>
                    </div>

                    {/* Quick login buttons */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => { setEmail('admin@dashify.com'); setPassword('password123'); }}
                            className="w-full py-2.5 rounded-xl border border-border-color bg-bg-primary text-sm font-medium text-text-primary hover:bg-bg-hover transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Admin — admin@dashify.com
                        </button>
                        <button
                            onClick={() => { setEmail('john@dashify.com'); setPassword('password123'); }}
                            className="w-full py-2.5 rounded-xl border border-border-color bg-bg-primary text-sm font-medium text-text-primary hover:bg-bg-hover transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            User — john@dashify.com
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-[11px] text-text-secondary/60 mt-6">
                    Dashify © 2026 • All rights reserved
                </p>
            </div>
        </div>
    );
}

export default Login;
