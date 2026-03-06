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
    const bufferSeconds = 300; // 5 minutes buffer
    const diff = now - updatedAt;
    const thresh = (tokens.expiresIn - bufferSeconds) * 1000;

    console.log(`[Frame.io DEBUG] Token check: now=${now}, updatedAt=${updatedAt}, diff=${diff}, thresh=${thresh}`);

    if (diff > thresh) {
        console.log('[Frame.io] Token expired or nearing expiration. Refreshing...');
        try {
            const newTokens = await auth.refreshAccessToken(tokens.refreshToken);
            tokenStore.saveTokens(newTokens);
            // Update the locally used token
            tokens.accessToken = newTokens.accessToken;
        } catch (e) {
            console.error('[Frame.io] Auto-refresh failed:', e.message);
            // If refresh fails, we still try with the old one, which might lead to 401
        }
    }

    return axios.create({
        baseURL: FRAMEIO_API_V4,
        headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            'x-api-key': process.env.FRAMEIO_CLIENT_ID,
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
    const { data } = await c.get('/me');
    // V4 wraps in { data: ... }
    return data.data || data;
}

/**
 * List projects accessible to the user.
 */
async function getProjects() {
    const c = await client();

    try {
        // 1. Get accounts
        const { data: accountsRes } = await c.get('/accounts');
        const accounts = accountsRes.data;
        if (!accounts || accounts.length === 0) return [];

        const accountId = accounts[0].id;

        // 2. Get workspaces for the account
        const { data: workspacesRes } = await c.get(`/accounts/${accountId}/workspaces`);
        const workspaces = workspacesRes.data;
        if (!workspaces || workspaces.length === 0) return [];

        // 3. List projects for the first workspace (experimental)
        const { data: projectsRes } = await c.get(`/accounts/${accountId}/workspaces/${workspaces[0].id}/projects`, {
            headers: { 'api-version': 'experimental' }
        });
        return projectsRes.data || [];
    } catch (e) {
        console.error('[Frame.io DEBUG] getProjects failed:', e.response?.status, e.response?.data?.message || e.message);
        throw e;
    }
}

/**
 * List assets in a folder or project.
 */
async function getAssets(parentId, opts = {}) {
    const c = await client();

    // 1. Get account ID
    const { data: accountsRes } = await c.get('/accounts');
    const accounts = accountsRes.data;
    if (!accounts || accounts.length === 0) throw new Error('No Frame.io accounts found');
    const accountId = accounts[0].id;

    // Strategy 1: Try V4 folder children (Account Scoped)
    try {
        console.log('[Frame.io DEBUG] Strategy 1: V4 Account-scoped folder children for', parentId);
        const { data } = await c.get(`/accounts/${accountId}/folders/${parentId}/children`, { params: opts });
        return data.data;
    } catch (e1) {
        console.log('[Frame.io DEBUG] Strategy 1 FAILED:', e1.response?.status, e1.response?.data?.message || e1.message);

        // Strategy 2: Maybe it's a project ID — get project detail to find root_folder_id
        try {
            console.log('[Frame.io DEBUG] Strategy 2: V4 Project lookup for', parentId);
            const { data: projectRes } = await c.get(`/accounts/${accountId}/projects/${parentId}`);
            const project = projectRes.data;
            const rootFolderId = project.root_folder_id;

            if (rootFolderId) {
                console.log('[Frame.io DEBUG] Strategy 2: Found root folder ID:', rootFolderId);
                const { data: res } = await c.get(`/accounts/${accountId}/folders/${rootFolderId}/children`, { params: opts });
                return res.data;
            }
        } catch (e2) {
            console.log('[Frame.io DEBUG] Strategy 2 FAILED:', e2.response?.status, e2.response?.data?.message || e2.message);
            throw e1; // Throw original error if both fail
        }
    }
}

/**
 * Get a single asset mapping to the correct API version.
 */
async function getAsset(assetId) {
    const c = await client();

    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    // V4: Try folders, then files
    try {
        const { data } = await c.get(`/accounts/${accountId}/folders/${assetId}`);
        return data.data;
    } catch (e) {
        const { data } = await c.get(`/accounts/${accountId}/files/${assetId}`);
        return data.data;
    }
}

/**
 * List comments on a file.
 */
async function getComments(assetId) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    const { data } = await c.get(`/accounts/${accountId}/files/${assetId}/comments`);
    return data.data;
}

/**
 * Create a comment on a file.
 */
async function createComment(assetId, payload) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    const { data } = await c.post(`/accounts/${accountId}/files/${assetId}/comments`, payload);
    return data.data;
}

/**
 * Update a comment.
 */
async function updateComment(commentId, payload) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    const { data } = await c.put(`/accounts/${accountId}/comments/${commentId}`, payload);
    return data.data;
}

/**
 * Delete a comment.
 */
async function deleteComment(commentId) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    await c.delete(`/accounts/${accountId}/comments/${commentId}`);
}

/**
 * Toggle comment resolution (completed status).
 */
async function toggleCommentResolution(commentId, completed) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    const { data } = await c.put(`/accounts/${accountId}/comments/${commentId}`, { completed });
    return data.data;
}

/**
 * List teams (Workspaces) accessible to the user.
 */
async function getTeams() {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accounts = accountsRes.data;
    if (!accounts || accounts.length === 0) return [];

    const { data: workspacesRes } = await c.get(`/accounts/${accounts[0].id}/workspaces`);
    return workspacesRes.data;
}

/* ------------------------------------------------------------------ */
/*  Permissions (Workspaces & Projects)                               */
/* ------------------------------------------------------------------ */

/**
 * List user roles for a given Workspace.
 */
async function getWorkspaceUsers(workspaceId) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    // Note: V4 permissions might have different paths, using best guess for now
    const { data } = await c.get(`/accounts/${accountId}/workspaces/${workspaceId}/users`);
    return data.data;
}

/**
 * Update or add a user role to a Workspace.
 */
async function updateWorkspaceUser(workspaceId, userId, role) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    const { data } = await c.put(`/accounts/${accountId}/workspaces/${workspaceId}/users/${userId}`, { role });
    return data.data;
}

/**
 * Remove a user from a Workspace.
 */
async function removeWorkspaceUser(workspaceId, userId) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    await c.delete(`/accounts/${accountId}/workspaces/${workspaceId}/users/${userId}`);
}

/**
 * List user roles for a given Project.
 */
async function getProjectUsers(projectId) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    const { data } = await c.get(`/accounts/${accountId}/projects/${projectId}/users`);
    return data.data;
}

/**
 * Update or add a user role to a Project.
 */
async function updateProjectUser(projectId, userId, role) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    const { data } = await c.put(`/accounts/${accountId}/projects/${projectId}/users/${userId}`, { role });
    return data.data;
}

/**
 * Remove a user from a Project.
 */
async function removeProjectUser(projectId, userId) {
    const c = await client();
    const { data: accountsRes } = await c.get('/accounts');
    const accountId = accountsRes.data[0].id;

    await c.delete(`/accounts/${accountId}/projects/${projectId}/users/${userId}`);
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
    toggleCommentResolution,
    getWorkspaceUsers,
    updateWorkspaceUser,
    removeWorkspaceUser,
    getProjectUsers,
    updateProjectUser,
    removeProjectUser,
};
