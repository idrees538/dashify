# Admin & Credit System — Complete Flow Documentation

> **Last Updated:** March 9, 2026  
> **Covers:** Credit System, Booking Request Workflow, Subscription Management, Admin Dashboard

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Database Models (Schemas)](#2-database-models)
3. [Credit System — Rules & Logic](#3-credit-system)
4. [Booking Request Workflow](#4-booking-request-workflow)
5. [Subscription Management](#5-subscription-management)
6. [API Reference — All Endpoints](#6-api-reference)
7. [Admin Dashboard (React App)](#7-admin-dashboard)
8. [Client Credits Page](#8-client-credits-page)
9. [Authentication & Authorization](#9-authentication--authorization)
10. [File Structure](#10-file-structure)
11. [How to Run](#11-how-to-run)

---

## 1. System Overview

The Dashify credit system operates as a monthly subscription model where users pay a recurring fee and receive credits they can spend on creative deliverables (performance videos, photography, reports, etc.). An admin reviews and approves shoot requests, manages subscriptions, and handles credit allocation.

### High-Level Flow

```
New User Signs Up
       │
       ▼
Admin Activates Subscription ($375 first month)
       │
       ▼
System Grants 10 Credits to User
       │
       ▼
User Selects Deliverables & Submits Booking Request
       │
       ▼
Admin Reviews → Approves (credits deducted, shoot date set)
           └──→ OR Rejects (user notified, no credits deducted)
       │
       ▼
Month Ends → Admin Renews Subscription ($275 consecutive)
       │     └──→ Unused credits roll over (max 20 total)
       │
       ▼
If User Doesn't Renew → Subscription Lapses
       └──→ Next activation resets to $375
```

### Key Business Rules

| Rule | Detail |
|------|--------|
| Credits per cycle | 10 credits granted each month |
| Maximum credits | 20 total (10 new + up to 10 rollover) |
| Minimum for shoot | 10 credits required in bank to request a shoot |
| Shoots per month | Maximum 1 approved shoot per calendar month |
| First month price | $375 |
| Consecutive months | $275/month |
| After lapse | Resets to $375 on reactivation |
| Rollover | Unused credits carry forward 1 month only |

---

## 2. Database Models

### 2.1 CreditBank (`credit.model.js`)

Each user has exactly one `CreditBank` document that tracks their credit balance.

**File:** `server/modules/credit/credit.model.js`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `user` | ObjectId (ref: User) | — | The user this bank belongs to (unique) |
| `totalCredits` | Number | 10 | Total credits allocated this cycle |
| `usedCredits` | Number | 0 | Credits spent (deducted from totalCredits) |
| `rolloverCredits` | Number | 0 | Credits rolled over from previous cycle |
| `lastCycleDate` | Date | null | Date of the most recent credit cycle grant |
| `cycleCredits` | Number | 10 | Fresh credits granted this cycle (always 10) |
| `expiresAt` | Date | null | When rollover credits expire |
| `timestamps` | — | — | `createdAt`, `updatedAt` auto-managed |

**Virtual Field:**
- `remainingCredits` = `totalCredits - usedCredits` (computed, not stored)

**Example Document:**
```json
{
  "_id": "665a1b...",
  "user": "664f9c...",
  "totalCredits": 15,
  "usedCredits": 3,
  "rolloverCredits": 5,
  "lastCycleDate": "2026-03-01T00:00:00Z",
  "cycleCredits": 10,
  "expiresAt": "2026-04-01T00:00:00Z",
  "remainingCredits": 12
}
```

### 2.2 Transaction (`credit.model.js`)

Every credit movement (grant, deduction, purchase, rollover) is recorded as a `Transaction`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `user` | ObjectId (ref: User) | — | User this transaction belongs to |
| `type` | String (enum) | — | `"debit"` or `"credit"` |
| `amount` | Number | — | Number of credits (min: 0) |
| `description` | String | `""` | Human-readable description |
| `category` | String (enum) | `"Other"` | One of: `Performance Video`, `Day in the Life`, `Visualizer`, `Report`, `Photography`, `Purchase`, `Rollover`, `Subscription`, `Other` |
| `reference` | ObjectId | — | Optional reference to a Video or Project |
| `referenceModel` | String (enum) | — | `"Video"` or `"Project"` |
| `timestamps` | — | — | `createdAt`, `updatedAt` |

**Indexes:** `{ user: 1, createdAt: -1 }`

### 2.3 BookingRequest (`booking.model.js`)

A user submits a booking request to schedule a shoot. Admin approves or rejects.

**File:** `server/modules/credit/booking.model.js`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `user` | ObjectId (ref: User) | — | The requesting user |
| `deliverables` | Array of Deliverable | — | List of requested items (min 1) |
| `totalCredits` | Number | — | Sum of all deliverable credit costs |
| `status` | String (enum) | `"pending"` | `pending` → `approved` / `rejected` / `cancelled` |
| `adminNotes` | String | `""` | Admin's notes (reason for rejection, etc.) |
| `approvedBy` | ObjectId (ref: User) | null | Admin who approved |
| `approvedAt` | Date | null | When approved |
| `shootDate` | Date | null | Scheduled shoot date |
| `shootMonth` | Number | null | Month of shoot (1-12), used for one-per-month check |
| `shootYear` | Number | null | Year of shoot, used for one-per-month check |
| `timestamps` | — | — | `createdAt`, `updatedAt` |

**Deliverable Sub-Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `type` | String (enum) | `Performance Video`, `Day in the Life`, `Visualizer`, `Photography`, `Report`, `Other` |
| `creditCost` | Number (min: 1) | Cost in credits for this deliverable |
| `label` | String | Optional label assigned by admin on approval |

**Indexes:**
- `{ user: 1, status: 1 }`
- `{ status: 1, createdAt: -1 }`
- `{ user: 1, shootMonth: 1, shootYear: 1 }`

**Status Lifecycle:**
```
pending ──→ approved (admin approves, credits deducted)
        ├─→ rejected (admin rejects, no credit change)
        └─→ cancelled (user cancels before review)
```

### 2.4 Subscription (`subscription.model.js`)

Tracks recurring payment cycles and pricing tier logic.

**File:** `server/modules/credit/subscription.model.js`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `user` | ObjectId (ref: User) | — | User (unique — one subscription per user) |
| `status` | String (enum) | `"active"` | `active`, `cancelled`, `lapsed` |
| `currentCycleStart` | Date | — | Start of current billing cycle |
| `currentCycleEnd` | Date | — | End of current billing cycle |
| `consecutiveMonths` | Number | 1 | How many months continuously subscribed |
| `priceThisCycle` | Number | — | Price charged this cycle ($375 or $275) |
| `stripeSubscriptionId` | String | `""` | For future Stripe integration |
| `history` | Array of CycleHistory | `[]` | Full payment history |
| `timestamps` | — | — | `createdAt`, `updatedAt` |

**CycleHistory Sub-Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `cycleStart` | Date | Start of this cycle |
| `cycleEnd` | Date | End of this cycle |
| `price` | Number | Price paid for this cycle |
| `paidAt` | Date | When payment was made |

**Static Constants:**
- `Subscription.FIRST_MONTH_PRICE` = `375`
- `Subscription.CONSECUTIVE_PRICE` = `275`

---

## 3. Credit System

### 3.1 Credit Granting (Cycle Logic)

When a subscription is activated or renewed, the system runs `grantCycleCredits(userId)`:

```
1. Find the user's CreditBank (create one if first time)
2. Calculate rollover:
   - remaining = totalCredits - usedCredits
   - rollover  = min(remaining, MAX_CREDITS - CREDITS_PER_CYCLE)
   - This means rollover is capped so the new total never exceeds 20
3. Reset the bank:
   - rolloverCredits = rollover
   - totalCredits = 10 + rollover
   - usedCredits = 0
   - cycleCredits = 10
   - lastCycleDate = now
   - expiresAt = now + 1 month
4. Create a Transaction record:
   - type: "credit", amount: 10, category: "Subscription"
```

**Example Scenarios:**

| Scenario | Previous Remaining | Rollover | New Total |
|----------|-------------------|----------|-----------|
| Used all 10 credits | 0 | 0 | 10 |
| Used 7, has 3 left | 3 | 3 | 13 |
| Used 0, has 10 left | 10 | 10 | 20 (max) |
| Had 15 total, used 3 (12 remaining) | 12 | 10 | 20 (capped) |

### 3.2 Shoot Eligibility Check

A user can request a shoot if **both** conditions are true:
1. `remainingCredits >= 10` (minimum credit threshold)
2. No approved booking exists for the current calendar month

The `GET /api/credits/summary` endpoint returns:
```json
{
  "canRequestShoot": true,
  "shootEligibility": {
    "hasMinCredits": true,
    "noShootThisMonth": true,
    "creditsNeeded": 0
  }
}
```

### 3.3 Credit Deduction

Credits are only deducted when an admin **approves** a booking request. The deduction equals the sum of all `deliverable.creditCost` values in the request.

Each deliverable generates its own Transaction record:
```json
{
  "type": "debit",
  "amount": 5,
  "description": "Booking: Performance Video - Song Title Here",
  "category": "Performance Video"
}
```

### 3.4 Manual Credit Management (Admin)

Admins can manually grant or deduct credits through:
- `POST /api/admin/credits/grant` — adds credits (cannot exceed 20 total)
- `POST /api/admin/credits/deduct` — removes credits (cannot exceed remaining balance)

Both create corresponding Transaction records for audit trail.

---

## 4. Booking Request Workflow

### 4.1 User Creates Request

**Endpoint:** `POST /api/credits/booking`

**Request Body:**
```json
{
  "deliverables": [
    { "type": "Performance Video", "creditCost": 5 },
    { "type": "Photography", "creditCost": 2 },
    { "type": "Report", "creditCost": 1 }
  ]
}
```

**Validations performed:**
1. ✅ At least one deliverable required
2. ✅ Each deliverable type must be one of the valid enum values
3. ✅ Each `creditCost` must be >= 1
4. ✅ User's `remainingCredits` must be >= 10 (minimum threshold)
5. ✅ User's `remainingCredits` must be >= total request cost
6. ✅ No approved booking for the current month already exists

**On success:** Creates a `BookingRequest` with status `"pending"`.

> **Note:** Credits are NOT deducted at this point. They are only deducted on admin approval.

### 4.2 Admin Reviews Request

The admin sees all pending requests on the admin dashboard's **Bookings** page.

#### Approving (PUT /api/credits/booking/:id/approve)

**Request Body:**
```json
{
  "shootDate": "2026-03-15",
  "adminNotes": "Scheduled for next Tuesday",
  "deliverables": [
    { "type": "Performance Video", "creditCost": 5, "label": "Summer Anthem MV" },
    { "type": "Photography", "creditCost": 2, "label": "Album Cover Shoot" }
  ]
}
```

**What happens on approval:**
1. If admin provides updated deliverables (with labels/adjusted costs), they replace the original array
2. `totalCredits` is recalculated from the updated deliverables
3. System verifies user still has enough credits
4. `bank.usedCredits += booking.totalCredits` (credits deducted)
5. A `Transaction` (debit) is created for **each** deliverable
6. Shoot date, month, and year are recorded on the booking
7. Status changes to `"approved"`, admin identity and timestamp are saved

#### Rejecting (PUT /api/credits/booking/:id/reject)

**Request Body:**
```json
{
  "adminNotes": "Not enough deliverable detail provided, please resubmit"
}
```

Status changes to `"rejected"`. **No credits are deducted.**

### 4.3 User Cancels Request

**Endpoint:** `DELETE /api/credits/booking/:id`

Users can cancel their own booking if it's still `"pending"`. Once approved or rejected, it cannot be cancelled. Status changes to `"cancelled"`.

### 4.4 Complete Status Flow

```
                    ┌─── User submits ───→ PENDING
                    │                         │
                    │            ┌─────────────┼─────────────┐
                    │            │             │             │
                    │         Admin          Admin         User
                    │        Approves       Rejects       Cancels
                    │            │             │             │
                    │            ▼             ▼             ▼
                    │        APPROVED      REJECTED      CANCELLED
                    │      (credits        (no credit    (no credit
                    │       deducted)      change)       change)
```

---

## 5. Subscription Management

### 5.1 Pricing Tiers

| Condition | Price |
|-----------|-------|
| First month (new user) | **$375** |
| Consecutive months (2nd, 3rd, ...) | **$275** |
| After a lapse (reactivation) | **$375** (resets) |

### 5.2 Activation (`POST /api/credits/subscription/activate`)

**Request Body:**
```json
{ "userId": "664f9c..." }
```

**What happens:**
1. Checks if user already has an active subscription (blocks if yes)
2. If user had a previous lapsed subscription → reactivate it (reset `consecutiveMonths` to 1)
3. If user never had a subscription → create a new one
4. Price set to `$375` (first month)
5. Cycle: `currentCycleStart = now`, `currentCycleEnd = now + 1 month`
6. History entry appended
7. `grantCycleCredits(userId)` runs → grants 10 credits

### 5.3 Renewal (`POST /api/credits/subscription/renew`)

**Request Body:**
```json
{ "userId": "664f9c..." }
```

**What happens:**
1. Must be an `"active"` subscription (can't renew lapsed/cancelled)
2. `consecutiveMonths += 1`
3. Price set to `$275` (consecutive)
4. New cycle dates calculated
5. History entry appended
6. `grantCycleCredits(userId)` runs → grants 10 credits + applies rollover logic

### 5.4 Lapse (`POST /api/credits/subscription/lapse`)

**Request Body:**
```json
{ "userId": "664f9c..." }
```

**What happens:**
1. Status changes to `"lapsed"`
2. `consecutiveMonths` resets to `0`
3. **No credits are revoked** — the user keeps any remaining credits
4. Next activation will charge $375 again

### 5.5 Subscription Status Lifecycle

```
(New User)  ────→  ACTIVE  ─── renew ($275) ───→  ACTIVE
                      │                                │
                    lapse                            lapse
                      │                                │
                      ▼                                ▼
                   LAPSED  ─── activate ($375) ──→  ACTIVE
```

---

## 6. API Reference

All endpoints are prefixed with `/api`. All protected endpoints require a `Bearer` token in the `Authorization` header.

### 6.1 Credit Endpoints (`/api/credits/...`)

All require authentication (`protect` middleware).

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/credits/summary` | User | Credit bank + subscription + shoot eligibility + latest booking |
| `GET` | `/credits/transactions` | User | Paginated transaction history (`?page=&limit=&type=&category=`) |
| `GET` | `/credits/breakdown` | User | Credits used per category (aggregation) |
| `GET` | `/credits/stats` | User | Total assigned, utilization %, most/least frequent category, monthly usage |
| `POST` | `/credits/redeem` | User | Manually redeem credits (`{ amount, description, category }`) |
| `POST` | `/credits/add` | User | Add credits (`{ amount, description }`) |

### 6.2 Booking Endpoints (`/api/credits/booking/...`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/credits/booking` | User | Submit a booking request with deliverables |
| `GET` | `/credits/booking` | User | List own booking requests (`?page=&limit=&status=`) |
| `DELETE` | `/credits/booking/:id` | User | Cancel a pending booking request |
| `GET` | `/credits/booking/all` | **Admin** | List all booking requests with user info (`?page=&limit=&status=&userId=`) |
| `PUT` | `/credits/booking/:id/approve` | **Admin** | Approve request (`{ shootDate, adminNotes, deliverables }`) |
| `PUT` | `/credits/booking/:id/reject` | **Admin** | Reject request (`{ adminNotes }`) |

### 6.3 Subscription Endpoints (`/api/credits/subscription/...`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/credits/subscription` | User | Get own subscription status |
| `GET` | `/credits/subscription/all` | **Admin** | List all subscriptions (`?page=&limit=&status=`) |
| `POST` | `/credits/subscription/activate` | **Admin** | Activate subscription for user (`{ userId }`) — $375 |
| `POST` | `/credits/subscription/renew` | **Admin** | Renew active subscription (`{ userId }`) — $275 |
| `POST` | `/credits/subscription/lapse` | **Admin** | Mark subscription as lapsed (`{ userId }`) |

### 6.4 Admin Endpoints (`/api/admin/...`)

All require `protect` + `adminOnly` middleware.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/stats` | Platform stats: user/project/video counts, credit totals, active subscriptions, pending bookings, recent users |
| `GET` | `/admin/users` | All users enriched with creditBank + subscription data (`?page=&limit=&search=`) |
| `PUT` | `/admin/users/:id/role` | Change user role (`{ role: "user" \| "admin" }`) |
| `GET` | `/admin/credits` | All credit banks with user info (`?page=&limit=`) |
| `POST` | `/admin/credits/grant` | Manually grant credits (`{ userId, amount, description }`) — max 20 total |
| `POST` | `/admin/credits/deduct` | Manually deduct credits (`{ userId, amount, description }`) — can't exceed remaining |

### 6.5 API Response Format

All API responses follow this structure:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Description of what happened"
}
```

**Paginated Success:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "pages": 3
  },
  "message": "Description"
}
```

**Error:**
```json
{
  "success": false,
  "message": "What went wrong",
  "errors": [
    { "field": "email", "message": "email is required" }
  ]
}
```

---

## 7. Admin Dashboard

The admin dashboard is a **separate React application** located at `admin/`.

### 7.1 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI framework |
| Vite | 7.x | Build tool + dev server |
| Tailwind CSS | 4.x | Styling (via `@tailwindcss/vite` plugin) |
| React Router DOM | 7.x | Client-side routing |
| React Icons | 5.x | Icons (Ionicons set) |

### 7.2 Pages

| Page | Route | File | Description |
|------|-------|------|-------------|
| **Login** | `/login` | `src/pages/Login.jsx` | Admin-only login form. Rejects non-admin users with "Access denied" error. |
| **Dashboard** | `/` | `src/pages/Dashboard.jsx` | KPI cards: users, projects, videos, credits allocated/used, active subscriptions, pending bookings. Recent users list. |
| **Users** | `/users` | `src/pages/Users.jsx` | Searchable, paginated user table with credit bank balance and subscription status per user. |
| **Bookings** | `/bookings` | `src/pages/BookingRequests.jsx` | Filter by status. Approve/reject modals with shoot date picker and admin notes. |
| **Credits** | `/credits` | `src/pages/Credits.jsx` | All users' credit banks in a table. Grant/deduct modals with amount and description. |
| **Subscriptions** | `/subscriptions` | `src/pages/Subscriptions.jsx` | Filter by status. Activate new, renew, lapse, reactivate actions. Pricing displayed. |

### 7.3 Authentication Flow

1. Admin enters email + password on `/login`
2. `api.post('/auth/login', { email, password })` — same auth endpoint as client
3. Response includes `{ token, user }`
4. If `user.role !== 'admin'` → error thrown: "Access denied. Admin privileges required."
5. Token stored in `localStorage` as `dashify_admin_token` (separate from client's `dashify_token`)
6. On page load, `GET /api/auth/me` validates stored token. If user is no longer admin, token is cleared.

### 7.4 API Service

`admin/src/services/api.js` — thin fetch wrapper:
- Auto-attaches `Bearer` token from localStorage
- Checks `Content-Type` before parsing JSON (prevents crash on non-JSON responses)
- Query params passed as object: `api.get('/admin/users', { page: 1, search: 'john' })`

### 7.5 Layout

- Fixed sidebar (240px) with navigation links + user avatar + logout button
- Main content area scrolls independently
- Dark theme (bg: `#0a0a0f`, accent: `#7c5cfc`)

---

## 8. Client Credits Page

**File:** `client/src/pages/credits/index.jsx`

The client-facing credits page fetches all data from the API on mount.

### API Calls Made on Load

| API Call | Purpose |
|----------|---------|
| `GET /api/credits/summary` | Credit bank, subscription, shoot eligibility, latest booking |
| `GET /api/credits/transactions?limit=10` | Recent transactions |
| `GET /api/credits/stats` | Statistics (total assigned, utilization, category frequencies) |
| `GET /api/credits/breakdown` | Category-wise credit usage for the bar chart |
| `GET /api/credits/booking?limit=5` | User's recent booking requests |

### Features

1. **Credit Summary Card** — Progress bar showing remaining/total credits, 4 stat circles (owned, remaining, rollover, expiration)
2. **Shoot Eligibility** — "Request Shoot" button if eligible, otherwise shows reason (need X more credits / already booked this month)
3. **Request Shoot Modal** — Select deliverables with checkboxes, see total credit cost, validate against remaining balance, submit
4. **Booking Request Timeline** — Shows latest booking's status progression (Submitted → Review → Credit Assignment → Confirmed)
5. **Credits by Category Chart** — Vertical bar chart from aggregated category breakdown
6. **Credit Statistics Grid** — Total assigned, most/least frequent category, total transactions, utilization %
7. **Recent Transactions** — List of latest 10 transactions with date, category, and credit amount

### Deliverable Options (in Request Modal)

| Deliverable | Default Cost |
|-------------|-------------|
| Performance Video | 5 credits |
| Day in the Life | 3 credits |
| Visualizer | 4 credits |
| Photography | 2 credits |
| Report | 1 credit |

---

## 9. Authentication & Authorization

### Middleware Stack

1. **`protect`** (`server/middleware/auth.js`)
   - Extracts JWT from `Authorization: Bearer <token>` header
   - Verifies token with `JWT_SECRET`
   - Attaches `req.user` from database
   - Throws 401 if token is missing, invalid, or expired

2. **`adminOnly`** (`server/middleware/adminOnly.js`)
   - Runs after `protect`
   - Checks `req.user.role === 'admin'`
   - Throws 403 if not admin

### Route Protection

| Route Group | Middleware |
|-------------|-----------|
| `/api/credits/*` | `protect` (all routes) |
| `/api/credits/booking/all`, `booking/:id/approve`, `booking/:id/reject` | `protect` + `adminOnly` |
| `/api/credits/subscription/all`, `subscription/activate`, `subscription/renew`, `subscription/lapse` | `protect` + `adminOnly` |
| `/api/admin/*` | `protect` + `adminOnly` (applied at router level) |

---

## 10. File Structure

```
server/
├── modules/
│   ├── credit/
│   │   ├── credit.model.js          # CreditBank + Transaction schemas
│   │   ├── credit.controller.js     # Summary, transactions, redeem, add, stats, breakdown
│   │   ├── credit.routes.js         # All credit/booking/subscription routes
│   │   ├── booking.model.js         # BookingRequest schema
│   │   ├── booking.controller.js    # Create, list, cancel, approve, reject bookings
│   │   ├── subscription.model.js    # Subscription schema
│   │   └── subscription.controller.js # Get, activate, renew, lapse subscriptions
│   └── admin/
│       ├── admin.controller.js      # Dashboard stats, users, credit grant/deduct
│       └── admin.routes.js          # Admin route definitions
├── middleware/
│   ├── auth.js                      # JWT protect middleware
│   └── adminOnly.js                 # Admin role check middleware
├── routes/
│   └── index.js                     # Main router (mounts all module routes)
└── server.js                        # Server entry (HTTPS + MongoDB connection)

admin/
├── package.json
├── vite.config.js                   # Vite config (port 5174, HTTPS proxy to :3001)
├── postcss.config.js                # Tailwind v4 PostCSS config
├── index.html
└── src/
    ├── main.jsx                     # Entry point
    ├── App.jsx                      # Routing setup
    ├── tailwind.css                  # Tailwind v4 theme + global styles
    ├── services/
    │   └── api.js                   # Fetch-based API client
    ├── contexts/
    │   └── AuthContext.jsx          # Admin auth context (login/logout/token)
    ├── components/
    │   └── Layout.jsx               # Sidebar + main content layout
    └── pages/
        ├── Login.jsx                # Admin login form
        ├── Dashboard.jsx            # KPI stats overview
        ├── Users.jsx                # User management table
        ├── BookingRequests.jsx      # Booking approve/reject UI
        ├── Credits.jsx              # Credit bank management
        └── Subscriptions.jsx        # Subscription lifecycle controls

client/
└── src/
    └── pages/
        └── credits/
            └── index.jsx            # User-facing credits page (live API data)
```

---

## 11. How to Run

### Backend Server
```bash
cd server
npm install
# Create .env with MONGO_URI, JWT_SECRET, PORT=3001
npm run dev    # → https://localhost:3001 (HTTPS with self-signed certs)
```

### Client Dashboard
```bash
cd client
npm install
npm run dev    # → http://localhost:3000
```

### Admin Dashboard
```bash
cd admin
npm install
npm run dev    # → http://localhost:5174
```

### Environment Variables

**`server/.env`:**
```
PORT=3001
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
```

### Creating an Admin User

1. Register a regular user via the client app or API
2. Use a MongoDB tool (MongoDB Compass, `mongosh`, etc.) to update their role:
   ```js
   db.users.updateOne({ email: "admin@dashify.com" }, { $set: { role: "admin" } })
   ```
3. Log into the admin dashboard at `http://localhost:5174` with those credentials

---

## Quick Reference: Complete User Journey

```
1. NEW USER signs up via client app
     └─→ User document created, CreditBank auto-created with 10 credits

2. ADMIN activates subscription ($375)
     └─→ Subscription created (status: active, consecutiveMonths: 1)
     └─→ CreditBank reset: totalCredits=10, usedCredits=0, rolloverCredits=0
     └─→ Transaction created: type=credit, amount=10, category=Subscription

3. USER requests a shoot (selects deliverables)
     └─→ System validates: ≥10 credits, no approved shoot this month
     └─→ BookingRequest created: status=pending, totalCredits=sum of costs

4. ADMIN reviews and approves (sets shoot date, labels deliverables)
     └─→ CreditBank.usedCredits += totalCredits (credits deducted)
     └─→ Transaction created per deliverable (type=debit)
     └─→ BookingRequest: status=approved, shootDate set, approvedBy set

5. MONTH ENDS — ADMIN renews subscription ($275)
     └─→ consecutiveMonths += 1
     └─→ Rollover: remaining credits carried forward (max 20 total)
     └─→ CreditBank reset with new cycle: totalCredits = 10 + rollover
     └─→ Transaction created: type=credit, amount=10, category=Subscription

6. IF USER DOESN'T RENEW — ADMIN lapses subscription
     └─→ status = lapsed, consecutiveMonths = 0
     └─→ Credits remain but no new ones granted
     └─→ Next activation = $375 again
```
