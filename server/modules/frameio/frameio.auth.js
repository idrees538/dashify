const axios = require('axios');
const ApiError = require('../../core/ApiError');

/**
 * Frame.io V4 Auth Helper
 * =======================
 * Handles OAuth 2.0 flow with Adobe Identity Management System (IMS).
 */

const ADOBE_IMS_BASE = 'https://ims-na1.adobelogin.com/ims/token/v3';

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
async function refreshToken(refreshToken) {
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

/**
 * Generate the Adobe Login URL for the user.
 */
function getLoginUrl() {
    const { FRAMEIO_CLIENT_ID, FRAMEIO_REDIRECT_URI } = process.env;
    const scope = 'openid,AdobeID,frameio_api,offline_access';

    return `https://ims-na1.adobelogin.com/ims/authorize/v2?client_id=${FRAMEIO_CLIENT_ID}&redirect_uri=${FRAMEIO_REDIRECT_URI}&scope=${scope}&response_type=code`;
}

module.exports = {
    exchangeCode,
    refreshToken,
    getLoginUrl
};
