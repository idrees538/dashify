import { useState, useRef, useEffect } from 'react';
import {
    IoDocumentTextOutline,
    IoCheckmarkCircle,
    IoTimeOutline,
    IoCreateOutline,
    IoChatbubbleOutline,
    IoChevronDownOutline,
    IoCheckmarkOutline,
} from 'react-icons/io5';

const STATUS_CONFIG = {
    draft: { label: 'Draft', icon: IoCreateOutline, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    'in-review': { label: 'In Review', icon: IoTimeOutline, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    approved: { label: 'Approved', icon: IoCheckmarkCircle, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
};

function DraftSelector({ drafts, selectedId, onSelect, noteCounts = {} }) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Select a Draft to Review
                </h3>
                <span className="text-[11px] font-medium text-text-secondary bg-bg-secondary px-2 py-0.5 rounded-full border border-border-color">
                    {drafts.length} Total Drafts
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {drafts.map((draft, idx) => {
                    const isActive = draft.id === selectedId;
                    const cfg = STATUS_CONFIG[draft.status] || STATUS_CONFIG.draft;
                    const StatusIcon = cfg.icon;
                    const noteCount = noteCounts[draft.id] || 0;

                    return (
                        <button
                            key={draft.id}
                            onClick={() => onSelect(draft.id)}
                            className={`group relative flex flex-col bg-bg-secondary border rounded-xl overflow-hidden transition-all duration-300 text-left
                                ${isActive
                                    ? 'border-accent shadow-lg shadow-accent/5 ring-1 ring-accent/20 translate-y-[-2px]'
                                    : 'border-border-color hover:border-accent/40 hover:shadow-md hover:translate-y-[-1px]'
                                }`}
                        >
                            {/* Card Thumbnail / Preview */}
                            <div className="relative aspect-video w-full overflow-hidden bg-bg-hover">
                                {draft.thumbnailUrl ? (
                                    <img
                                        src={draft.thumbnailUrl}
                                        alt={draft.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center
                                        ${draft.color === 'purple' ? 'bg-purple-500/10' :
                                            draft.color === 'blue' ? 'bg-blue-500/10' :
                                                draft.color === 'green' ? 'bg-green-500/10' : 'bg-orange-500/10'}`}>
                                        <IoDocumentTextOutline className="text-2xl text-accent/40" />
                                    </div>
                                )}

                                {/* Overlay for status/version */}
                                <div className="absolute top-2 left-2 flex gap-1.5">
                                    <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[9px] font-bold">
                                        v{draft.version}
                                    </span>
                                </div>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute inset-0 border-2 border-accent rounded-xl z-10 pointer-events-none" />
                                )}

                                {/* Note Badge */}
                                {noteCount > 0 && (
                                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-full bg-accent text-white text-[9px] font-bold flex items-center gap-1 shadow-sm">
                                        <IoChatbubbleOutline /> {noteCount}
                                    </div>
                                )}
                            </div>

                            {/* Card Info */}
                            <div className="p-3 flex flex-col gap-1">
                                <h4 className={`text-[13px] font-bold truncate transition-colors ${isActive ? 'text-accent' : 'text-text-primary'}`}>
                                    {draft.title}
                                </h4>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-[10px] text-text-secondary font-medium">
                                        {draft.date} • {draft.duration}
                                    </span>
                                    <span
                                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                                        style={{ background: cfg.bg, color: cfg.color }}
                                    >
                                        <StatusIcon size={10} /> {cfg.label}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default DraftSelector;
