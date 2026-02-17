import { NavLink } from 'react-router-dom';
import {
    IoCheckmarkCircleOutline,
    IoFlashOutline,
    IoVideocamOutline,
    IoBarChartOutline,
    IoShareSocialOutline,
    IoRocketOutline,
    IoTimeOutline,
} from 'react-icons/io5';

const PLANS = [
    {
        name: 'Pro Creator Plan',
        expiry: 'Mar 15, 2026',
        tokens: 1500,
        status: 'Active',
    },
    {
        name: 'Starter Plan',
        expiry: 'Feb 28, 2026',
        tokens: 500,
        status: 'Active',
    },
    {
        name: 'Enterprise Trial',
        expiry: 'Jan 10, 2026',
        tokens: 200,
        status: 'Expired',
    },
];

const QUICK_WIDGETS = [
    {
        icon: IoVideocamOutline,
        label: 'Video Usage',
        value: '12 videos',
        color: '--purple',
        path: '/video',
    },
    {
        icon: IoBarChartOutline,
        label: 'Analytics',
        value: '3.2K views',
        color: '--blue',
        path: '/analytics',
    },
    {
        icon: IoShareSocialOutline,
        label: 'Social Activity',
        value: '28 posts',
        color: '--green',
        path: '/social',
    },
];

function Dashboard() {
    const tokensUsed = 1200;
    const tokensTotal = 2000;
    const tokensPercent = (tokensUsed / tokensTotal) * 100;

    return (
        <div className="max-w-[1200px] mx-auto animate-page-in">
            {/* Section 1: Welcome + Overview */}
            <div className="flex justify-between items-center flex-wrap gap-4 mb-7 p-7 bg-linear-[135deg,var(--accent)_0%,#a855f7_50%,#c084fc_100%] rounded-[20px] shadow-large">
                <div className="flex-1 min-w-[200px]">
                    <h1 className="text-[26px] font-bold text-white">Welcome back, John 👋</h1>
                    <p className="text-sm text-white/80 mt-1">Here's your account overview</p>
                </div>
                <div className="flex gap-2.5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[20px] text-[13px] font-semibold bg-[#10b98126] text-[#10b981] border border-[#10b9814d]">
                        <IoCheckmarkCircleOutline /> Active
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[20px] text-[13px] font-semibold bg-white/20 text-white border border-white/30">
                        <IoRocketOutline /> 2 Active Plans
                    </span>
                </div>
            </div>

            {/* Section 2: Token Summary */}
            <div className="card-base mb-8">
                <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-[#f59e0b1f] text-[#f59e0b] flex items-center justify-center text-[22px]">
                        <IoFlashOutline />
                    </div>
                    <div>
                        <h3 className="text-[17px] font-semibold text-primary-text">Token Usage</h3>
                        <p className="text-[13px] text-secondary-text">Track your token consumption</p>
                    </div>
                </div>
                <div className="flex gap-8 mb-4.5 flex-wrap">
                    <div className="flex flex-col gap-1">
                        <span className="text-[12px] text-secondary-text uppercase tracking-[0.5px] font-medium">Total Available</span>
                        <span className="text-2xl font-bold text-primary-text">{tokensTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[12px] text-secondary-text uppercase tracking-[0.5px] font-medium">Used</span>
                        <span className="text-2xl font-bold text-[#f59e0b]">{tokensUsed.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[12px] text-secondary-text uppercase tracking-[0.5px] font-medium">Remaining</span>
                        <span className="text-2xl font-bold text-[#10b981]">{(tokensTotal - tokensUsed).toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="w-full h-2.5 bg-[#1a1a2e14] dark:bg-white/10 rounded-[5px] overflow-hidden">
                        <div
                            className="h-full bg-linear-to-r from-accent to-[#c084fc] rounded-[5px] transition-[width] duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            style={{ width: `${tokensPercent}%` }}
                        />
                    </div>
                    <span className="text-[12px] text-secondary-text font-medium text-right">
                        {tokensUsed.toLocaleString()} / {tokensTotal.toLocaleString()} used
                    </span>
                </div>
            </div>

            {/* Section 3: Active Plans */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-primary-text mb-4">Active Plans</h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
                    {PLANS.map((plan, i) => (
                        <div className="card-base" key={i}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-semibold text-primary-text">{plan.name}</h3>
                                <span className={`px-3 py-1 rounded-xl text-[12px] font-semibold ${plan.status.toLowerCase() === 'active' ? 'bg-[#10b9811f] text-[#10b981]' : 'bg-[#ef44441f] text-[#ef4444]'
                                    }`}>
                                    {plan.status}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center gap-2 text-[13px] text-secondary-text">
                                    <IoTimeOutline className="text-base text-secondary-text/60" />
                                    <span>Expires: {plan.expiry}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[13px] text-secondary-text">
                                    <IoFlashOutline className="text-base text-secondary-text/60" />
                                    <span>{plan.tokens} tokens allocated</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 4: Quick Access Widgets */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-primary-text mb-4">Quick Access</h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                    {QUICK_WIDGETS.map((w, i) => {
                        const Icon = w.icon;
                        const iconColors = {
                            '--purple': 'bg-[#8204ff1f] text-accent',
                            '--blue': 'bg-[#3b82f61f] text-[#3b82f6]',
                            '--green': 'bg-[#10b9811f] text-[#10b981]'
                        };
                        return (
                            <NavLink to={w.path} className="card-base flex flex-col items-start group" key={i}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] transition-transform duration-200 group-hover:scale-110 ${iconColors[w.color]}`}>
                                    <Icon />
                                </div>
                                <p className="text-sm font-medium text-secondary-text mb-1">{w.label}</p>
                                <p className="text-xl font-bold text-primary-text">{w.value}</p>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
