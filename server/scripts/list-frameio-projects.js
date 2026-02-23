/**
 * Direct ID Check for New Video
 * =============================
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const axios = require('axios');

const FRAMEIO_BASE = 'https://api.frame.io/v2';
const token = process.env.FRAMEIO_TOKEN;

// IDs from the user's new URL
const urlProjectId = '890548cd-d724-404a-9f8b-88a59a672b7e';
const urlAssetId = 'dd1fe8ca-9f5d-413d-bb49-e6807ae128bf';

async function run() {
    if (!token) {
        console.error('FRAMEIO_TOKEN not found.');
        process.exit(1);
    }

    const client = axios.create({
        baseURL: FRAMEIO_BASE,
        headers: { Authorization: `Bearer ${token}` },
    });

    try {
        console.log(`\x1b[36m--- Checking New Asset ID: ${urlAssetId} ---\x1b[0m`);
        try {
            const { data: a } = await client.get(`/assets/${urlAssetId}`);
            console.log(`\x1b[32mBingo! Access Granted to Asset.\x1b[0m`);
            console.log(`Name: ${a.name}`);
            console.log(`Project ID: ${a.project_id}`);

            // In Frame.io, to list siblings of this asset or files in the project,
            // we need the parent ID (root_asset_id if it's at the top level).
            console.log(`Parent ID: ${a.parent_id}`);

            // Let's try to get the project itself now that we have access to an asset in it
            console.log(`\n\x1b[36m--- Checking Parent Project: ${a.project_id} ---\x1b[0m`);
            const { data: p } = await client.get(`/projects/${a.project_id}`);
            console.log(`Project Name: ${p.name}`);
            console.log(`\x1b[1mROOT_ASSET_ID:\x1b[0m \x1b[32m${p.root_asset_id}\x1b[0m`);

            console.log('\n\x1b[35m[Action] Copy this ID into your .env files:\x1b[0m');
            console.log(`FRAMEIO_ROOT_ASSET_ID=${p.root_asset_id}`);

        } catch (e) {
            console.log(`\x1b[31mFailed to access Asset ${urlAssetId}: ${e.response?.status} - ${e.response?.data?.message || e.message}\x1b[0m`);
        }

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}
run();
