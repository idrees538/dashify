/**
 * Frame.io Routes
 * ===============
 * Proxy routes for Frame.io API.
 *
 * Route access:
 *   - OAuth (login/callback): public redirect, admin-initiated only
 *   - Admin-only: /me, /projects, /teams, comment edit/delete/resolve, permissions
 *   - All users: read assets, read comments, create comments
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
    toggleCommentResolution,
    getWorkspaceUsers,
    updateWorkspaceUser,
    removeWorkspaceUser,
    getProjectUsers,
    updateProjectUser,
    removeProjectUser,
} = require('./frameio.controller');

/* ------------------------------------------------------------------ */
/*  Admin-only middleware                                              */
/* ------------------------------------------------------------------ */
function adminOnly(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
}

/* ------------------------------------------------------------------ */
/*  OAuth (Public redirects — admin-initiated)                        */
/* ------------------------------------------------------------------ */
router.get('/login', login);
router.get('/callback', callback);

/* ------------------------------------------------------------------ */
/*  All authenticated users — read assets & comments, create comments */
/* ------------------------------------------------------------------ */
router.use(protect);

// Assets (read-only for users)
router.get('/projects/:projectId/assets', getAssets);
router.get('/assets/:assetId', getAsset);

// Comments: read & create for all users
router.get('/assets/:assetId/comments', getComments);
router.post('/assets/:assetId/comments', createComment);

/* ------------------------------------------------------------------ */
/*  Admin-only routes                                                 */
/* ------------------------------------------------------------------ */
router.use(adminOnly);

// Account & project management
router.get('/me', getMe);
router.get('/projects', getProjects);
router.get('/teams', getTeams);

// Comment mutations (edit, delete, resolve)
router.put('/comments/:commentId', updateComment);
router.patch('/comments/:commentId/toggle', toggleCommentResolution);
router.delete('/comments/:commentId', deleteComment);

// Permissions
router.get('/workspaces/:workspaceId/users', getWorkspaceUsers);
router.put('/workspaces/:workspaceId/users/:userId', updateWorkspaceUser);
router.delete('/workspaces/:workspaceId/users/:userId', removeWorkspaceUser);
router.get('/projects/:projectId/users', getProjectUsers);
router.put('/projects/:projectId/users/:userId', updateProjectUser);
router.delete('/projects/:projectId/users/:userId', removeProjectUser);

module.exports = router;
