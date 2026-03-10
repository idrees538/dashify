import { useState, useEffect } from 'react';
import {
    IoPersonOutline,
    IoCheckmarkCircleOutline,
    IoTimeOutline,
    IoSearchOutline,
    IoChevronForwardOutline,
    IoDocumentTextOutline,
    IoCardOutline,
    IoCalendarOutline,
    IoCameraOutline,
    IoEllipseOutline,
    IoNotificationsOutline,
} from 'react-icons/io5';
import api from '../services/api';

const STATUS_OPTIONS = ['', 'form_pending', 'payment_pending', 'call_pending', 'shoot_pending', 'completed', 'stalled'];
const STATUS_LABELS = {
    form_pending: 'Form Pending',
    payment_pending: 'Payment Pending',
    call_pending: 'Call Pending',
    shoot_pending: 'Shoot Pending',
    completed: 'Completed',
    stalled: 'Stalled',
};
const STATUS_COLORS = {
    form_pending: 'bg-gray-500/15 text-gray-400',
    payment_pending: 'bg-yellow-500/15 text-yellow-400',
    call_pending: 'bg-blue-500/15 text-blue-400',
    shoot_pending: 'bg-purple-500/15 text-purple-400',
    completed: 'bg-emerald-500/15 text-emerald-400',
    stalled: 'bg-red-500/15 text-red-400',
};

const STEP_ICONS = {
    typeform: IoDocumentTextOutline,
    payment: IoCardOutline,
    strategy_call: IoCalendarOutline,
    shoot_day: IoCameraOutline,
};

function Onboarding() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 20 };
            if (statusFilter) params.status = statusFilter;
            const res = await api.get('/onboarding/all', params);
            setRecords(res.data || []);
            setTotalPages(res.pagination?.pages || 1);
        } catch (err) {
            console.error('Failed to load onboarding records:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRecords(); }, [page, statusFilter]);

    const advanceStep = async (userId, step, data = {}) => {
        setActionLoading(true);
        try {
            await api.put(`/onboarding/${userId}/step`, { step, data });
            fetchRecords();
        } catch (err) {
            alert(err.message || 'Failed to update step');
        } finally {
            setActionLoading(false);
        }
    };

    const triggerReminders = async () => {
        setActionLoading(true);
        try {
            const res = await api.post('/admin/sms/trigger-reminders');
            alert(`Reminders triggered: ${res.data?.count || 0} messages sent.`);
        } catch (err) {
            alert(err.message || 'Failed to trigger reminders');
        } finally {
            setActionLoading(false);
        }
    };

    const getCompletedSteps = (record) => {
        let count = 0;
        if (record.typeformCompleted) count++;
        if (record.paymentCompleted) count++;
        if (record.strategyCallBooked) count++;
        if (record.shootDayScheduled) count++;
        return count;
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-text-primary">Onboarding Pipeline</h1>
                    <p className="text-sm text-text-secondary">Track user journey: Typeform → Payment → Strategy Call → Shoot</p>
                </div>
                <button
                    onClick={triggerReminders}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 text-orange-400 text-sm font-bold border border-orange-500/20 hover:bg-orange-500/20 transition-all disabled:opacity-50"
                >
                    <IoNotificationsOutline className="text-lg" />
                    Trigger Shoot Reminders
                </button>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {STATUS_OPTIONS.map((s) => (
                    <button
                        key={s || 'all'}
                        onClick={() => { setStatusFilter(s); setPage(1); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${statusFilter === s ? 'bg-accent text-white' : 'bg-bg-hover text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        {s ? STATUS_LABELS[s] : 'All'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
            ) : records.length === 0 ? (
                <div className="text-center py-12 text-text-secondary">No records found.</div>
            ) : (
                <div className="space-y-3">
                    {records.map((r) => {
                        const user = r.user || {};
                        const completedSteps = getCompletedSteps(r);
                        const pct = (completedSteps / 4) * 100;

                        return (
                            <div
                                key={r._id}
                                className="bg-bg-secondary border border-border-color rounded-xl p-5 hover:border-accent/30 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-sm">
                                            {(user.name || '?')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-primary">{user.name || 'Unknown'}</p>
                                            <p className="text-xs text-text-secondary">{user.email || '—'}</p>
                                        </div>
                                        {r.isExistingUser && (
                                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                                                Existing
                                            </span>
                                        )}
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[r.status] || 'bg-gray-500/15 text-gray-400'}`}>
                                        {STATUS_LABELS[r.status] || r.status}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-1.5">
                                        <span>Progress</span>
                                        <span>{completedSteps}/4 steps</span>
                                    </div>
                                    <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                                        <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                                    </div>
                                </div>

                                {/* Steps */}
                                <div className="grid grid-cols-4 gap-3 mb-4">
                                    {[
                                        { key: 'typeform', label: 'Typeform', done: r.typeformCompleted, date: r.typeformSubmittedAt },
                                        { key: 'payment', label: 'Payment', done: r.paymentCompleted, date: r.paymentCompletedAt },
                                        { key: 'strategy_call', label: 'Strategy Call', done: r.strategyCallBooked, date: r.strategyCallBookedAt },
                                        { key: 'shoot_day', label: 'Shoot Day', done: r.shootDayScheduled, date: r.shootDayScheduledAt },
                                    ].map((step) => {
                                        const Icon = STEP_ICONS[step.key];
                                        return (
                                            <div key={step.key} className={`p-3 rounded-lg border text-center ${step.done ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border-color bg-bg-primary'}`}>
                                                <div className="flex items-center justify-center gap-1.5 mb-1">
                                                    <Icon className={`text-sm ${step.done ? 'text-emerald-400' : 'text-text-secondary'}`} />
                                                    {step.done ? (
                                                        <IoCheckmarkCircleOutline className="text-sm text-emerald-400" />
                                                    ) : (
                                                        <IoEllipseOutline className="text-sm text-text-secondary" />
                                                    )}
                                                </div>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider ${step.done ? 'text-emerald-400' : 'text-text-secondary'}`}>
                                                    {step.label}
                                                </p>
                                                {step.done && step.date && (
                                                    <p className="text-[9px] text-text-secondary mt-0.5">
                                                        {new Date(step.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Actions */}
                                {r.status !== 'completed' && (
                                    <div className="flex flex-wrap gap-2">
                                        {!r.typeformCompleted && (
                                            <button
                                                onClick={() => advanceStep(user._id || r.user, 'typeform')}
                                                disabled={actionLoading}
                                                className="px-3 py-1.5 rounded-lg bg-gray-500/10 text-gray-300 text-xs font-semibold hover:bg-gray-500/20 transition-colors disabled:opacity-50"
                                            >
                                                Mark Form Done
                                            </button>
                                        )}
                                        {r.typeformCompleted && !r.paymentCompleted && (
                                            <button
                                                onClick={() => advanceStep(user._id || r.user, 'payment', { amount: 375 })}
                                                disabled={actionLoading}
                                                className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs font-semibold hover:bg-yellow-500/20 transition-colors disabled:opacity-50"
                                            >
                                                Mark Paid
                                            </button>
                                        )}
                                        {r.paymentCompleted && !r.strategyCallBooked && (
                                            <button
                                                onClick={() => advanceStep(user._id || r.user, 'strategy_call')}
                                                disabled={actionLoading}
                                                className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-colors disabled:opacity-50"
                                            >
                                                Mark Call Booked
                                            </button>
                                        )}
                                        {r.strategyCallBooked && !r.shootDayScheduled && (
                                            <button
                                                onClick={() => advanceStep(user._id || r.user, 'shoot_day')}
                                                disabled={actionLoading}
                                                className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-semibold hover:bg-purple-500/20 transition-colors disabled:opacity-50"
                                            >
                                                Mark Shoot Scheduled
                                            </button>
                                        )}
                                        <button
                                            onClick={() => advanceStep(user._id || r.user, 'skip_to_completed')}
                                            disabled={actionLoading}
                                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                                        >
                                            Skip → Complete
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${page === i + 1 ? 'bg-accent text-white' : 'bg-bg-hover text-text-secondary'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Onboarding;
