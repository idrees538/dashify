import { useState, useEffect } from 'react';
import api from '../services/api';
import { IoSearchOutline, IoCashOutline, IoCardOutline } from 'react-icons/io5';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

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
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Subscription</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Joined</th>
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
                                        {u.subscription ? (
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${u.subscription.status === 'active' ? 'bg-success/10 text-success' :
                                                    u.subscription.status === 'lapsed' ? 'bg-danger/10 text-danger' :
                                                        'bg-warning/10 text-warning'
                                                }`}>
                                                {u.subscription.status}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-text-secondary">None</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        {new Date(u.createdAt).toLocaleDateString()}
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
        </div>
    );
}

export default Users;
