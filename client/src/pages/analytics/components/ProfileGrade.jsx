import React from 'react';
import { IoShieldCheckmarkOutline, IoTrendingUp, IoInformationCircleOutline } from 'react-icons/io5';

const ProfileGrade = ({ grade = 'A', score = 92 }) => {
    return (
        <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color shadow-sm mb-6 flex items-center gap-8 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors" />

            <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-purple-600 shadow-lg shadow-accent/20">
                <span className="text-5xl font-black text-white italic">{grade}</span>
                <div className="absolute -bottom-2 -right-2 bg-bg-secondary p-1 rounded-lg border border-border-color shadow-sm">
                    <IoShieldCheckmarkOutline className="text-green-500 text-xl" />
                </div>
            </div>

            <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                            Profile Strength
                            <IoInformationCircleOutline className="text-text-secondary hover:text-accent cursor-help text-sm" />
                        </h3>
                        <p className="text-[12px] text-text-secondary">Based on benchmark admin rules and industry standards.</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-accent">{score}%</span>
                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Global Rank</p>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-text-secondary uppercase tracking-widest">
                        <span>Optimization Score</span>
                        <span>{score}/100</span>
                    </div>
                    <div className="h-2 w-full bg-bg-hover rounded-full overflow-hidden border border-border-color/50 p-[1px]">
                        <div
                            className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-1000"
                            style={{ width: `${score}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-1">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
                        <IoTrendingUp className="text-sm" />
                        <span className="text-[11px] font-bold">+4.2% Growth Rate</span>
                    </div>
                    <p className="text-[11px] text-text-secondary font-medium">Your profile is performing better than 88% of similar creators.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileGrade;
