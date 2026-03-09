import { useState, useEffect } from 'react';
import api from '../services/api';
import { IoCashOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

function Credits() {
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [modal, setModal] = useState(null); // { userId, userName, action: 'grant' | 'deduct' }
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const fetchBanks = () => {
        setLoading(true);
        api.get('/admin/credits', { page, limit: 20 })
            .then((res) => {
                setBanks(res.data || []);
                setTotal(res.pagination?.total || 0);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchBanks(); }, [page]);

    const handleAction = async () => {
        if (!modal || !amount) return;
        setActionLoading(true);

        try {
            const endpoint = modal.action === 'grant' ? '/admin/credits/grant' : '/admin/credits/deduct';
            await api.post(endpoint, {
                userId: modal.userId,
                amount: parseInt(amount),
                description: description || undefined,
            });
            setModal(null);
            setAmount('');
            setDescription('');
            fetchBanks();
        } catch (err) {
            alert(err.message || 'Action failed');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-text-primary">Credit Management</h1>
                <p className="text-sm text-text-secondary mt-1">View and manage all users' credit banks</p>
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
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Total</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Used</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Remaining</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Rollover</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Last Cycle</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banks.map((b) => {
                                const remaining = b.totalCredits - b.usedCredits;
                                const pct = b.totalCredits > 0 ? Math.round((b.usedCredits / b.totalCredits) * 100) : 0;

                                return (
                                    <tr key={b._id} className="border-b border-border-color last:border-0 hover:bg-bg-hover/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                                                    {b.user?.name?.charAt(0)?.toUpperCase() || '?'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-text-primary">{b.user?.name || 'Unknown'}</p>
                                                    <p className="text-[11px] text-text-secondary">{b.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm font-bold text-text-primary">{b.totalCredits}</td>
                                        <td className="px-5 py-4 text-sm font-semibold text-text-secondary">{b.usedCredits}</td>
                                        <td className="px-5 py-4">
                                            <span className={`text-sm font-bold ${remaining >= 10 ? 'text-success' : remaining > 0 ? 'text-warning' : 'text-danger'}`}>
                                                {remaining}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-text-secondary">{b.rolloverCredits}</td>
                                        <td className="px-5 py-4 text-[11px] text-text-secondary">
                                            {b.lastCycleDate ? new Date(b.lastCycleDate).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setModal({ userId: b.user?._id, userName: b.user?.name, action: 'grant' })}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                                                >
                                                    <IoAddOutline /> Grant
                                                </button>
                                                <button
                                                    onClick={() => setModal({ userId: b.user?._id, userName: b.user?.name, action: 'deduct' })}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                                                >
                                                    <IoRemoveOutline /> Deduct
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

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

            {/* Grant/Deduct Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-bg-secondary rounded-2xl border border-border-color w-full max-w-md p-6 animate-fade-in shadow-2xl">
                        <h3 className="text-base font-bold text-text-primary mb-1">
                            {modal.action === 'grant' ? 'Grant' : 'Deduct'} Credits
                        </h3>
                        <p className="text-sm text-text-secondary mb-5">For {modal.userName}</p>

                        <div className="mb-4">
                            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Amount</label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-bg-primary border border-border-color text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                                placeholder="Number of credits"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-bg-primary border border-border-color text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                                placeholder="Optional reason…"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setModal(null); setAmount(''); setDescription(''); }}
                                className="flex-1 py-2.5 rounded-xl border border-border-color text-text-secondary text-sm font-bold hover:bg-bg-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAction}
                                disabled={actionLoading || !amount}
                                className={`flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-50 ${modal.action === 'grant' ? 'bg-success hover:bg-success/80' : 'bg-danger hover:bg-danger/80'
                                    }`}
                            >
                                {actionLoading ? 'Processing…' : modal.action === 'grant' ? 'Grant Credits' : 'Deduct Credits'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Credits;
