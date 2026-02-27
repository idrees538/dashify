import { useState, useEffect } from 'react';
import { IoCloseOutline, IoCalendarOutline, IoTimeOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

export default function BookingModal({
    isOpen,
    onClose,
    onBook,
    fetchTimeBlocks,
    initialDate = null
}) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [timeBlocks, setTimeBlocks] = useState([]);
    const [bookingData, setBookingData] = useState({
        date: initialDate || '',
        timeBlockId: '',
        type: 'shoot',
        title: '',
    });

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            fetchTimeBlocks().then(blocks => {
                setTimeBlocks(blocks);
                setLoading(false);
            });
        }
    }, [isOpen, fetchTimeBlocks]);

    if (!isOpen) return null;

    const getDayFromDateString = (dateStr) => {
        if (!dateStr) return null;
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d).getDay();
    };

    const selectedDayOfWeek = getDayFromDateString(bookingData.date);
    const availableBlocks = timeBlocks.filter(b => b.dayOfWeek === selectedDayOfWeek && (b.type === bookingData.type || b.type === 'any'));

    const handleBook = async () => {
        const selectedBlock = timeBlocks.find(b => b._id === bookingData.timeBlockId);
        const dateKey = bookingData.date; // Assuming YYYY-MM-DD from input[type=date]

        try {
            await onBook(
                dateKey,
                selectedBlock ? selectedBlock.startTime : '',
                bookingData.type === 'shoot' ? 'Shoot Day' : 'Booking Call',
                null // Project ID could be added here
            );
            setStep(3); // Success
        } catch (err) {
            alert('Failed to book: ' + err.message);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-bg-secondary w-full max-w-md rounded-2xl border border-border-color shadow-2xl overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-border-color">
                    <h3 className="text-lg font-bold text-text-primary">
                        {step === 3 ? 'Booking Confirmed' : 'Schedule Booking'}
                    </h3>
                    <button onClick={onClose} className="text-2xl text-text-secondary hover:text-text-primary transition-colors">
                        <IoCloseOutline />
                    </button>
                </div>

                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-2">Booking Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setBookingData({ ...bookingData, type: 'shoot' })}
                                        className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${bookingData.type === 'shoot' ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' : 'bg-bg-primary border-border-color text-text-secondary hover:border-accent/40'}`}
                                    >
                                        Shoot Day
                                    </button>
                                    <button
                                        onClick={() => setBookingData({ ...bookingData, type: 'call' })}
                                        className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${bookingData.type === 'call' ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' : 'bg-bg-primary border-border-color text-text-secondary hover:border-accent/40'}`}
                                    >
                                        Intro Call
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-2">Select Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={bookingData.date}
                                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value, timeBlockId: '' })}
                                        className="w-full bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent/60"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <IoCalendarOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                                </div>
                            </div>

                            <button
                                disabled={!bookingData.date}
                                onClick={() => setStep(2)}
                                className="w-full bg-accent hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-accent/20"
                            >
                                Next Step
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-2">Available Time Slots</label>
                                {loading ? (
                                    <div className="animate-pulse flex flex-col gap-3">
                                        <div className="h-12 bg-bg-hover rounded-xl" />
                                        <div className="h-12 bg-bg-hover rounded-xl" />
                                    </div>
                                ) : availableBlocks.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin">
                                        {availableBlocks.map(block => (
                                            <button
                                                key={block._id}
                                                onClick={() => setBookingData({ ...bookingData, timeBlockId: block._id })}
                                                className={`flex items-center justify-between p-4 rounded-xl border text-sm font-semibold transition-all ${bookingData.timeBlockId === block._id ? 'bg-accent/10 border-accent text-accent' : 'bg-bg-primary border-border-color text-text-primary hover:border-accent/40'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <IoTimeOutline className="text-lg" />
                                                    <span>{block.startTime} - {block.endTime}</span>
                                                </div>
                                                <span className="text-[10px] uppercase font-bold opacity-60">{block.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-bg-primary border border-dashed border-border-color rounded-xl p-8 text-center text-text-secondary italic text-sm">
                                        No available slots for this date and type.
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 bg-bg-primary border border-border-color text-text-primary py-4 rounded-xl font-bold hover:bg-bg-hover transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    disabled={!bookingData.timeBlockId}
                                    onClick={handleBook}
                                    className="flex-[2] bg-accent hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-accent/20"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col items-center text-center py-6 animate-fade-in">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-5xl mb-6">
                                <IoCheckmarkCircleOutline />
                            </div>
                            <h4 className="text-xl font-bold text-text-primary mb-2">You're all set!</h4>
                            <p className="text-sm text-text-secondary max-w-[250px] mb-8">
                                Your booking is confirmed. If you booked a Shoot Day, your deliverables will be ready in 7 business days.
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full bg-bg-primary border border-border-color text-text-primary py-4 rounded-xl font-bold hover:bg-bg-hover transition-all"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
