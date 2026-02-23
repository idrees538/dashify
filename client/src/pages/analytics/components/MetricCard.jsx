import React, { useState } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';

const MetricCard = ({ label, value, change, up, info, icon: Icon, colorClass }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="bg-bg-secondary rounded-lg p-4 shadow-sm border border-border-color hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${colorClass || 'bg-accent/10 text-accent'}`}>
                    {Icon ? <Icon /> : <IoInformationCircleOutline />}
                </div>
                <div className="relative">
                    <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="text-text-secondary hover:text-accent transition-colors"
                    >
                        <IoInformationCircleOutline size={20} />
                    </button>
                    {showTooltip && (
                        <div className="absolute right-0 top-full mt-2 w-48 p-3 bg-bg-primary border border-border-color rounded-lg shadow-2xl z-20 text-[12px] text-text-secondary leading-relaxed animate-fade-in">
                            {info}
                        </div>
                    )}
                </div>
            </div>

            <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-0.5">{label}</p>
            <h2 className="text-xl font-bold text-text-primary mb-1.5 group-hover:text-accent transition-colors">{value}</h2>

            <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[12px] font-bold flex items-center gap-0.5 ${up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {up ? '↑' : '↓'} {change}
                </span>
                <span className="text-[11px] text-text-secondary font-medium">vs last period</span>
            </div>
        </div>
    );
};

export default MetricCard;
