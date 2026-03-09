import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { setToken, clearToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('dashify_admin_token');
        if (!token) {
            setLoading(false);
            return;
        }

        api.get('/auth/me')
            .then((res) => {
                const userData = res.data?.user || null;
                // Only allow admin users
                if (userData && userData.role === 'admin') {
                    setUser(userData);
                } else {
                    clearToken();
                    setUser(null);
                }
            })
            .catch(() => {
                clearToken();
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { token, user: userData } = res.data;

        // Only allow admin users
        if (userData.role !== 'admin') {
            throw new Error('Access denied. Admin privileges required.');
        }

        setToken(token);
        setUser(userData);
        return userData;
    }, []);

    const logout = useCallback(() => {
        clearToken();
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}

export default AuthContext;
