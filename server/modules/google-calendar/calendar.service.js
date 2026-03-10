/**
 * Google Calendar Service Stub
 * Handles syncing events with Google Calendar.
 * Currently a stub awaiting client credentials.
 */

const createCalendarEvent = async (eventDetails) => {
    console.log('[CALENDAR STUB] Creating event:', eventDetails);

    return {
        id: `mock_event_${Date.now()}`,
        status: 'confirmed',
        htmlLink: 'https://calendar.google.com/calendar/r/eventedit?text=Dashify+Shoot',
    };
};

const deleteCalendarEvent = async (eventId) => {
    console.log('[CALENDAR STUB] Deleting event:', eventId);
    return true;
};

module.exports = {
    createCalendarEvent,
    deleteCalendarEvent,
};
