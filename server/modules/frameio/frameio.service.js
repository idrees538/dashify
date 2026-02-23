const axios = require('axios');
const tokenStore = require('./frameio.token');
const auth = require('./frameio.auth');

const FRAMEIO_API_V4 = 'https://api.frame.io/v4';
const FRAMEIO_API_V2 = 'https://api.frame.io/v2';

/**
 * V4 Axios Client
 * Handles automatic token injection and refreshing.
 */
async function client() {
    const tokens = tokenStore.getTokens();
    const legacyToken = process.env.FRAMEIO_TOKEN;

    // Fallback to V2 if V4 tokens aren't set but legacy is
    if (!tokens && legacyToken) {
        return axios.create({
            baseURL: FRAMEIO_API_V2,
            headers: { Authorization: `Bearer ${legacyToken}` }
        });
    }

    if (!tokens) {
        const err = new Error('Frame.io V4 not authorized. Please login via OAuth.');
        err.code = 'FRAMEIO_NOT_AUTHORIZED';
        throw err;
    }

    // Check if token needs refresh (simplified: refresh if > 1 hour old)
    const updatedAt = new Date(tokens.updatedAt).getTime();
    const now = Date.now();
    if (now - updatedAt > (tokens.expiresIn - 300) * 1000) {
        try {
            const newTokens = await auth.refreshToken(tokens.refreshToken);
            tokenStore.saveTokens(newTokens);
            tokens.accessToken = newTokens.accessToken;
        } catch (e) {
            console.error('[Frame.io] Auto-refresh failed');
        }
    }

    return axios.create({
        baseURL: FRAMEIO_API_V4,
        headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            'Content-Type': 'application/json',
        },
        timeout: 15000,
    });
}

/**
 * Get the authenticated user.
 */
async function getMe() {
    const c = await client();
    const isV2 = c.defaults.baseURL === FRAMEIO_API_V2;
    const { data } = await c.get(isV2 ? '/me' : '/users/me');
    return data;
}

/**
 * List projects accessible to the user.
 */
async function getProjects() {
    const c = await client();
    const isV2 = c.defaults.baseURL === FRAMEIO_API_V2;

    if (isV2) {
        // V2: List accounts first to get projects
        const { data: accounts } = await c.get('/accounts');
        if (!accounts || accounts.length === 0) return [];

        // Return projects from the first account for now (common case)
        const { data } = await c.get(`/accounts/${accounts[0].id}/projects`);
        return data;
    }

    // V4: Fallback to V2 project listing if V4 projects endpoint is not standard
    try {
        const { data } = await c.get('/projects');
        return data;
    } catch (e) {
        // Try V2 approach if V4 fails (token might be valid for both)
        const { data: accounts } = await c.get('https://api.frame.io/v2/accounts');
        if (!accounts || accounts.length === 0) return [];
        const { data } = await c.get(`https://api.frame.io/v2/accounts/${accounts[0].id}/projects`);
        return data;
    }
}

/**
 * List assets in a folder (V4) or project root (V2).
 */
async function getAssets(parentId, opts = {}) {
    const c = await client();
    const isV2 = c.defaults.baseURL === FRAMEIO_API_V2;

    if (isV2) {
        const { data } = await c.get(`/assets/${parentId}/children`, { params: opts });
        return data;
    }

    // V4: Get children of a folder
    const { data } = await c.get(`/folders/${parentId}/children`, { params: opts });
    // V4 returns results in a 'data' array or directly depending on endpoint
    return data;
}

/**
 * Get a single asset mapping to the correct API version.
 */
async function getAsset(assetId) {
    const c = await client();
    const isV2 = c.defaults.baseURL === FRAMEIO_API_V2;

    if (isV2) {
        // V2 uses /assets/:id
        const { data } = await c.get(`/assets/${assetId}`);
        return data;
    }

    // V4: Distinguishes between files and folders
    try {
        const { data } = await c.get(`/files/${assetId}`);
        return data;
    } catch (e) {
        try {
            const { data } = await c.get(`/folders/${assetId}`);
            return data;
        } catch (e2) {
            // Last resort: V2 asset lookup (some IDs are legacy)
            const { data } = await axios.get(`${FRAMEIO_API_V2}/assets/${assetId}`, {
                headers: { Authorization: c.defaults.headers.Authorization }
            });
            return data;
        }
    }
}

/**
 * List comments on a file (V4 uses /files/{id}/comments).
 */
async function getComments(assetId) {
    const c = await client();
    const isV2 = c.defaults.baseURL === FRAMEIO_API_V2;
    const endpoint = isV2 ? `/assets/${assetId}/comments` : `/files/${assetId}/comments`;

    const { data } = await c.get(endpoint);
    return data;
}

/**
 * Create a comment on a file.
 */
async function createComment(assetId, payload) {
    const c = await client();
    const isV2 = c.defaults.baseURL === FRAMEIO_API_V2;
    const endpoint = isV2 ? `/assets/${assetId}/comments` : `/files/${assetId}/comments`;

    const { data } = await c.post(endpoint, payload);
    return data;
}

/**
 * Update a comment.
 */
async function updateComment(commentId, payload) {
    const c = await client();
    const { data } = await c.put(`/comments/${commentId}`, payload);
    return data;
}

/**
 * Delete a comment.
 */
async function deleteComment(commentId) {
    const c = await client();
    const { data } = await c.delete(`/comments/${commentId}`);
    return data;
}

/**
 * List teams accessible to the user.
 */
async function getTeams() {
    const c = await client();
    const isV2 = c.defaults.baseURL === FRAMEIO_API_V2;

    if (isV2) {
        const { data: accounts } = await c.get('/accounts');
        if (!accounts || accounts.length === 0) return [];
        const { data } = await c.get(`/accounts/${accounts[0].id}/teams`);
        return data;
    }

    // V4 teams
    const { data } = await c.get('/teams');
    return data;
}

module.exports = {
    getMe,
    getProjects,
    getTeams,
    getAssets,
    getAsset,
    getComments,
    createComment,
    updateComment,
    deleteComment,
};
