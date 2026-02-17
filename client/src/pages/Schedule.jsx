import { IoCalendarOutline } from 'react-icons/io5';

function Schedule() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const events = [
        { time: '09:00', title: 'Team Standup', color: '#8204ff' },
        { time: '11:00', title: 'Client Review', color: '#3b82f6' },
        { time: '14:00', title: 'Design Sprint', color: '#10b981' },
        { time: '16:30', title: 'Code Review', color: '#f59e0b' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Schedule</h1>
                <p className="text-[15px] text-secondary-text font-normal">Manage your calendar and upcoming events.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 mb-8">
                {days.map((day) => (
                    <div className="card-base text-center !p-4" key={day}>
                        <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-1">{day}</p>
                        <h2 className="text-xl font-bold text-primary-text">{Math.floor(Math.random() * 5)}</h2>
                        <span className="text-[12px] text-secondary-text">events</span>
                    </div>
                ))}
            </div>

            <div className="bg-card-bg rounded-2xl p-6 shadow-main border border-border-main transition-colors duration-300">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-primary-text">Today's Schedule</h3>
                </div>
                <div className="flex flex-col gap-3">
                    {events.map((ev, i) => (
                        <div className="flex items-center gap-4 py-3.5 border-b border-border-main last:border-0" key={i}>
                            <div className="min-w-[60px] font-medium text-secondary-text text-sm">{ev.time}</div>
                            <div className="w-1 h-8 rounded-sm shrink-0" style={{ background: ev.color }} />
                            <div className="flex-1 font-medium text-primary-text">{ev.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Schedule;
