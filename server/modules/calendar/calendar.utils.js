/**
 * Static list of public holidays in 2026 (Example: US Holidays)
 * Format: "YYYY-MM-DD"
 */
const HOLIDAYS_2026 = [
    '2026-01-01', // New Year's Day
    '2026-01-19', // Martin Luther King Jr. Day
    '2026-02-16', // Presidents' Day
    '2026-05-25', // Memorial Day
    '2026-06-19', // Juneteenth
    '2026-07-04', // Independence Day
    '2026-09-07', // Labor Day
    '2026-10-12', // Indigenous Peoples' Day
    '2026-11-11', // Veterans Day
    '2026-11-26', // Thanksgiving Day
    '2026-12-25', // Christmas Day
];

/**
 * Add business days to a date, skipping weekends and holidays.
 * @param {Date} startDate
 * @param {number} days
 * @param {string[]} holidays
 * @returns {Date}
 */
const addBusinessDays = (startDate, days, holidays = HOLIDAYS_2026) => {
    const result = new Date(startDate);
    let added = 0;

    while (added < days) {
        result.setDate(result.getDate() + 1);
        const dayOfWeek = result.getDay();
        const dateString = result.toISOString().split('T')[0];

        // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = holidays.includes(dateString);

        if (!isWeekend && !isHoliday) {
            added++;
        }
    }

    return result;
};

module.exports = {
    addBusinessDays,
    HOLIDAYS_2026,
};
