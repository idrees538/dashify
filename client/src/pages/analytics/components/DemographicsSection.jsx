import React from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';

const DemographicsSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* Map Placeholder */}
            <div className="lg:col-span-2 bg-bg-secondary border border-border-color rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-text-primary">Demographics by Location</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-accent"></span>
                            <span className="text-xs text-text-secondary">High Engagement</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-accent/30"></span>
                            <span className="text-xs text-text-secondary">Low Engagement</span>
                        </div>
                    </div>
                </div>

                {/* SVG Map of World (Simplified) */}
                <div className="relative h-[280px] bg-bg-primary/50 rounded-lg overflow-hidden flex items-center justify-center border border-border-color/50">
                    <svg viewBox="0 0 1000 500" className="w-full h-full opacity-40">
                        {/* More detailed shapes for world map mockup */}
                        <path d="M150,150 L200,120 L250,130 L300,110 L350,150 L300,250 L200,230 Z" className="fill-accent/20 stroke-accent/40" strokeWidth="2" />
                        <path d="M600,80 L700,50 L800,70 L850,120 L800,200 L700,220 L600,180 Z" className="fill-accent/10 stroke-accent/30" strokeWidth="2" />
                        <path d="M400,300 L500,280 L600,320 L550,400 L450,420 Z" className="fill-accent/5 stroke-accent/20" strokeWidth="2" />

                        <circle cx="230" cy="140" r="8" className="fill-accent animate-pulse" />
                        <circle cx="280" cy="180" r="5" className="fill-accent/60 animate-pulse" />
                        <circle cx="720" cy="90" r="7" className="fill-accent/40 animate-pulse" />
                        <circle cx="500" cy="340" r="6" className="fill-accent/30 animate-pulse" />

                        <text x="500" y="250" textAnchor="middle" className="fill-text-secondary text-xl font-bold italic tracking-tighter opacity-30 uppercase">Interactive Regional Activity Map</text>
                    </svg>

                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                        <div className="bg-bg-secondary p-2 rounded-lg border border-border-color shadow-lg flex items-center justify-between gap-4 w-40">
                            <span className="text-xs font-medium">United States</span>
                            <span className="text-xs font-bold text-accent">42%</span>
                        </div>
                        <div className="bg-bg-secondary p-2 rounded-lg border border-border-color shadow-lg flex items-center justify-between gap-4 w-40">
                            <span className="text-xs font-medium">United Kingdom</span>
                            <span className="text-xs font-bold text-accent">18%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demographics Stats */}
            <div className="space-y-4">
                <div className="bg-bg-secondary border border-border-color rounded-lg p-4 shadow-sm">
                    <h3 className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-3">Top Regions</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Top Country', value: 'United States' },
                            { label: 'Top City', value: 'New York' },
                            { label: 'Age Range', value: '18 - 34' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center justify-between pb-3 border-b border-border-color last:border-0">
                                <span className="text-sm text-text-secondary font-medium">{stat.label}</span>
                                <span className="text-sm text-text-primary font-bold">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-bg-secondary border border-border-color rounded-lg p-4 shadow-sm">
                    <h3 className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-3">Gender Split</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 text-center">
                            <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2 text-lg shadow-inner">
                                <FaMale />
                            </div>
                            <p className="text-base font-bold text-text-primary">48%</p>
                            <p className="text-[10px] text-text-secondary font-medium uppercase">Male</p>
                        </div>
                        <div className="w-[1px] h-10 bg-border-color"></div>
                        <div className="flex-1 text-center">
                            <div className="w-10 h-10 bg-pink-500/10 text-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2 text-lg shadow-inner">
                                <FaFemale />
                            </div>
                            <p className="text-base font-bold text-text-primary">52%</p>
                            <p className="text-[10px] text-text-secondary font-medium uppercase">Female</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemographicsSection;
