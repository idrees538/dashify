import { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
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
    IoCloseOutline,
    IoAddOutline,
    IoRemoveOutline,
} from 'react-icons/io5';

const DELIVERABLE_OPTIONS = [
    { type: 'Performance Video', defaultCost: 5 },
    { type: 'Day in the Life', defaultCost: 3 },
    { type: 'Visualizer', defaultCost: 4 },
    { type: 'Photography', defaultCost: 2 },
    { type: 'Report', defaultCost: 1 },
];

const STATUS_ICONS = {
    0: IoDocumentTextOutline,
    1: IoCameraOutline,
    2: IoCashOutline,
    3: IoCheckmarkCircleOutline,
};

function Credits() {
    const [summary, setSummary] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState(null);
    const [breakdown, setBreakdown] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedDeliverables, setSelectedDeliverables] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [summaryRes, txRes, statsRes, breakdownRes, bookingRes] = await Promise.all([
                api.get('/credits/summary'),
                api.get('/credits/transactions', { limit: 10 }),
                api.get('/credits/stats'),
                api.get('/credits/breakdown'),
                api.get('/credits/booking', { limit: 5 }),
            ]);
            setSummary(summaryRes.data);
            setTransactions(txRes.data || []);
            setStats(statsRes.data);
            setBreakdown(breakdownRes.data?.breakdown || []);
            setBookings(bookingRes.data || []);
        } catch (err) {
            console.error('Failed to fetch credit data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const bank = summary?.bank;
    const remaining = bank ? bank.totalCredits - bank.usedCredits : 0;
    const totalCredits = bank?.totalCredits || 10;
    const pct = totalCredits > 0 ? Math.round((remaining / totalCredits) * 100) : 0;

    const toggleDeliverable = (type, defaultCost) => {
        setSelectedDeliverables((prev) => {
            const exists = prev.find((d) => d.type === type);
            if (exists) return prev.filter((d) => d.type !== type);
            return [...prev, { type, creditCost: defaultCost }];
        });
    };

    const totalRequestCredits = selectedDeliverables.reduce((sum, d) => sum + d.creditCost, 0);

    const handleSubmitRequest = async () => {
        if (selectedDeliverables.length === 0) return;
        setRequestLoading(true);
        try {
            await api.post('/credits/booking', { deliverables: selectedDeliverables });
            setShowRequestModal(false);
            setSelectedDeliverables([]);
            fetchData();
        } catch (err) {
            alert(err.message || 'Failed to submit request');
        } finally {
            setRequestLoading(false);
        }
    };

    // Build request timeline from latest booking
    const latestBooking = summary?.latestBooking;
    const requestSteps = latestBooking ? [
        {
            status: 'Request Submitted',
            date: new Date(latestBooking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            description: `Booking request submitted`,
            completed: true,
        },
        {
            status: 'Review & Scope Check',
            description: latestBooking.status === 'pending' ? 'Awaiting admin review' : 'Request reviewed by admin',
            completed: latestBooking.status !== 'pending',
            current: latestBooking.status === 'pending',
        },
        {
            status: 'Credit Assignment',
            description: latestBooking.status === 'approved'
                ? `${latestBooking.totalCredits} credits deducted`
                : latestBooking.status === 'rejected'
                    ? 'Request was rejected'
                    : 'Pending credit deduction',
            completed: latestBooking.status === 'approved',
        },
        {
            status: 'Confirmed',
            description: latestBooking.shootDate
                ? `Shoot on ${new Date(latestBooking.shootDate).toLocaleDateString()}`
                : 'Waiting for confirmation',
            completed: latestBooking.status === 'approved' && latestBooking.shootDate,
        },
    ] : [];

    if (loading) {
        return (
            <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const maxCategoryVal = Math.max(...breakdown.map(d => d.totalCredits), 1);

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in px-4 py-4 mb-8">
            <div className="mb-6">
                <h1 className="text-base font-semibold text-text-primary">Credits</h1>
                <p className="text-[12px] text-text-secondary">Manage your credits and view transaction history.</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Credit Summary */}
                <div className="col-span-12 bg-bg-secondary p-4 rounded-lg border border-border-color shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-semibold text-text-primary">Credit Summary</h3>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Credit Bank</span>
                            <div className="flex gap-2">
                                {summary?.canRequestShoot && (
                                    <button
                                        onClick={() => setShowRequestModal(true)}
                                        className="px-3 py-1.5 text-xs font-bold bg-accent text-white rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                                    >
                                        Request Shoot
                                    </button>
                                )}
                                {!summary?.canRequestShoot && (
                                    <span className="px-3 py-1.5 text-xs font-bold bg-bg-hover text-text-secondary rounded-lg">
                                        {summary?.shootEligibility?.creditsNeeded > 0
                                            ? `Need ${summary.shootEligibility.creditsNeeded} more credits`
                                            : 'Shoot already booked this month'}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="h-6 bg-bg-primary rounded-lg overflow-hidden relative border border-border-color">
                            <div className="h-full bg-accent/20 border-r-2 border-accent transition-all duration-500" style={{ width: `${pct}%` }} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                {remaining} of {totalCredits} Credits Redeemable
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3">Credits Owned</span>
                            <div className="w-14 h-14 rounded-full border-4 border-accent flex items-center justify-center text-xl font-bold text-text-primary shadow-sm">{totalCredits}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3">Credits Remaining</span>
                            <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xl font-bold text-text-primary shadow-sm">{remaining}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3">Rollover Credits</span>
                            <div className="w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center text-xl font-bold text-text-primary shadow-sm">{bank?.rolloverCredits || 0}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3">Rollover Expiration</span>
                            <div className="h-14 flex items-center text-base font-bold text-text-primary">
                                {bank?.expiresAt ? new Date(bank.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Column: Requests Timeline */}
                <div className="col-span-12 lg:col-span-4 bg-bg-secondary p-4 rounded-lg border border-border-color shadow-sm self-start">
                    <h3 className="text-base font-semibold text-text-primary mb-6">
                        {latestBooking ? 'Latest Request' : 'Requests'}
                    </h3>
                    {requestSteps.length > 0 ? (
                        <div className="space-y-0">
                            {requestSteps.map((req, i) => {
                                const Icon = STATUS_ICONS[i] || IoTimeOutline;
                                return (
                                    <div key={i} className="relative flex gap-5 pb-8 group last:pb-0">
                                        {i !== requestSteps.length - 1 && (
                                            <div className="absolute left-[17px] top-9 bottom-0 w-[2px] bg-border-color" />
                                        )}
                                        <div className={`w-9 h-9 min-w-[36px] rounded-lg flex items-center justify-center text-lg z-10 transition-colors shadow-sm ${req.completed ? 'bg-accent text-white' : req.current ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-bg-primary text-text-secondary border border-border-color'}`}>
                                            <Icon />
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
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-text-secondary">No booking requests yet. Submit one to get started!</p>
                    )}
                </div>

                {/* Right Column: Credits by Category Chart */}
                <div className="col-span-12 lg:col-span-8 bg-bg-secondary p-4 rounded-lg border border-border-color shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-base font-semibold text-text-primary">Credits by Category</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-text-secondary">
                                <span className="w-2 h-2 rounded-full bg-accent" /> Usage
                            </div>
                        </div>
                    </div>
                    {breakdown.length > 0 ? (
                        <div className="h-[280px] flex items-end justify-between px-2 gap-4">
                            {breakdown.map((d, i) => (
                                <div key={i} className="flex flex-col items-center flex-1 group">
                                    <div
                                        className="w-full max-w-[48px] bg-accent/20 border-t-2 border-accent rounded-t-lg transition-all duration-300 cursor-pointer relative group-hover:bg-accent/30"
                                        style={{ height: `${(d.totalCredits / maxCategoryVal) * 100}%` }}
                                    >
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-accent bg-bg-secondary px-2 py-1 rounded-md border border-accent/20 opacity-0 group-hover:opacity-100 shadow-sm transition-opacity">
                                            {d.totalCredits}
                                        </span>
                                    </div>
                                    <span className="text-[10px] mt-4 text-center font-bold text-text-secondary uppercase tracking-wider h-10 flex items-center">
                                        {d.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-[280px] flex items-center justify-center text-text-secondary text-sm">
                            No usage data yet
                        </div>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="col-span-12 lg:col-span-8 bg-bg-secondary p-4 rounded-lg border border-border-color shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-semibold text-text-primary">Credit Statistics</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: 'Total Credits Assigned', value: stats?.totalCreditsAssigned || 0 },
                            { label: 'Most Frequent Request Type', value: stats?.mostFrequentRequestType || 'None' },
                            { label: 'Total Transactions', value: stats?.totalTransactions || 0 },
                            { label: 'Least Frequent Request Type', value: stats?.leastFrequentRequestType || 'None' },
                            { label: 'Total Utilization', value: `${stats?.utilization || 0}%` },
                        ].map((s, i) => (
                            <div key={i} className="p-4 rounded-xl bg-bg-primary border border-border-color shadow-sm hover:border-accent/40 transition-colors group">
                                <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest mb-2 group-hover:text-accent transition-colors">{s.label}</p>
                                <p className="text-lg font-bold text-text-primary truncate">{s.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="col-span-12 lg:col-span-4 bg-bg-secondary p-4 rounded-lg border border-border-color shadow-sm">
                    <div className="flex justify-between items-center mb-4 text-text-primary">
                        <h3 className="text-base font-semibold text-text-primary mb-0">Recent Transactions</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 text-[10px] uppercase tracking-widest text-text-secondary font-bold border-b border-border-color pb-2">
                            <span>Date</span>
                            <span>Content</span>
                            <span className="text-right">Cost</span>
                        </div>
                        <div className="space-y-3">
                            {transactions.length > 0 ? transactions.map((t, i) => (
                                <div key={t._id || i} className="grid grid-cols-3 items-center text-xs font-bold text-text-primary group">
                                    <span className="text-text-secondary font-medium">
                                        {new Date(t.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}
                                    </span>
                                    <span className="truncate group-hover:text-accent transition-colors">{t.category || t.description}</span>
                                    <div className="flex justify-end">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-sm ${t.type === 'debit' ? 'bg-accent text-white' : 'bg-emerald-500 text-white'}`}>
                                            {t.amount}
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-text-secondary text-center py-4">No transactions yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Shoot Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-bg-secondary rounded-2xl border border-border-color w-full max-w-lg p-6 animate-fade-in shadow-2xl mx-4">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-base font-bold text-text-primary">Request a Shoot</h3>
                                <p className="text-[12px] text-text-secondary mt-0.5">Select the deliverables you need</p>
                            </div>
                            <button onClick={() => { setShowRequestModal(false); setSelectedDeliverables([]); }} className="text-text-secondary hover:text-text-primary">
                                <IoCloseOutline className="text-xl" />
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            {DELIVERABLE_OPTIONS.map((d) => {
                                const selected = selectedDeliverables.find((s) => s.type === d.type);
                                return (
                                    <button
                                        key={d.type}
                                        onClick={() => toggleDeliverable(d.type, d.defaultCost)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${selected
                                                ? 'border-accent bg-accent/5'
                                                : 'border-border-color bg-bg-primary hover:border-accent/30'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selected ? 'border-accent bg-accent' : 'border-border-color'}`}>
                                                {selected && <IoCheckmarkCircleOutline className="text-white text-xs" />}
                                            </div>
                                            <span className="text-sm font-semibold text-text-primary">{d.type}</span>
                                        </div>
                                        <span className="text-sm font-bold text-accent">{d.defaultCost} credits</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-bg-primary border border-border-color mb-5">
                            <span className="text-sm font-semibold text-text-secondary">Total Credits</span>
                            <span className="text-xl font-bold text-accent">{totalRequestCredits}</span>
                        </div>

                        {totalRequestCredits > remaining && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
                                Insufficient credits. You need {totalRequestCredits} but only have {remaining} remaining.
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowRequestModal(false); setSelectedDeliverables([]); }}
                                className="flex-1 py-3 rounded-xl border border-border-color text-text-secondary text-sm font-bold hover:bg-bg-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitRequest}
                                disabled={requestLoading || selectedDeliverables.length === 0 || totalRequestCredits > remaining}
                                className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-accent/20"
                            >
                                {requestLoading ? 'Submitting…' : 'Submit Request'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Credits;
