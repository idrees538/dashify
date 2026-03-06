import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { setToken, clearToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount, check if we have a stored token and fetch user profile
    useEffect(() => {
        const token = localStorage.getItem('dashify_token');
        if (!token) {
            setLoading(false);
            return;
        }

        api.get('/auth/me')
            .then((res) => {
                setUser(res.data?.user || null);
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
        setToken(token);
        setUser(userData);
        return userData;
    }, []);

    const register = useCallback(async (name, email, password) => {
        const res = await api.post('/auth/register', { name, email, password });
        const { token, user: userData } = res.data;
        setToken(token);
        setUser(userData);
        return userData;
    }, []);

    const logout = useCallback(() => {
        clearToken();
        setUser(null);
    }, []);

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
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
