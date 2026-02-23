import api from './api';

/**
 * Frame.io Service
 * ================
 * All Frame.io API calls through our backend proxy.
 * Follows the same pattern as calendarService.js.
 *
 * To swap providers, update the endpoints here and the mappers
 * in frameioConfig.js.
 */
const frameioService = {
    /* ---- Account ---- */

    /**
     * Verify Frame.io connection (also checks if token is configured).
     */
    verifyConnection: () =>
        api.get('/frameio/me'),

    /* ---- Assets (drafts / videos) ---- */

    /**
     * List assets under a Frame.io project root.
     * @param {string} projectId - The root_asset_id of the project
     */
    getAssets: (projectId) =>
        api.get(`/frameio/projects/${projectId}/assets`),

    /**
     * Get a single asset by ID (includes streaming URL).
     * @param {string} assetId
     */
    getAsset: (assetId) =>
        api.get(`/frameio/assets/${assetId}`),

    /* ---- Comments (notes) ---- */

    /**
     * List all comments on an asset.
     * @param {string} assetId
     */
    getComments: (assetId) =>
        api.get(`/frameio/assets/${assetId}/comments`),

    /**
     * Create a comment on an asset.
     * @param {string} assetId
     * @param {object} payload - { text, timestamp? }
     */
    createComment: (assetId, payload) =>
        api.post(`/frameio/assets/${assetId}/comments`, payload),

    /**
     * Update an existing comment.
     * @param {string} commentId
     * @param {object} payload - { text }
     */
    updateComment: (commentId, payload) =>
        api.put(`/frameio/comments/${commentId}`, payload),

    /**
     * Delete a comment.
     * @param {string} commentId
     */
    deleteComment: (commentId) =>
        api.delete(`/frameio/comments/${commentId}`),
};

export default frameioService;
