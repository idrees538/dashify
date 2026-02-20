import { DAY_NAMES } from '../constants';
import CalendarDay from './CalendarDay';

export default function CalendarGrid({
    grid,
    events,
    todayKey,
    onAddClick,
    onRemoveEvent,
}) {
    return (
        <div className="flex-1 flex flex-col min-h-0 border border-border-color rounded-xl overflow-hidden bg-bg-secondary shadow-sm">
            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 bg-bg-primary">
                {DAY_NAMES.map((d) => (
                    <div
                        key={d}
                        className="py-2.5 text-center text-xs font-semibold uppercase tracking-wider
                       text-text-secondary border-r border-b border-border-color
                       last:border-r-0"
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* Day cells — 6 rows × 7 cols */}
            <div className="flex-1 grid grid-cols-7 grid-rows-6 auto-rows-fr">
                {grid.map((cell) => (
                    <CalendarDay
                        key={cell.key}
                        cell={cell}
                        dayEvents={events[cell.key] || []}
                        isToday={cell.key === todayKey}
                        onAddClick={onAddClick}
                        onRemoveEvent={(eventId) => onRemoveEvent(cell.key, eventId)}
                    />
                ))}
            </div>
        </div>
    );
}
