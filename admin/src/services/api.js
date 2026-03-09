/**
 * Lightweight API client for Dashify Admin.
 * All requests go through the Vite proxy (/api → backend).
 */

const API_BASE = '/api';

const getToken = () => localStorage.getItem('dashify_admin_token');

export const setToken = (token) => localStorage.setItem('dashify_admin_token', token);

export const clearToken = () => localStorage.removeItem('dashify_admin_token');

async function request(endpoint, { method = 'GET', body = null, params = {} } = {}) {
    const url = new URL(`${API_BASE}${endpoint}`, window.location.origin);

    Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
            url.searchParams.append(key, val);
        }
    });

    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = { method, headers };
    if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
    }

    const res = await fetch(url.pathname + url.search, config);

    // Handle non-JSON responses (e.g. HTML error pages, empty responses)
    const contentType = res.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
    } else {
        const text = await res.text();
        if (!res.ok) {
            const error = new Error(text || `Request failed with status ${res.status}`);
            error.status = res.status;
            throw error;
        }
        // Try parsing as JSON anyway (some servers don't set content-type)
        try {
            data = text ? JSON.parse(text) : {};
        } catch {
            data = { message: text };
        }
    }

    if (!res.ok) {
        const error = new Error(data.message || 'Request failed');
        error.status = res.status;
        error.data = data;
        throw error;
    }

    return data;
}

export const api = {
    get: (endpoint, params) => request(endpoint, { method: 'GET', params }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
