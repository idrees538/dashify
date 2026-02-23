# Frame.io V4 API Integration Documentation

This document provides a comprehensive guide to the Frame.io V4 integration within Dashify. It includes architecture details, implementation process, and `curl` examples for the exposed API endpoints.

## Architecture & Implementation Process

### 1. Backend Proxy (`server/modules/frameio/`)
The integration is built as a modular proxy to the Frame.io V4 API. This ensures tokens are never exposed to the frontend and provides a central point for refreshing OAuth sessions.

- **OAuth Handshake**: Managed by `frameio.auth.js`. It handles the 3-legged OAuth flow with Adobe Identity.
- **Service Layer**: `frameio.service.js` uses `axios` with an interceptor pattern to inject tokens and handle fallback to V2 for legacy asset lookups.
- **Controller/Routes**: Exposes a clean RESTful API for the frontend and third-party integrations.

### 2. Frontend Integration (`client/src/pages/review/`)
- **Visual Draft selection**: A card-based grid with real-time thumbnails.
- **HTML5 Player**: Direct streaming from Frame.io source URLs.
- **Notes Syncing**: Bi-directional syncing between the video timeline and the notes panel.

---

## 🚀 API Documentation & CURL Examples

All routes (except `/login` and `/callback`) require a valid session. In development, some read routes are public for ease of setup.

### Authentication

#### Login (Redirect)
```bash
# Visit this in a browser to trigger OAuth flow
http://localhost:5000/api/frameio/login
```

#### Get Current User
```bash
curl -X GET http://localhost:5000/api/frameio/me \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### Assets & Drafts

#### List Assets (Drafts)
```bash
curl -X GET "http://localhost:5000/api/frameio/projects/{projectId}/assets" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Get Specific Asset
```bash
curl -X GET "http://localhost:5000/api/frameio/assets/{assetId}" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### Comments (Review Notes)

#### List Comments
```bash
curl -X GET "http://localhost:5000/api/frameio/assets/{assetId}/comments" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Create a Note
```bash
curl -X POST "http://localhost:5000/api/frameio/assets/{assetId}/comments" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "Please move the logo 2 seconds later",
       "timestamp": 12.5
     }'
```

#### Toggle Note Resolution
```bash
curl -X PATCH "http://localhost:5000/api/frameio/comments/{commentId}/toggle" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "completed": true
     }'
```

---

### Permissions (Workspaces & Projects)

#### List Workspace Users
```bash
curl -X GET "http://localhost:5000/api/frameio/workspaces/{workspaceId}/users" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Update/Add User Role (Workspace)
```bash
curl -X PUT "http://localhost:5000/api/frameio/workspaces/{workspaceId}/users/{userId}" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "role": "editor"
     }'
```

#### Remove User from Project
```bash
curl -X DELETE "http://localhost:5000/api/frameio/projects/{projectId}/users/{userId}" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🛠️ Configuration

Set these in your server `.env`:
- `FRAMEIO_CLIENT_ID`: Your Adobe Developer Client ID.
- `FRAMEIO_CLIENT_SECRET`: Your Adobe Developer Client Secret.
- `FRAMEIO_TOKEN`: Legacy developer token (optional, for V2 fallback).
