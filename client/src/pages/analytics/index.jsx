import {
    IoEyeOutline,
    IoHeartOutline,
    IoFlashOutline,
    IoTrendingUpOutline,
    IoFunnelOutline,
} from 'react-icons/io5';
import './Analytics.css';

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
        <div className="page">
            <div className="page__header">
                <div className="analytics-header">
                    <div>
                        <h1 className="page__title">Analytics</h1>
                        <p className="page__subtitle">Visualize your usage and performance metrics.</p>
                    </div>
                    <div className="analytics-filters">
                        <button className="analytics-filter-btn analytics-filter-btn--active">7 Days</button>
                        <button className="analytics-filter-btn">30 Days</button>
                        <button className="analytics-filter-btn">90 Days</button>
                        <button className="analytics-filter-btn">
                            <IoFunnelOutline /> Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Analytics Cards */}
            <div className="page__cards">
                {ANALYTICS_CARDS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div className="card" key={i}>
                            <div className={`card__icon card__icon${item.color}`}>
                                <Icon />
                            </div>
                            <p className="card__label">{item.label}</p>
                            <h2 className="card__value">{item.value}</h2>
                            <span className={`card__change card__change--${item.up ? 'up' : 'down'}`}>
                                {item.up ? '↑' : '↓'} {item.change}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="analytics-charts">
                {/* Bar Chart */}
                <div className="card analytics-chart">
                    <h3 className="analytics-chart__title">Weekly Activity</h3>
                    <div className="analytics-bar-chart">
                        {BAR_DATA.map((d, i) => (
                            <div className="analytics-bar-col" key={i}>
                                <div className="analytics-bar-track">
                                    <div
                                        className="analytics-bar-fill"
                                        style={{ height: `${(d.value / maxBar) * 100}%` }}
                                    />
                                </div>
                                <span className="analytics-bar-label">{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Line Chart */}
                <div className="card analytics-chart">
                    <h3 className="analytics-chart__title">Monthly Growth</h3>
                    <div className="analytics-line-chart">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="analytics-line-svg">
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
                                </linearGradient>
                            </defs>
                            <path d={areaPath} fill="url(#lineGrad)" />
                            <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <div className="analytics-line-labels">
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
