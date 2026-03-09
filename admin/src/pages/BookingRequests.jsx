import { useState, useEffect } from 'react';
import api from '../services/api';
import {
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoTimeOutline,
    IoCalendarOutline,
    IoEyeOutline,
} from 'react-icons/io5';

const STATUS_COLORS = {
    pending: 'bg-warning/10 text-warning',
    approved: 'bg-success/10 text-success',
    rejected: 'bg-danger/10 text-danger',
    cancelled: 'bg-bg-hover text-text-secondary',
};

function BookingRequests() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [actionModal, setActionModal] = useState(null); // { booking, action: 'approve' | 'reject' }
    const [shootDate, setShootDate] = useState('');
    const [adminNotes, setAdminNotes] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const fetchBookings = () => {
        setLoading(true);
        api.get('/credits/booking/all', { page, limit: 20, status: filter })
            .then((res) => {
                setBookings(res.data || []);
                setTotal(res.pagination?.total || 0);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchBookings(); }, [page, filter]);

    const handleAction = async () => {
        if (!actionModal) return;
        setActionLoading(true);

        try {
            if (actionModal.action === 'approve') {
                await api.put(`/credits/booking/${actionModal.booking._id}/approve`, {
                    shootDate: shootDate || undefined,
                    adminNotes: adminNotes || undefined,
                });
            } else {
                await api.put(`/credits/booking/${actionModal.booking._id}/reject`, {
                    adminNotes: adminNotes || undefined,
                });
            }
            setActionModal(null);
            setShootDate('');
            setAdminNotes('');
            fetchBookings();
        } catch (err) {
            alert(err.message || 'Action failed');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-text-primary">Booking Requests</h1>
                    <p className="text-sm text-text-secondary mt-1">{total} total requests</p>
                </div>
                <div className="flex gap-2">
                    {['', 'pending', 'approved', 'rejected'].map((f) => (
                        <button
                            key={f}
                            onClick={() => { setFilter(f); setPage(1); }}
                            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors ${filter === f
                                    ? 'bg-accent text-white'
                                    : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border-color'
                                }`}
                        >
                            {f ? f.charAt(0).toUpperCase() + f.slice(1) : 'All'}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-16 text-text-secondary">
                    <IoCalendarOutline className="text-4xl mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No booking requests found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((b) => (
                        <div key={b._id} className="bg-bg-secondary rounded-xl border border-border-color p-5 hover:border-accent/20 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                                        {b.user?.name?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-primary">{b.user?.name || 'Unknown'}</p>
                                        <p className="text-[11px] text-text-secondary">{b.user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${STATUS_COLORS[b.status]}`}>
                                        {b.status}
                                    </span>
                                    <span className="text-[11px] text-text-secondary">
                                        {new Date(b.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Deliverables */}
                            <div className="mb-4">
                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Deliverables</p>
                                <div className="flex flex-wrap gap-2">
                                    {b.deliverables?.map((d, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-lg bg-bg-primary border border-border-color text-xs font-semibold text-text-primary">
                                            {d.type} <span className="text-accent ml-1">{d.creditCost} cr</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-[11px] text-text-secondary">
                                    <span>Total: <strong className="text-accent">{b.totalCredits} credits</strong></span>
                                    {b.shootDate && (
                                        <span className="flex items-center gap-1">
                                            <IoCalendarOutline /> Shoot: {new Date(b.shootDate).toLocaleDateString()}
                                        </span>
                                    )}
                                    {b.adminNotes && (
                                        <span className="italic">"{b.adminNotes}"</span>
                                    )}
                                </div>

                                {b.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setActionModal({ booking: b, action: 'approve' })}
                                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                                        >
                                            <IoCheckmarkCircleOutline /> Approve
                                        </button>
                                        <button
                                            onClick={() => setActionModal({ booking: b, action: 'reject' })}
                                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                                        >
                                            <IoCloseCircleOutline /> Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Action Modal */}
            {actionModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-bg-secondary rounded-2xl border border-border-color w-full max-w-md p-6 animate-fade-in shadow-2xl">
                        <h3 className="text-base font-bold text-text-primary mb-1">
                            {actionModal.action === 'approve' ? 'Approve' : 'Reject'} Booking
                        </h3>
                        <p className="text-sm text-text-secondary mb-5">
                            {actionModal.booking.user?.name} — {actionModal.booking.totalCredits} credits
                        </p>

                        {actionModal.action === 'approve' && (
                            <div className="mb-4">
                                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Shoot Date</label>
                                <input
                                    type="date"
                                    value={shootDate}
                                    onChange={(e) => setShootDate(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-bg-primary border border-border-color text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>
                        )}

                        <div className="mb-5">
                            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Admin Notes</label>
                            <textarea
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-bg-primary border border-border-color text-text-primary text-sm focus:outline-none focus:border-accent transition-colors resize-none h-20"
                                placeholder="Optional notes…"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setActionModal(null); setShootDate(''); setAdminNotes(''); }}
                                className="flex-1 py-2.5 rounded-xl border border-border-color text-text-secondary text-sm font-bold hover:bg-bg-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAction}
                                disabled={actionLoading}
                                className={`flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-50 ${actionModal.action === 'approve'
                                        ? 'bg-success hover:bg-success/80'
                                        : 'bg-danger hover:bg-danger/80'
                                    }`}
                            >
                                {actionLoading ? 'Processing…' : actionModal.action === 'approve' ? 'Approve & Deduct Credits' : 'Reject Request'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingRequests;
