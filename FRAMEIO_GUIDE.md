# Frame.io V4 Integration Guide
 
This project uses the **Frame.io V4 API** (part of the Adobe Developer Console) to sync video drafts and notes.

## �️ How to Set Up V4 (Adobe Developer)

Legacy Developer Tokens from `developer.frame.io` will **not work** with Next/V4 projects. Follow these steps:

1.  **Go to Adobe Developer Console:** Visit [developer.adobe.com/console](https://developer.adobe.com/console).
2.  **Select Your Project:** Open the project you created for Frame.io.
3.  **Get Credentials:**
    *   **Client ID:** Copy the "Client ID (API Key)".
    *   **Client Secret:** Click "Retrieve Client Secret" and copy it.
4.  **Configure Redirect URI:** Ensure your project has `http://localhost:5000/api/frameio/callback` added to the **Redirect URI** list.
5.  **Update `.env`:**
    ```bash
    FRAMEIO_CLIENT_ID=your-client-id
    FRAMEIO_CLIENT_SECRET=your-client-secret
    ```

---

## 🔐 Authentication Flow

Dashify uses OAuth 2.0 to securely connect to your Frame.io account.

1.  **Trigger Login:** Visit `https://localhost:5000/api/frameio/login` in your browser.
2.  **Authorize:** You will be redirected to Adobe to log in and authorize Dashify.
3.  **Redirect:** After authorizing, you will be redirected back to Dashify.
4.  **Auto-Refresh:** The app will automatically handle token refreshing in the background.

---

## 🏗️ V4 Architecture

- **Auth Helper:** `server/modules/frameio/frameio.auth.js` manages the OAuth handshake.
- **Token Store:** `server/data/frameio-tokens.json` (local dev) stores the active session tokens.
- **V4 Service:** `server/modules/frameio/frameio.service.js` uses the `/v4` endpoints for files, folders, and comments.

---

## 🛠️ Troubleshooting

- **401 Unauthorized:** Your session might have expired. Visit the `/login` URL again.
- **403 Forbidden:** Ensure your Adobe Developer project has the **Frame.io API** service added with the correct permission scopes.
- **404 Not Found:** Double-check your `FRAMEIO_ROOT_ASSET_ID` in `.env`. For V4, this is usually the ID of the folder where your videos are located.

---
*Last Updated: Feb 22, 2026*
