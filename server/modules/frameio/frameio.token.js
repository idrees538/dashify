const fs = require('fs');
const path = require('path');

/**
 * Singleton Token Store
 * =====================
 * Simple file-based storage for the OAuth tokens.
 * In production, this should be moved to MongoDB.
 */

const TOKEN_PATH = path.resolve(__dirname, '../../data/frameio-tokens.json');

function saveTokens(tokens) {
    const data = {
        ...tokens,
        updatedAt: new Date().toISOString()
    };

    // Ensure data directory exists
    const dir = path.dirname(TOKEN_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(data, null, 2));
}

function getTokens() {
    if (!fs.existsSync(TOKEN_PATH)) return null;
    try {
        return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    } catch (e) {
        return null;
    }
}

module.exports = {
    saveTokens,
    getTokens
};
