import { useState, useEffect } from 'react';
import api from '../services/api';
import {
    IoPeopleOutline,
    IoLayersOutline,
    IoVideocamOutline,
    IoCashOutline,
    IoCardOutline,
    IoCalendarOutline,
    IoTrendingUpOutline,
} from 'react-icons/io5';

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/stats')
            .then((res) => setStats(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const cards = [
        { label: 'Total Users', value: stats?.totalUsers || 0, icon: IoPeopleOutline, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Total Projects', value: stats?.totalProjects || 0, icon: IoLayersOutline, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Total Videos', value: stats?.totalVideos || 0, icon: IoVideocamOutline, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: 'Credits Allocated', value: stats?.credits?.totalAllocated || 0, icon: IoCashOutline, color: 'text-amber-400', bg: 'bg-amber-400/10' },
        { label: 'Credits Used', value: stats?.credits?.totalUsed || 0, icon: IoTrendingUpOutline, color: 'text-rose-400', bg: 'bg-rose-400/10' },
        { label: 'Active Subscriptions', value: stats?.activeSubscriptions || 0, icon: IoCardOutline, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
        { label: 'Pending Bookings', value: stats?.pendingBookings || 0, icon: IoCalendarOutline, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    ];

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
                <p className="text-sm text-text-secondary mt-1">Platform overview and key metrics</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                {cards.map((card, i) => (
                    <div key={i} className="bg-bg-secondary rounded-xl border border-border-color p-5 hover:border-accent/30 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{card.label}</span>
                            <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                                <card.icon className="text-lg" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-text-primary">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Users */}
            {stats?.recentUsers?.length > 0 && (
                <div className="bg-bg-secondary rounded-xl border border-border-color p-5">
                    <h3 className="text-sm font-bold text-text-primary mb-4">Recent Users</h3>
                    <div className="space-y-3">
                        {stats.recentUsers.map((u) => (
                            <div key={u._id} className="flex items-center justify-between py-2 border-b border-border-color last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                                        {u.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-text-primary">{u.name}</p>
                                        <p className="text-[11px] text-text-secondary">{u.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${u.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-bg-hover text-text-secondary'}`}>
                                        {u.role}
                                    </span>
                                    <span className="text-[11px] text-text-secondary">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
