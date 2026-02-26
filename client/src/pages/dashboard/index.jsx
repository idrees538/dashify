import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    IoPlayOutline,
    IoPeopleOutline,
    IoEyeOutline,
    IoCalendarOutline,
    IoNotificationsOutline,
    IoDownloadOutline,
    IoAddOutline,
    IoVideocamOutline,
    IoChevronForwardOutline,
} from 'react-icons/io5';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('updates');

    // Chart Data
    const charts = [
        { label: 'Total Views', value: '1.2M', trend: '+12%', icon: IoPlayOutline, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Followers', value: '45.8K', trend: '+5%', icon: IoPeopleOutline, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Impressions', value: '8.4M', trend: '+8%', icon: IoEyeOutline, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="w-full max-w-[1400px] mx-auto animate-fade-in px-4 pb-8">

            {/* 1. Animated Purplish Banner */}
            <div className="relative w-full rounded-2xl overflow-hidden mb-8 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] animate-gradient-xy" />
                {/* Motion overlay */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
                </div>

                <div className="relative p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Welcome back, John Doe</h1>
                        <p className="text-white/80 font-medium text-lg">Your content is reaching new heights today.</p>
                    </div>

                    <div className="flex gap-4 md:gap-8 bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/20 shadow-inner">
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Active Plan</span>
                            <span className="text-white font-bold text-xl">Pro Creator</span>
                        </div>
                        <div className="w-[1px] bg-white/20 self-stretch" />
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Credits Available</span>
                            <span className="text-white font-bold text-xl">14 Units</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">

                {/* Left Column (8 units on large) */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">

                    {/* Visual Credit Card & Calendar Widget (Top Row of Left Col) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Visual Card */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider ml-1">Subscription Billing</h3>
                            <div className="relative aspect-[1.6/1] w-full rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 text-white shadow-xl overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                                <div className="relative h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <div className="w-4 h-4 bg-white/20 rounded-full" />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-widest opacity-80 italic">TRIPTYCH PLATINUM</span>
                                        </div>
                                        <div className="w-10 h-7 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-80 shadow-sm" />
                                    </div>
                                    <div className="tracking-[0.2em] text-lg font-bold">•••• •••• •••• 4242</div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] opacity-40 uppercase tracking-widest">Card Holder</span>
                                            <span className="text-[11px] font-bold tracking-wide">JOHN DOE</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[8px] opacity-40 uppercase tracking-widest">Expires</span>
                                            <span className="text-[11px] font-bold">12/28</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Calendar Widget */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[11px] font-bold text-text-primary/50 uppercase tracking-wider ml-1">Next Event</h3>
                            <div className="bg-bg-secondary rounded-2xl p-5 border border-border-color shadow-sm flex flex-col justify-between h-full">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex flex-col items-center justify-center border border-accent/20">
                                        <span className="text-[10px] font-bold uppercase">Feb</span>
                                        <span className="text-xl font-bold leading-tight">27</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-text-primary">Social Shoot Day</h4>
                                        <p className="text-[11px] text-text-secondary">09:00 AM - Downtown Studio</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-border-color/50 flex justify-between items-center">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-secondary bg-bg-hover flex items-center justify-center text-[8px] font-bold">
                                                U{i}
                                            </div>
                                        ))}
                                    </div>
                                    <button className="text-[11px] font-bold text-accent hover:underline">View in Calendar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3 Charts (Views, Followers, Impressions) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {charts.map((chart, i) => (
                            <div key={i} className="bg-bg-secondary rounded-2xl p-5 border border-border-color shadow-sm group hover:border-accent/40 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-9 h-9 rounded-lg ${chart.bg} ${chart.color} flex items-center justify-center text-xl`}>
                                        <chart.icon />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{chart.trend}</span>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{chart.label}</h4>
                                    <p className="text-2xl font-black text-text-primary tracking-tight">{chart.value}</p>
                                </div>
                                <div className="flex items-end gap-1 h-12">
                                    {[30, 60, 45, 80, 50, 90, 70].map((h, j) => (
                                        <div
                                            key={j}
                                            className={`flex-1 rounded-sm bg-accent group-hover:bg-accent opacity-20 group-hover:opacity-100 transition-all`}
                                            style={{ height: `${h}%`, transitionDelay: `${j * 50}ms` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column (4 units on large) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

                    {/* Credit Circle */}
                    <div className="bg-bg-secondary rounded-3xl p-6 border border-border-color shadow-sm flex flex-col items-center">
                        <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    className="text-bg-hover"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * 14 / 20)}
                                    strokeLinecap="round"
                                    className="text-accent transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-text-primary">14</span>
                                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Units Left</span>
                            </div>
                        </div>
                        <div className="w-full flex bg-bg-hover rounded-xl p-1 gap-1">
                            <button className="flex-1 py-1.5 text-[10px] font-bold bg-bg-card rounded-lg shadow-sm">Available Units</button>
                            <button className="flex-1 py-1.5 text-[10px] font-bold text-text-secondary hover:text-accent transition-colors flex items-center justify-center gap-1 group">
                                <IoAddOutline className="text-xs" />
                                Get More
                            </button>
                        </div>
                    </div>

                    {/* Vertical Notification Tab Bar */}
                    <div className="bg-bg-secondary rounded-2xl border border-border-color shadow-sm flex flex-col overflow-hidden min-h-[300px]">
                        <div className="flex border-b border-border-color">
                            <button
                                onClick={() => setActiveTab('updates')}
                                className={`flex-1 flex flex-col items-center py-3 gap-1 transition-all ${activeTab === 'updates' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-text-secondary hover:bg-bg-hover'}`}
                            >
                                <IoNotificationsOutline className="text-lg" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Updates</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('downloads')}
                                className={`flex-1 flex flex-col items-center py-3 gap-1 transition-all ${activeTab === 'downloads' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-text-secondary hover:bg-bg-hover'}`}
                            >
                                <IoDownloadOutline className="text-lg" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Downloads</span>
                            </button>
                        </div>
                        <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[200px]">
                            {activeTab === 'updates' ? (
                                [
                                    { title: 'New Review Ready', time: '2h ago', text: 'Brand Campaign draft 2 is ready.' },
                                    { title: 'Project Updated', time: '5h ago', text: 'Acme Studio scope revised.' },
                                    { title: 'Welcome aboard!', time: '1d ago', text: 'Thanks for joining Pro Creator plan.' },
                                ].map((n, i) => (
                                    <div key={i} className="flex flex-col gap-1 pb-4 border-b border-border-color last:border-0">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[11px] font-bold text-text-primary">{n.title}</span>
                                            <span className="text-[9px] text-text-secondary font-medium">{n.time}</span>
                                        </div>
                                        <p className="text-[11px] text-text-secondary leading-normal">{n.text}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-border-color flex items-center justify-center text-text-secondary/30">
                                        <IoDownloadOutline className="text-xl" />
                                    </div>
                                    <p className="text-[11px] font-medium text-text-secondary italic">No downloads available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Scheduling Button */}
                    <button className="w-full bg-accent hover:bg-accent-light text-white p-4 rounded-2xl shadow-lg border border-accent/20 transition-all flex items-center justify-between group overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl backdrop-blur-sm">
                                <IoVideocamOutline />
                            </div>
                            <div className="flex flex-col items-start whitespace-nowrap">
                                <span className="text-xs font-bold tracking-tight">Schedule Booking</span>
                                <span className="text-[10px] opacity-80 font-medium">Call, Meeting or Day</span>
                            </div>
                        </div>
                        <IoChevronForwardOutline className="text-xl relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Global Keyframes in JS for animation */}
            <style>
                {`
                @keyframes gradient-xy {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-xy {
                    background-size: 400% 400%;
                    animation: gradient-xy 15s ease infinite;
                }
                `}
            </style>
        </div>
    );
}

export default Dashboard;
