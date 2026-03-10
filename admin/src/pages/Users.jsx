import { useState, useEffect } from 'react';
import api from '../services/api';
import {
    IoSearchOutline,
    IoCashOutline,
    IoChatbubbleEllipsesOutline,
    IoRocketOutline,
} from 'react-icons/io5';

const STATUS_COLORS = {
    form_pending: 'bg-gray-500/15 text-gray-400',
    payment_pending: 'bg-yellow-500/15 text-yellow-400',
    call_pending: 'bg-blue-500/15 text-blue-400',
    shoot_pending: 'bg-purple-500/15 text-purple-400',
    completed: 'bg-emerald-500/15 text-emerald-400',
    stalled: 'bg-red-500/15 text-red-400',
};

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [smsModal, setSmsModal] = useState(null); // { userId, phone, name }
    const [smsMessage, setSmsMessage] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const fetchUsers = () => {
        setLoading(true);
        api.get('/admin/users', { page, limit: 20, search })
            .then((res) => {
                setUsers(res.data || []);
                setTotal(res.pagination?.total || 0);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchUsers(); }, [page, search]);

    const handleSendSMS = async () => {
        if (!smsMessage.trim()) return;
        setActionLoading(true);
        try {
            await api.post('/admin/sms/send', {
                phone: smsModal.phone,
                message: smsMessage,
            });
            alert('SMS sent successfully!');
            setSmsModal(null);
            setSmsMessage('');
        } catch (err) {
            alert(err.message || 'Failed to send SMS');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-text-primary">Users</h1>
                    <p className="text-sm text-text-secondary mt-1">{total} total users</p>
                </div>
                <div className="relative">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="pl-9 pr-4 py-2.5 rounded-xl bg-bg-secondary border border-border-color text-text-primary text-sm focus:outline-none focus:border-accent transition-colors w-64"
                        placeholder="Search users…"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="bg-bg-secondary rounded-xl border border-border-color overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">User</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Role</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Credits</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Journey Status</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-b border-border-color last:border-0 hover:bg-bg-hover/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                                                {u.name?.charAt(0)?.toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-text-primary">{u.name}</p>
                                                <p className="text-[11px] text-text-secondary">{u.email}</p>
                                                {u.phone && <p className="text-[10px] text-text-secondary/70">{u.phone}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${u.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-bg-hover text-text-secondary'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <IoCashOutline className="text-text-secondary" />
                                            {u.creditBank ? (
                                                <span className="text-sm font-semibold text-text-primary">
                                                    {u.creditBank.totalCredits - u.creditBank.usedCredits} / {u.creditBank.totalCredits}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-text-secondary">—</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        {u.onboarding ? (
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLORS[u.onboarding.status] || 'bg-bg-hover text-text-secondary'}`}>
                                                {u.onboarding.status.replace('_', ' ')}
                                            </span>
                                        ) : (
                                            u.subscription?.status === 'active' ? (
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Recurring Client</span>
                                            ) : (
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-bg-hover text-text-secondary/40 italic">Not Started</span>
                                            )
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setSmsModal({ userId: u._id, phone: u.phone, name: u.name })}
                                                disabled={!u.phone}
                                                className={`p-2 rounded-lg transition-all ${u.phone ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'opacity-20 cursor-not-allowed'}`}
                                                title="Send SMS"
                                            >
                                                <IoChatbubbleEllipsesOutline className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (u.onboarding) {
                                                        window.location.href = '/onboarding';
                                                    } else {
                                                        setActionLoading(true);
                                                        api.put(`/onboarding/${u._id}/step`, { step: 'skip_to_completed' })
                                                            .then(() => {
                                                                alert('Onboarding started and marked as existing user!');
                                                                fetchUsers();
                                                            })
                                                            .catch(err => alert(err.message))
                                                            .finally(() => setActionLoading(false));
                                                    }
                                                }}
                                                className={`p-2 rounded-lg transition-all ${u.onboarding ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-accent/10 text-accent hover:bg-accent/20'}`}
                                                title={u.onboarding ? 'View Onboarding' : 'Start Onboarding (as Existing)'}
                                            >
                                                <IoRocketOutline className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {total > 20 && (
                        <div className="flex items-center justify-between px-5 py-3 border-t border-border-color">
                            <span className="text-[11px] text-text-secondary">Page {page} of {Math.ceil(total / 20)}</span>
                            <div className="flex gap-2">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-bg-hover text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors">
                                    Previous
                                </button>
                                <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 20)}
                                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-bg-hover text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* SMS Modal */}
            {smsModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-bg-secondary border border-border-color rounded-2xl w-full max-w-md animate-scale-in">
                        <div className="p-6 border-b border-border-color">
                            <h2 className="text-lg font-bold text-text-primary">Send SMS to {smsModal.name}</h2>
                            <p className="text-xs text-text-secondary mt-1">Recipient: {smsModal.phone}</p>
                        </div>
                        <div className="p-6">
                            <textarea
                                value={smsMessage}
                                onChange={(e) => setSmsMessage(e.target.value)}
                                className="w-full h-32 p-4 rounded-xl bg-bg-primary border border-border-color text-sm text-text-primary focus:outline-none focus:border-accent resize-none placeholder:text-text-secondary/50"
                                placeholder="Type your message here..."
                            />
                        </div>
                        <div className="p-6 flex gap-3">
                            <button
                                onClick={() => setSmsModal(null)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-border-color text-sm font-semibold text-text-secondary hover:bg-bg-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendSMS}
                                disabled={actionLoading || !smsMessage.trim()}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50"
                            >
                                {actionLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;
