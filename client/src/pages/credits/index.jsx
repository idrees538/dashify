import {
    IoCashOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoTimeOutline,
    IoDocumentTextOutline,
    IoCameraOutline,
    IoBarChartOutline,
    IoPlayCircleOutline,
    IoEllipsisHorizontal,
    IoOpenOutline,
} from 'react-icons/io5';

const CREDIT_STATS = {
    owned: 7,
    remaining: 3,
    rollover: 0,
    expiration: 'Sept. 26th 2025'
};

const REQUESTS = [
    { status: 'Request submitted', date: 'Jan 30, 2025', description: 'Order received on Jan 30, 2025', completed: true },
    { status: 'Review and Scope Check', date: 'Jan 31, 2025', description: 'Order Reviewed on Jan 31, 2025', completed: true, current: true },
    { status: 'Credit Assignment', description: 'The credits have been successfully deducted', completed: true },
    { status: 'Confirmed', description: 'Shoot dates and times confirmed', completed: true },
];

const CATEGORY_DATA = [
    { label: 'Performance Videos', value: 14 },
    { label: 'Day in the Life', value: 7 },
    { label: 'Visualizer', value: 10 },
    { label: 'Reports', value: 4 },
    { label: 'Photography', value: 7 },
];

const STATISTICS = [
    { label: 'Total Credits Assigned', value: '214' },
    { label: 'Most Frequent Request Type', value: 'Performance Video' },
    { label: '% of Months with 100% Usage', value: '3 of 12 months' },
    { label: 'Credits Expired', value: '12' },
    { label: 'Least Frequent Request Type', value: 'Reports' },
    { label: '% of Total Credits on Performance Vids', value: '73%' },
    { label: 'Average Credits Per Deliverable', value: '4' },
    { label: 'Lowest Usage Month', value: 'February' },
    { label: 'Total Utilization', value: '98%' },
];

const TRANSACTIONS = [
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
    { date: '08/01/25', content: 'Performance Video', cost: 5 },
];
function Credits() {
    const maxVal = Math.max(...CATEGORY_DATA.map(d => d.value));

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in mb-8">
            <div className="mb-8">
                <h1 className="text-[26px] font-bold text-text-primary mb-2">Credits</h1>
                <p className="text-[15px] text-text-secondary font-normal">Manage your credits and view transaction history.</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Credit Summary */}
                <div className="col-span-12 bg-bg-secondary p-6 rounded-2xl border border-border-color shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-base font-bold text-text-primary">Credit Summary</h3>
                    </div>
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Credit Bank</span>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 text-sm font-bold bg-bg-hover text-text-primary rounded-xl hover:bg-bg-hover/80 transition-colors">Redeem</button>
                                <button className="px-4 py-2 text-sm font-bold bg-accent text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-accent/20">Get Credits</button>
                            </div>
                        </div>
                        <div className="h-8 bg-bg-primary rounded-xl overflow-hidden relative border border-border-color">
                            <div className="h-full bg-accent/20 w-[70%] border-r-2 border-accent" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-secondary uppercase tracking-widest">7 of 10 Credits Redeemable</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3">Credits Owned</span>
                            <div className="w-14 h-14 rounded-full border-4 border-accent flex items-center justify-center text-xl font-bold text-text-primary shadow-sm">{CREDIT_STATS.owned}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3">Credits Remaining</span>
                            <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xl font-bold text-text-primary shadow-sm">{CREDIT_STATS.remaining}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3">Rollover Credits</span>
                            <div className="w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center text-xl font-bold text-text-primary shadow-sm">{CREDIT_STATS.rollover}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3">Rollover Expiration</span>
                            <div className="h-14 flex items-center text-base font-bold text-text-primary">{CREDIT_STATS.expiration}</div>
                        </div>
                    </div>
                </div>

                {/* Left Column: Requests */}
                <div className="col-span-12 lg:col-span-4 bg-bg-secondary p-6 rounded-2xl border border-border-color shadow-sm self-start">
                    <h3 className="text-base font-bold text-text-primary mb-8">Requests</h3>
                    <div className="space-y-0">
                        {REQUESTS.map((req, i) => (
                            <div key={i} className="relative flex gap-5 pb-8 group last:pb-0">
                                {i !== REQUESTS.length - 1 && (
                                    <div className="absolute left-[17px] top-9 bottom-0 w-[2px] bg-border-color" />
                                )}
                                <div className={`w-9 h-9 min-w-[36px] rounded-lg flex items-center justify-center text-lg z-10 transition-colors shadow-sm ${req.completed ? 'bg-accent text-white' : 'bg-bg-primary text-text-secondary border border-border-color'}`}>
                                    {i === 0 && <IoDocumentTextOutline />}
                                    {i === 1 && <IoCameraOutline />}
                                    {i === 2 && <IoCashOutline />}
                                    {i === 3 && <IoCheckmarkCircleOutline />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm text-text-primary">{req.status}</h4>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${req.completed ? 'border-accent bg-accent/10' : 'border-border-color'}`}>
                                            {req.completed && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                                        </div>
                                    </div>
                                    <p className="text-[12px] text-text-secondary mt-1">{req.description}</p>
                                    {req.date && <p className="text-[10px] font-bold text-accent/70 uppercase tracking-widest mt-1">{req.date}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Credits by Category Chart */}
                <div className="col-span-12 lg:col-span-8 bg-bg-secondary p-6 rounded-2xl border border-border-color shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-base font-bold text-text-primary">Credits by Category</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-text-secondary">
                                <span className="w-2 h-2 rounded-full bg-accent" /> Usage
                            </div>
                            <button className="text-text-secondary hover:text-text-primary"><IoEllipsisHorizontal /></button>
                        </div>
                    </div>
                    <div className="h-[280px] flex items-end justify-between px-2 gap-4">
                        {CATEGORY_DATA.map((d, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 group">
                                <div
                                    className="w-full max-w-[48px] bg-accent/20 border-t-2 border-accent rounded-t-lg transition-all duration-300 cursor-pointer relative group-hover:bg-accent/30"
                                    style={{ height: `${(d.value / maxVal) * 100}%` }}
                                >
                                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-accent bg-bg-secondary px-2 py-1 rounded-md border border-accent/20 opacity-0 group-hover:opacity-100 shadow-sm transition-opacity">
                                        {d.value}
                                    </span>
                                </div>
                                <span className="text-[10px] mt-4 text-center font-bold text-text-secondary uppercase tracking-wider h-10 flex items-center">
                                    {d.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="col-span-12 lg:col-span-8 bg-bg-secondary p-6 rounded-2xl border border-border-color shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-base font-bold text-text-primary">Credit Statistics</h3>
                        <button className="text-text-secondary hover:text-text-primary"><IoEllipsisHorizontal /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {STATISTICS.map((s, i) => (
                            <div key={i} className="p-4 rounded-xl bg-bg-primary border border-border-color shadow-sm hover:border-accent/40 transition-colors group">
                                <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest mb-2 group-hover:text-accent transition-colors">{s.label}</p>
                                <p className="text-lg font-bold text-text-primary truncate">{s.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="col-span-12 lg:col-span-4 bg-bg-secondary p-6 rounded-2xl border border-border-color shadow-sm">
                    <div className="flex justify-between items-center mb-6 text-text-primary font-bold">
                        <h3 className="text-base text-text-primary mb-0">Recent Transactions</h3>
                        <IoOpenOutline className="cursor-pointer text-text-secondary hover:text-text-primary" />
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 text-[10px] uppercase tracking-widest text-text-secondary font-bold border-b border-border-color pb-2">
                            <span>Date</span>
                            <span>Content</span>
                            <span className="text-right">Cost</span>
                        </div>
                        <div className="space-y-3">
                            {TRANSACTIONS.map((t, i) => (
                                <div key={i} className="grid grid-cols-3 items-center text-xs font-bold text-text-primary group">
                                    <span className="text-text-secondary font-medium">{t.date}</span>
                                    <span className="truncate group-hover:text-accent transition-colors">{t.content}</span>
                                    <div className="flex justify-end">
                                        <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[10px] shadow-sm">{t.cost}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Credits;

