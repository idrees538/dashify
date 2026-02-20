import {
    IoEyeOutline,
    IoHeartOutline,
    IoFlashOutline,
    IoTrendingUpOutline,
    IoFunnelOutline,
} from 'react-icons/io5';
const ANALYTICS_CARDS = [
    { label: 'Total Views', value: '24.5K', change: '+12.3%', up: true, icon: IoEyeOutline, color: '--purple' },
    { label: 'Engagement Rate', value: '8.7%', change: '+2.1%', up: true, icon: IoHeartOutline, color: '--green' },
    { label: 'Token Consumption', value: '1,200', change: '-5.4%', up: false, icon: IoFlashOutline, color: '--orange' },
    { label: 'Growth Rate', value: '15.2%', change: '+4.8%', up: true, icon: IoTrendingUpOutline, color: '--blue' },
];

const BAR_DATA = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 80 },
    { label: 'Wed', value: 45 },
    { label: 'Thu', value: 90 },
    { label: 'Fri', value: 70 },
    { label: 'Sat', value: 55 },
    { label: 'Sun', value: 40 },
];

const LINE_DATA = [30, 45, 38, 65, 55, 72, 60, 85, 78, 92, 88, 95];
const LINE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Analytics() {
    const maxBar = Math.max(...BAR_DATA.map((d) => d.value));
    const maxLine = Math.max(...LINE_DATA);

    // Build SVG path for line chart
    const linePoints = LINE_DATA.map((val, i) => {
        const x = (i / (LINE_DATA.length - 1)) * 100;
        const y = 100 - (val / maxLine) * 100;
        return `${x},${y}`;
    });
    const linePath = `M${linePoints.join(' L')}`;
    const areaPath = `${linePath} L100,100 L0,100 Z`;

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <div className="mb-8">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-[26px] font-bold text-text-primary mb-2">Analytics</h1>
                        <p className="text-[15px] text-text-secondary font-normal">Visualize your usage and performance metrics.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg text-sm font-medium border border-accent bg-accent text-white transition-colors">7 Days</button>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium border border-border-color bg-bg-secondary text-text-secondary hover:bg-bg-hover transition-colors">30 Days</button>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium border border-border-color bg-bg-secondary text-text-secondary hover:bg-bg-hover transition-colors">90 Days</button>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium border border-border-color bg-bg-secondary text-text-secondary hover:bg-bg-hover transition-colors flex items-center gap-2">
                            <IoFunnelOutline /> Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mb-8">
                {ANALYTICS_CARDS.map((item, i) => {
                    const Icon = item.icon;
                    const iconColorClass = item.color === '--purple' ? 'bg-accent-light text-accent' :
                        item.color === '--blue' ? 'bg-blue-500/10 text-blue-500' :
                            item.color === '--green' ? 'bg-[#10B981]/10 text-[#10B981]' :
                                item.color === '--orange' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-gray-500/10 text-gray-500';
                    return (
                        <div className="bg-bg-secondary rounded-xl p-[18px] shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200" key={i}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] ${iconColorClass}`}>
                                <Icon />
                            </div>
                            <p className="text-[13px] font-medium text-text-secondary uppercase tracking-wider mb-2">{item.label}</p>
                            <h2 className="text-[32px] font-bold text-text-primary mb-1">{item.value}</h2>
                            <span className={`text-[13px] font-medium ${item.up ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                {item.up ? '↑' : '↓'} {item.change}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Bar Chart */}
                <div className="bg-bg-secondary rounded-xl p-[18px] shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <h3 className="text-base font-semibold text-text-primary mb-5">Weekly Activity</h3>
                    <div className="flex items-end justify-between h-48 gap-4 px-2">
                        {BAR_DATA.map((d, i) => (
                            <div className="flex-1 flex flex-col items-center gap-3 h-full" key={i}>
                                <div className="flex-1 w-3 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden relative">
                                    <div
                                        className="absolute bottom-0 left-0 w-full bg-accent rounded-full transition-all duration-500"
                                        style={{ height: `${(d.value / maxBar) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[11px] text-text-secondary font-medium">{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Line Chart */}
                <div className="bg-bg-secondary rounded-xl p-[18px] shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    <h3 className="text-base font-semibold text-text-primary mb-5">Monthly Growth</h3>
                    <div className="relative h-48">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
                                </linearGradient>
                            </defs>
                            <path d={areaPath} fill="url(#lineGrad)" />
                            <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <div className="flex justify-between mt-3">
                            {LINE_MONTHS.map((m) => (
                                <span className="text-[10px] text-text-secondary" key={m}>{m}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
