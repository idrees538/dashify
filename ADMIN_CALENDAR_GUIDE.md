# Admin Calendar Management Guide

This guide provides the technical specifications and requirements for implementing the Admin side of the Dashify booking system.

## Overview
The booking system relies on **Time Blocks** defined by an administrator. These blocks determine the availability shown to users when they book a "Shoot Day" or an "Intro Call".

## 1. Backend Infrastructure
The backend is already prepared with the following:

### Data Model: `TimeBlock`
Located at: `server/modules/calendar/timeBlock.model.js`

| Field | Type | Description |
| :--- | :--- | :--- |
| `dayOfWeek` | Number | 0 (Sunday) to 6 (Saturday) |
| `startTime` | String | Format "HH:mm" (e.g., "09:00") |
| `endTime` | String | Format "HH:mm" (e.g., "17:00") |
| `label` | String | Display label (e.g., "Morning Slot") |
| `type` | String | `shoot`, `call`, or `any` |
| `isActive` | Boolean | Whether the slot is currently bookable |

### API Endpoints
Defined in: `server/modules/calendar/calendar.routes.js`

- **GET `/api/calendar/time-blocks`**: Retrieves all active time blocks.
- **POST `/api/calendar/time-blocks`**: Creates a new time block. (Admin only)
- **DELETE/PATCH**: You may want to add `DELETE` and `UPDATE` endpoints in `calendar.controller.js` when building the UI.

---

## 2. Recommended Admin UI Tasks

To fully manage the system, you should implement the following in your Admin Panel:

### Slot Management Table
- A searchable list of all `TimeBlock` entries.
- Quick toggle to enable/disable (`isActive`) a slot.
- "Add New Slot" button opening a modal.

### Add/Edit Slot Modal
- **Dropdown for Day**: Sunday through Saturday.
- **Time Pickers**: For Start and End times.
- **Type Selector**: To restrict the slot to specific booking types.

---

## 3. Frontend Integration Logic
The `BookingModal` (`client/src/pages/calendar/components/BookingModal.jsx`) uses the following logic to filter blocks:

```javascript
const selectedDayOfWeek = new Date(selectedDate).getDay();
const availableBlocks = timeBlocks.filter(block => 
    block.dayOfWeek === selectedDayOfWeek && 
    (block.type === selectedType || block.type === 'any')
);
```

> [!IMPORTANT]
> **Timezone Warning**: When calculating the `dayOfWeek` from the date string (YYYY-MM-DD), ensure you don't use the standard `new Date(string)` which might shift the day based on the user's local timezone. Use a split-based method as implemented in the `BookingModal`.

---

## 4. Current Seed Data
You can refer to `server/seed.js` to see how example blocks are created.
- Mondays/Wednesdays/Fridays: Shoots
- Tuesdays/Thursdays: Calls
