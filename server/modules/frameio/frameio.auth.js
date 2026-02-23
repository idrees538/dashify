const axios = require('axios');
const ApiError = require('../../core/ApiError');

/**
 * Frame.io V4 Auth Helper
 * =======================
 * Handles OAuth 2.0 flow with Adobe Identity Management System (IMS).
 */

const ADOBE_IMS_BASE = 'https://ims-na1.adobelogin.com/ims/token/v3';
const ADOBE_IMS_AUTH = 'https://ims-na1.adobelogin.com/ims/authorize/v2';

// ✅ Exact correct scopes for Frame.io V4 API
const FRAMEIO_SCOPES = 'openid,email,profile,offline_access,additional_info.roles';

/**
 * Generate the Adobe Login URL for the user.
 * Fix: redirect_uri MUST be encodeURIComponent encoded
 */
function getLoginUrl() {
    const { FRAMEIO_CLIENT_ID, FRAMEIO_REDIRECT_URI } = process.env;

    if (!FRAMEIO_CLIENT_ID) throw new Error('FRAMEIO_CLIENT_ID is missing in .env');
    if (!FRAMEIO_REDIRECT_URI) throw new Error('FRAMEIO_REDIRECT_URI is missing in .env');

    const params = new URLSearchParams({
        client_id: FRAMEIO_CLIENT_ID,
        redirect_uri: FRAMEIO_REDIRECT_URI,   // URLSearchParams handles encoding ✅
        scope: FRAMEIO_SCOPES,
        response_type: 'code'
    });

    const url = `${ADOBE_IMS_AUTH}?${params.toString()}`;
    console.log('[Frame.io Auth] Login URL:', url); // helpful for debugging
    return url;
}

/**
 * Exchange authorization code for access and refresh tokens.
 * @param {string} code - The code from the redirect callback
 */
async function exchangeCode(code) {
    const {
        FRAMEIO_CLIENT_ID,
        FRAMEIO_CLIENT_SECRET,
        FRAMEIO_REDIRECT_URI
    } = process.env;

    if (!FRAMEIO_CLIENT_SECRET) {
        throw ApiError.badRequest('FRAMEIO_CLIENT_SECRET is missing in .env');
    }

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', FRAMEIO_CLIENT_ID);
        params.append('client_secret', FRAMEIO_CLIENT_SECRET);
        params.append('code', code);
        params.append('redirect_uri', FRAMEIO_REDIRECT_URI);

        const { data } = await axios.post(ADOBE_IMS_BASE, params);

        console.log('[Frame.io Auth] Token exchange successful ✅');

        return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in
        };
    } catch (err) {
        console.error('[Frame.io Auth] Code exchange failed:', err.response?.data || err.message);
        throw new Error('Failed to exchange Frame.io auth code');
    }
}

/**
 * Refresh an expired access token.
 * @param {string} refreshToken
 */
async function refreshAccessToken(refreshToken) {
    const {
        FRAMEIO_CLIENT_ID,
        FRAMEIO_CLIENT_SECRET
    } = process.env;

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('client_id', FRAMEIO_CLIENT_ID);
        params.append('client_secret', FRAMEIO_CLIENT_SECRET);
        params.append('refresh_token', refreshToken);

        const { data } = await axios.post(ADOBE_IMS_BASE, params);

        console.log('[Frame.io Auth] Token refreshed successfully ✅');

        return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in
        };
    } catch (err) {
        console.error('[Frame.io Auth] Token refresh failed:', err.response?.data || err.message);
        throw new Error('Failed to refresh Frame.io token');
    }
}

module.exports = {
    exchangeCode,
    refreshAccessToken,
    getLoginUrl
};