import { useState, useEffect } from 'react';
import api from '../services/api';
import { IoCardOutline, IoPlayOutline, IoRefreshOutline, IoPauseOutline } from 'react-icons/io5';

const STATUS_COLORS = {
    active: 'bg-success/10 text-success',
    lapsed: 'bg-danger/10 text-danger',
    cancelled: 'bg-warning/10 text-warning',
};

function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [activateModal, setActivateModal] = useState(false);
    const [activateUserId, setActivateUserId] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    // For activation, we also need a user list
    const [allUsers, setAllUsers] = useState([]);

    const fetchSubscriptions = () => {
        setLoading(true);
        api.get('/credits/subscription/all', { page, limit: 20, status: filter })
            .then((res) => {
                setSubscriptions(res.data || []);
                setTotal(res.pagination?.total || 0);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchSubscriptions(); }, [page, filter]);

    const handleActivate = async () => {
        if (!activateUserId) return;
        setActionLoading(true);
        try {
            await api.post('/credits/subscription/activate', { userId: activateUserId });
            setActivateModal(false);
            setActivateUserId('');
            fetchSubscriptions();
        } catch (err) {
            alert(err.message || 'Activation failed');
        } finally {
            setActionLoading(false);
        }
    };

    const handleRenew = async (userId) => {
        if (!confirm('Renew this subscription? This will grant 10 credits and set the price to $275.')) return;
        try {
            await api.post('/credits/subscription/renew', { userId });
            fetchSubscriptions();
        } catch (err) {
            alert(err.message || 'Renewal failed');
        }
    };

    const handleLapse = async (userId) => {
        if (!confirm('Mark this subscription as lapsed? The consecutive month count will reset.')) return;
        try {
            await api.post('/credits/subscription/lapse', { userId });
            fetchSubscriptions();
        } catch (err) {
            alert(err.message || 'Lapse failed');
        }
    };

    const openActivateModal = async () => {
        setActivateModal(true);
        try {
            const res = await api.get('/admin/users', { limit: 100 });
            setAllUsers(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-text-primary">Subscriptions</h1>
                    <p className="text-sm text-text-secondary mt-1">{total} total subscriptions</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-2">
                        {['', 'active', 'lapsed', 'cancelled'].map((f) => (
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
                    <button
                        onClick={openActivateModal}
                        className="px-4 py-2 text-xs font-bold rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
                    >
                        + Activate New
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
            ) : subscriptions.length === 0 ? (
                <div className="text-center py-16 text-text-secondary">
                    <IoCardOutline className="text-4xl mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No subscriptions found</p>
                </div>
            ) : (
                <div className="bg-bg-secondary rounded-xl border border-border-color overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">User</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Price</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Months</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Cycle</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((s) => (
                                <tr key={s._id} className="border-b border-border-color last:border-0 hover:bg-bg-hover/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                                                {s.user?.name?.charAt(0)?.toUpperCase() || '?'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-text-primary">{s.user?.name || 'Unknown'}</p>
                                                <p className="text-[11px] text-text-secondary">{s.user?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${STATUS_COLORS[s.status]}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm font-bold text-text-primary">${s.priceThisCycle}</td>
                                    <td className="px-5 py-4 text-sm text-text-secondary">{s.consecutiveMonths}</td>
                                    <td className="px-5 py-4 text-[11px] text-text-secondary">
                                        {new Date(s.currentCycleStart).toLocaleDateString()} — {new Date(s.currentCycleEnd).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-2">
                                            {s.status === 'active' && (
                                                <>
                                                    <button
                                                        onClick={() => handleRenew(s.user?._id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                                                        title="Renew for next month"
                                                    >
                                                        <IoRefreshOutline /> Renew
                                                    </button>
                                                    <button
                                                        onClick={() => handleLapse(s.user?._id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                                                        title="Mark as lapsed"
                                                    >
                                                        <IoPauseOutline /> Lapse
                                                    </button>
                                                </>
                                            )}
                                            {(s.status === 'lapsed' || s.status === 'cancelled') && (
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await api.post('/credits/subscription/activate', { userId: s.user?._id });
                                                            fetchSubscriptions();
                                                        } catch (err) { alert(err.message); }
                                                    }}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                                                >
                                                    <IoPlayOutline /> Reactivate
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Activate Modal */}
            {activateModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-bg-secondary rounded-2xl border border-border-color w-full max-w-md p-6 animate-fade-in shadow-2xl">
                        <h3 className="text-base font-bold text-text-primary mb-1">Activate Subscription</h3>
                        <p className="text-sm text-text-secondary mb-5">First month: $375. Grants 10 credits.</p>

                        <div className="mb-5">
                            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Select User</label>
                            <select
                                value={activateUserId}
                                onChange={(e) => setActivateUserId(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-bg-primary border border-border-color text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                            >
                                <option value="">Choose a user…</option>
                                {allUsers.map((u) => (
                                    <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setActivateModal(false); setActivateUserId(''); }}
                                className="flex-1 py-2.5 rounded-xl border border-border-color text-text-secondary text-sm font-bold hover:bg-bg-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleActivate}
                                disabled={actionLoading || !activateUserId}
                                className="flex-1 py-2.5 rounded-xl bg-accent text-white text-sm font-bold hover:bg-accent-hover transition-all disabled:opacity-50"
                            >
                                {actionLoading ? 'Activating…' : 'Activate ($375)'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Subscriptions;
