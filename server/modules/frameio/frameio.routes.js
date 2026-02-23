/**
 * Frame.io Routes
 * ===============
 * Proxy routes for Frame.io API — all behind auth middleware.
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const {
    login,
    callback,
    getMe,
    getProjects,
    getTeams,
    getAssets,
    getAsset,
    getComments,
    createComment,
    updateComment,
    deleteComment,
} = require('./frameio.controller');

// OAuth (Public)
router.get('/login', login);
router.get('/callback', callback);

// All Frame.io routes require authentication
// In development, expose read-only Frame.io routes without JWT to ease setup
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
    // Public (dev only): verify connection and read operations
    router.get('/me', getMe);
    router.get('/projects', getProjects);
    router.get('/teams', getTeams);
    router.get('/projects/:projectId/assets', getAssets);
    router.get('/assets/:assetId', getAsset);
    router.get('/assets/:assetId/comments', getComments);

    // Protect mutations even in dev
    router.use(protect);
    router.post('/assets/:assetId/comments', createComment);
    router.put('/comments/:commentId', updateComment);
    router.delete('/comments/:commentId', deleteComment);
} else {
    // Production: protect everything
    router.use(protect);
    // Account
    router.get('/me', getMe);
    // Assets
    router.get('/projects/:projectId/assets', getAssets);
    router.get('/assets/:assetId', getAsset);
    // Comments
    router.get('/assets/:assetId/comments', getComments);
    router.post('/assets/:assetId/comments', createComment);
    router.put('/comments/:commentId', updateComment);
    router.delete('/comments/:commentId', deleteComment);
}

module.exports = router;
