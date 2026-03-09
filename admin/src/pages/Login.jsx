import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IoShieldCheckmarkOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
            <div className="w-full max-w-[400px] animate-fade-in">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                        <IoShieldCheckmarkOutline className="text-accent text-2xl" />
                    </div>
                    <h1 className="text-xl font-bold text-text-primary">Dashify Admin</h1>
                    <p className="text-sm text-text-secondary mt-1">Sign in with your admin credentials</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-bg-secondary rounded-2xl border border-border-color p-6 space-y-5 shadow-xl">
                    {error && (
                        <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-color text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                            placeholder="admin@dashify.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-color text-text-primary text-sm focus:outline-none focus:border-accent transition-colors pr-11"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-accent text-white text-sm font-bold hover:bg-accent-hover transition-all disabled:opacity-50 shadow-lg shadow-accent/20"
                    >
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
