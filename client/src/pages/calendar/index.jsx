import { useState } from 'react';
import useCalendar from './hooks/useCalendar';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import BookingModal from './components/BookingModal';

export default function CalendarPage() {
    const {
        currentDate,
        grid,
        events,
        todayKey,
        loading,
        goToPrev,
        goToNext,
        goToToday,
        bookShootDay,
        fetchTimeBlocks,
        removeEvent,
    } = useCalendar();

    const [modalCell, setModalCell] = useState(null);

    return (
        <div className="flex flex-col h-full min-h-0 animate-fade-in">
            <CalendarHeader
                currentDate={currentDate}
                goToPrev={goToPrev}
                goToNext={goToNext}
                goToToday={goToToday}
                loading={loading}
            />

            <CalendarGrid
                grid={grid}
                events={events}
                todayKey={todayKey}
                onAddClick={(cell) => setModalCell(cell)}
                onRemoveEvent={removeEvent}
            />

            {modalCell && (
                <BookingModal
                    isOpen={!!modalCell}
                    initialDate={modalCell.key}
                    fetchTimeBlocks={fetchTimeBlocks}
                    onBook={bookShootDay}
                    onClose={() => setModalCell(null)}
                />
            )}
        </div>
    );
}
