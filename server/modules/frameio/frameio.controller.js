const frameioService = require('./frameio.service');
const frameioAuth = require('./frameio.auth');
const tokenStore = require('./frameio.token');
const asyncHandler = require('../../core/asyncHandler');
const ApiError = require('../../core/ApiError');
const { sendSuccess } = require('../../core/response');

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/**
 * Wraps Frame.io service calls and translates common errors.
 */
function handleFrameioError(err) {
    if (err.code === 'FRAMEIO_NOT_AUTHORIZED') {
        const loginUrl = frameioAuth.getLoginUrl();
        const apiErr = new Error('Frame.io V4 not authorized. Please visit the login URL.');
        apiErr.statusCode = 401;
        apiErr.loginUrl = loginUrl;
        throw apiErr;
    }
    if (err.code === 'FRAMEIO_NOT_CONFIGURED') {
        throw ApiError.badRequest('Frame.io is not configured. Set Adobe credentials in your .env file.');
    }
    if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || err.response.data?.errors?.[0]?.message || 'Frame.io API error';
        const apiErr = new Error(message);
        apiErr.statusCode = status;
        throw apiErr;
    }
    throw err;
}

/* ------------------------------------------------------------------ */
/*  Authentication (V4 OAuth)                                         */
/* ------------------------------------------------------------------ */

/**
 * Redirect user to Adobe Login
 */
const login = asyncHandler(async (_req, res) => {
    const url = frameioAuth.getLoginUrl();
    res.redirect(url);
});

/**
 * Handle Adobe OAuth Callback
 */
const callback = asyncHandler(async (req, res) => {
    const { code } = req.query;
    if (!code) throw ApiError.badRequest('Authorization code is missing');

    const tokens = await frameioAuth.exchangeCode(code);
    tokenStore.saveTokens(tokens);

    // Redirect back to the frontend app (Review page)
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.send(`
        <html>
            <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: white;">
                <div style="text-align: center;">
                    <h2 style="color: #10b981;">✅ Authorized Successfully!</h2>
                    <p>Frame.io V4 is now connected. You can close this tab.</p>
                    <script>
                        setTimeout(() => { window.location.href = "${frontendUrl}/review"; }, 2000);
                    </script>
                </div>
            </body>
        </html>
    `);
});

/* ------------------------------------------------------------------ */
/*  Account                                                           */
/* ------------------------------------------------------------------ */

const getMe = asyncHandler(async (_req, res) => {
    try {
        const user = await frameioService.getMe();
        sendSuccess(res, { user }, 'Frame.io connection verified');
    } catch (err) {
        handleFrameioError(err);
    }
});

const getProjects = asyncHandler(async (_req, res) => {
    try {
        const projects = await frameioService.getProjects();
        sendSuccess(res, { projects }, 'Projects retrieved');
    } catch (err) {
        handleFrameioError(err);
    }
});

const getTeams = asyncHandler(async (_req, res) => {
    try {
        const teams = await frameioService.getTeams();
        sendSuccess(res, { teams }, 'Teams retrieved');
    } catch (err) {
        handleFrameioError(err);
    }
});

/* ------------------------------------------------------------------ */
/*  Assets                                                            */
/* ------------------------------------------------------------------ */

const getAssets = asyncHandler(async (req, res) => {
    try {
        const { projectId } = req.params;
        const assets = await frameioService.getAssets(projectId, req.query);
        sendSuccess(res, { assets }, 'Assets retrieved');
    } catch (err) {
        handleFrameioError(err);
    }
});

const getAsset = asyncHandler(async (req, res) => {
    try {
        const { assetId } = req.params;
        const asset = await frameioService.getAsset(assetId);
        sendSuccess(res, { asset }, 'Asset retrieved');
    } catch (err) {
        handleFrameioError(err);
    }
});

/* ------------------------------------------------------------------ */
/*  Comments                                                          */
/* ------------------------------------------------------------------ */

const getComments = asyncHandler(async (req, res) => {
    try {
        const { assetId } = req.params;
        const comments = await frameioService.getComments(assetId);
        sendSuccess(res, { comments }, 'Comments retrieved');
    } catch (err) {
        handleFrameioError(err);
    }
});

const createComment = asyncHandler(async (req, res) => {
    try {
        const { assetId } = req.params;
        const { text, timestamp } = req.body;
        if (!text || typeof text !== 'string' || !text.trim()) {
            throw ApiError.badRequest('Comment text is required');
        }
        const payload = { text: text.trim() };
        if (timestamp !== undefined && timestamp !== null) {
            payload.timestamp = Number(timestamp);
        }
        const comment = await frameioService.createComment(assetId, payload);
        sendSuccess(res, { comment }, 'Comment created', 201);
    } catch (err) {
        handleFrameioError(err);
    }
});

const updateComment = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        if (!text || typeof text !== 'string' || !text.trim()) {
            throw ApiError.badRequest('Comment text is required');
        }
        const comment = await frameioService.updateComment(commentId, { text: text.trim() });
        sendSuccess(res, { comment }, 'Comment updated');
    } catch (err) {
        handleFrameioError(err);
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;
        await frameioService.deleteComment(commentId);
        sendSuccess(res, null, 'Comment deleted');
    } catch (err) {
        handleFrameioError(err);
    }
});

/* ------------------------------------------------------------------ */
/*  Exports                                                           */
/* ------------------------------------------------------------------ */

module.exports = {
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
};
