import {
    IoChevronBackOutline,
    IoChevronForwardOutline,
} from 'react-icons/io5';
import { EVENT_TYPES } from '../constants';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export default function CalendarHeader({ currentDate, goToPrev, goToNext, goToToday }) {
    const month = MONTH_NAMES[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            {/* Left: Navigation */}
            <div className="flex items-center gap-3">
                <button
                    onClick={goToToday}
                    className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider
                     rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)]
                     text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
                >
                    Today
                </button>

                <button
                    onClick={goToPrev}
                    className="w-8 h-8 flex items-center justify-center rounded-lg
                     border border-[var(--border-color)] bg-[var(--bg-secondary)]
                     text-[var(--icon-color)] hover:bg-[var(--bg-hover)] transition-colors"
                >
                    <IoChevronBackOutline />
                </button>

                <button
                    onClick={goToNext}
                    className="w-8 h-8 flex items-center justify-center rounded-lg
                     border border-[var(--border-color)] bg-[var(--bg-secondary)]
                     text-[var(--icon-color)] hover:bg-[var(--bg-hover)] transition-colors"
                >
                    <IoChevronForwardOutline />
                </button>

                <h2 className="text-lg font-bold text-[var(--text-primary)] ml-1 whitespace-nowrap">
                    {month} {year}
                </h2>
            </div>

            {/* Right: Legend */}
            <div className="flex items-center gap-3">
                {Object.entries(EVENT_TYPES).map(([key, t]) => (
                    <span
                        key={key}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                         ${t.bg} ${t.text} border ${t.border}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${t.dot}`} />
                        {t.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
