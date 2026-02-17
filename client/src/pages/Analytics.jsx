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
        <div className="max-w-[1200px] mx-auto animate-page-in">
            <div className="mb-8">
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <h1 className="text-[28px] font-bold text-primary-text mb-2 max-md:text-2xl">Analytics</h1>
                        <p className="text-[15px] text-secondary-text font-normal">Visualize your usage and performance metrics.</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium bg-accent text-white border border-accent">7 Days</button>
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-secondary-text bg-card-bg border border-border-main transition-all duration-200 hover:border-accent hover:text-accent">30 Days</button>
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-secondary-text bg-card-bg border border-border-main transition-all duration-200 hover:border-accent hover:text-accent">90 Days</button>
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-secondary-text bg-card-bg border border-border-main transition-all duration-200 hover:border-accent hover:text-accent">
                            <IoFunnelOutline /> Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mb-8 max-md:grid-cols-1 max-md:gap-4">
                {ANALYTICS_CARDS.map((item, i) => {
                    const Icon = item.icon;
                    const iconColors = {
                        '--purple': 'bg-[#8204ff1f] text-accent',
                        '--green': 'bg-[#10b9811f] text-[#10b981]',
                        '--orange': 'bg-[#f59e0b1f] text-[#f59e0b]',
                        '--blue': 'bg-[#3b82f61f] text-[#3b82f6]'
                    };
                    return (
                        <div className="card-base" key={i}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[22px] ${iconColors[item.color]}`}>
                                <Icon />
                            </div>
                            <p className="text-[13px] font-medium text-secondary-text uppercase tracking-[0.5px] mb-2">{item.label}</p>
                            <h2 className="text-[32px] font-bold text-primary-text mb-1">{item.value}</h2>
                            <span className={`text-[13px] font-medium ${item.up ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                                {item.up ? '↑' : '↓'} {item.change}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-6 mt-6">
                {/* Bar Chart */}
                <div className="card-base min-h-[320px] flex flex-col">
                    <h3 className="text-base font-semibold text-primary-text mb-6">Weekly Activity</h3>
                    <div className="flex items-end justify-between flex-1 gap-2 pt-4 pb-2">
                        {BAR_DATA.map((d, i) => (
                            <div className="flex flex-col items-center flex-1 gap-3" key={i}>
                                <div className="w-full max-w-[32px] flex-1 bg-[#1a1a2e14] dark:bg-white/10 rounded-lg relative overflow-hidden">
                                    <div
                                        className="absolute bottom-0 left-0 w-full bg-linear-to-t from-accent to-[#c084fc] rounded-lg transition-[height] duration-700 ease-out"
                                        style={{ height: `${(d.value / maxBar) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[11px] text-secondary-text font-medium">{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Line Chart */}
                <div className="card-base min-h-[320px] flex flex-col">
                    <h3 className="text-base font-semibold text-primary-text mb-6">Monthly Growth</h3>
                    <div className="flex-1 relative flex flex-col min-h-[180px]">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full min-h-[150px]">
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
                                </linearGradient>
                            </defs>
                            <path d={areaPath} fill="url(#lineGrad)" />
                            <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <div className="flex justify-between items-center mt-4 pt-2 border-t border-border-main text-[10px] text-secondary-text uppercase font-medium">
                            {LINE_MONTHS.map((m) => (
                                <span key={m}>{m}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
