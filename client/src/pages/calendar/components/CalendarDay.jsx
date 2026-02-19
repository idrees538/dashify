import { EVENT_TYPES } from '../constants';
import { IoAddOutline, IoCloseOutline } from 'react-icons/io5';

export default function CalendarDay({
    cell,
    dayEvents,
    isToday,
    onAddClick,
    onRemoveEvent,
}) {
    const { date, isCurrentMonth } = cell;
    const dayNum = date.getDate();

    return (
        <div
            className={`
        group relative flex flex-col
        min-h-[110px] p-1.5 sm:p-2
        border-r border-b border-[var(--border-color)]
        transition-colors duration-150
        ${isCurrentMonth
                    ? 'bg-[var(--bg-secondary)]'
                    : 'bg-[var(--bg-primary)] opacity-50'
                }
        hover:bg-[var(--bg-hover)]
      `}
        >
            {/* Day number */}
            <span
                className={`
          inline-flex items-center justify-center
          w-7 h-7 rounded-full text-xs font-semibold mb-1 shrink-0
          ${isToday
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-[var(--text-primary)]'
                    }
        `}
            >
                {dayNum}
            </span>

            {/* Events */}
            <div className="flex-1 overflow-y-auto space-y-1 min-h-0 scrollbar-thin">
                {dayEvents.map((ev) => {
                    const style = EVENT_TYPES[ev.type] || EVENT_TYPES.post;
                    return (
                        <div
                            key={ev.id}
                            className={`
                group/chip relative flex items-center gap-1 px-1.5 py-0.5
                rounded text-[10px] sm:text-[11px] font-medium leading-tight
                ${style.bg} ${style.text}
                cursor-default
              `}
                            title={`${ev.time ? ev.time + ' — ' : ''}${ev.title}`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                            <span className="truncate">{ev.title}</span>

                            {/* Remove button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveEvent(ev.id);
                                }}
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full
                           bg-[var(--bg-secondary)] border border-[var(--border-color)]
                           flex items-center justify-center
                           opacity-0 group-hover/chip:opacity-100 transition-opacity
                           text-[var(--text-secondary)] hover:text-red-500 text-[10px]"
                                title="Remove event"
                            >
                                <IoCloseOutline />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Add button — visible on hover */}
            {isCurrentMonth && (
                <button
                    onClick={() => onAddClick(cell)}
                    className="absolute bottom-1.5 right-1.5
                     w-6 h-6 rounded-full
                     flex items-center justify-center
                     bg-[var(--accent)] text-white text-sm
                     opacity-0 group-hover:opacity-100
                     hover:scale-110
                     transition-all duration-150
                     shadow-md"
                    title="Add event"
                >
                    <IoAddOutline />
                </button>
            )}
        </div>
    );
}
