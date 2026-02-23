/**
 * Frame.io Configuration
 * ======================
 * Centralised constants and mapping functions for Frame.io data.
 * Change this file to adjust how Frame.io data maps to the UI.
 *
 * To swap providers, update the mappers here and in frameioService.js.
 */

/* ------------------------------------------------------------------ */
/*  Status mappings                                                   */
/* ------------------------------------------------------------------ */

/**
 * Map Frame.io approval statuses to internal status values.
 * Frame.io statuses: 'approved', 'needs_review', 'in_progress', 'none'
 */
export const APPROVAL_STATUS_MAP = {
    approved: 'approved',
    needs_review: 'in-review',
    in_progress: 'in-review',
    none: 'draft',
};

/**
 * Colour palette for draft cards (cycles through).
 */
export const DRAFT_COLORS = ['purple', 'blue', 'green', 'orange', 'purple', 'blue'];

/* ------------------------------------------------------------------ */
/*  Data mappers                                                      */
/* ------------------------------------------------------------------ */

/**
 * Map a Frame.io asset object to the shape the Review UI expects.
 * @param {object} asset - Raw Frame.io asset
 * @param {number} index - For cycling colours
 * @returns {object} - { id, title, version, status, date, duration, durationSec, color, streamUrl }
 */
export function mapAssetToDraft(asset, index = 0) {
    const durationSec = asset.duration ? Math.round(asset.duration) : 0;
    const m = Math.floor(durationSec / 60);
    const s = Math.floor(durationSec % 60);

    // V4 sometimes uses asset.type, V2 uses asset._type
    const type = asset.type || asset._type || 'file';

    return {
        id: asset.id,
        title: asset.name || 'Untitled',
        version: asset.version || 1,
        status: APPROVAL_STATUS_MAP[asset.label] || APPROVAL_STATUS_MAP[asset.status] || 'draft',
        date: asset.inserted_at
            ? new Date(asset.inserted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '',
        duration: type === 'folder' ? '--:--' : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
        durationSec,
        color: DRAFT_COLORS[index % DRAFT_COLORS.length],
        // V4: stream_url, V2: original/h264
        streamUrl: asset.stream_url || asset.original || asset.h264_1080_best || null,
        // V4: thumbnails.high, V2: thumb/thumb_scrub
        thumbnailUrl: asset.thumbnails?.high || asset.thumb || asset.thumb_scrub || null,
        isFolder: type === 'folder',
    };
}

/**
 * Map a Frame.io comment object to the shape the Notes panel expects.
 * @param {object} comment - Raw Frame.io comment
 * @returns {object} - { id, author, text, timestamp, date, resolved }
 */
export function mapCommentToNote(comment) {
    // V4: user.name, V2: owner.name
    const author = comment.user?.name || comment.owner?.name || comment.user?.email || comment.owner?.email || 'Unknown';

    return {
        id: comment.id,
        author,
        text: comment.text || '',
        timestamp: comment.timestamp != null ? Math.round(comment.timestamp) : 0,
        date: comment.inserted_at
            ? new Date(comment.inserted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : '',
        resolved: comment.completed || false,
        // Keep the raw Frame.io comment ID for mutations
        frameioId: comment.id,
    };
}

/* ------------------------------------------------------------------ */
/*  Demo / fallback data                                              */
/* ------------------------------------------------------------------ */

export const DEMO_DRAFTS = [
    { id: 1, title: 'Brand Campaign — Final Cut', version: 3, status: 'in-review', date: 'Feb 17, 2026', duration: '03:45', durationSec: 225, color: 'purple' },
    { id: 2, title: 'Product Launch Teaser', version: 2, status: 'draft', date: 'Feb 15, 2026', duration: '01:52', durationSec: 112, color: 'blue' },
    { id: 3, title: 'Client Testimonial Reel', version: 1, status: 'approved', date: 'Feb 12, 2026', duration: '05:10', durationSec: 310, color: 'green' },
    { id: 4, title: 'Social Ads — Q1 Batch', version: 4, status: 'in-review', date: 'Feb 18, 2026', duration: '02:28', durationSec: 148, color: 'orange' },
];

export const DEMO_NOTES = {
    1: [
        { id: 101, author: 'Sarah K.', text: 'Logo appears too early — can we push to 0:15?', timestamp: 8, date: 'Feb 17', resolved: false },
        { id: 102, author: 'Mike D.', text: 'Audio transition here is perfect 🎵', timestamp: 45, date: 'Feb 17', resolved: true },
        { id: 103, author: 'Sarah K.', text: 'Colour grade feels a bit warm — try cooler tones', timestamp: 124, date: 'Feb 18', resolved: false },
    ],
    2: [
        { id: 201, author: 'Alex R.', text: 'Need a stronger hook in the first 3 seconds', timestamp: 2, date: 'Feb 15', resolved: false },
    ],
    3: [
        { id: 301, author: 'Client', text: 'Approved — ready to publish!', timestamp: 0, date: 'Feb 12', resolved: true },
    ],
    4: [],
};
