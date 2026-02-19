import { useState, useCallback, useMemo } from 'react';

/**
 * Format a Date as YYYY-MM-DD key for the events map.
 */
const toKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

let _id = 0;
const nextId = () => ++_id;

/**
 * Custom hook that manages calendar state:
 *  - current month navigation
 *  - 6-week grid generation
 *  - events CRUD (local state, easy to swap for API later)
 */
export default function useCalendar() {
    const [currentDate, setCurrentDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    const [events, setEvents] = useState(() => {
        // Seed a few sample events for demo purposes
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth();
        const map = {};

        const addSample = (day, title, type, time) => {
            const key = toKey(new Date(y, m, day));
            if (!map[key]) map[key] = [];
            map[key].push({ id: nextId(), title, type, time });
        };

        addSample(5, 'Brand shoot', 'shoot', '10:00');
        addSample(5, 'BTS clips', 'shoot', '14:00');
        addSample(8, 'Reel drop', 'post', '12:00');
        addSample(12, 'Product shoot', 'shoot', '09:00');
        addSample(15, 'IG carousel', 'post', '11:00');
        addSample(15, 'TikTok post', 'post', '15:00');
        addSample(20, 'Studio session', 'shoot', '10:00');
        addSample(22, 'YouTube upload', 'post', '18:00');
        addSample(25, 'Blog post', 'post', '09:00');

        return map;
    });

    /* Navigation */
    const goToPrev = useCallback(
        () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)),
        [],
    );
    const goToNext = useCallback(
        () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)),
        [],
    );
    const goToToday = useCallback(() => {
        const now = new Date();
        setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    }, []);

    /* Grid — always 6 rows (42 cells) for consistent height */
    const grid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const cells = [];

        // Leading days from previous month
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            const d = new Date(year, month - 1, prevMonthDays - i);
            cells.push({ date: d, key: toKey(d), isCurrentMonth: false });
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const d = new Date(year, month, day);
            cells.push({ date: d, key: toKey(d), isCurrentMonth: true });
        }

        // Trailing days to fill 42 cells (6 rows)
        const remaining = 42 - cells.length;
        for (let i = 1; i <= remaining; i++) {
            const d = new Date(year, month + 1, i);
            cells.push({ date: d, key: toKey(d), isCurrentMonth: false });
        }

        return cells;
    }, [currentDate]);

    /* CRUD */
    const addEvent = useCallback((dateKey, event) => {
        setEvents((prev) => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), { ...event, id: nextId() }],
        }));
    }, []);

    const removeEvent = useCallback((dateKey, eventId) => {
        setEvents((prev) => ({
            ...prev,
            [dateKey]: (prev[dateKey] || []).filter((e) => e.id !== eventId),
        }));
    }, []);

    /* Today key for highlight comparison */
    const todayKey = toKey(new Date());

    return {
        currentDate,
        grid,
        events,
        todayKey,
        goToPrev,
        goToNext,
        goToToday,
        addEvent,
        removeEvent,
    };
}
