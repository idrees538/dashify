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
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedDraft = drafts.find((d) => d.id === selectedId);
    const cfg = selectedDraft ? STATUS_CONFIG[selectedDraft.status] : null;
    const StatusIcon = cfg?.icon;
    const noteCount = noteCounts[selectedId] || 0;

    // Close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div className="mb-5 relative" ref={dropdownRef}>
            {/* Compact selection bar */}
            <button
                className="w-full flex items-center gap-3 p-3 px-4 bg-bg-secondary border border-border-color rounded-xl cursor-pointer transition-all duration-200 hover:border-accent group"
                onClick={() => setDropdownOpen((prev) => !prev)}
            >
                {/* Left: draft icon with note badge */}
                <div className="relative w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center text-lg flex-shrink-0">
                    <IoDocumentTextOutline />
                    {noteCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#FF6037] text-white text-[8px] font-bold flex items-center justify-center leading-none shadow-sm">
                            {noteCount}
                        </span>
                    )}
                </div>

                {/* Center: draft info */}
                <div className="flex-1 flex flex-col items-start gap-0.5 min-w-0">
                    <span className="text-[14px] font-semibold text-text-primary truncate w-full text-left">
                        {selectedDraft?.title}
                    </span>
                    <span className="text-[11px] text-text-secondary flex items-center gap-1.5">
                        v{selectedDraft?.version} · {selectedDraft?.date}
                        {noteCount > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-accent text-[10px]">
                                <IoChatbubbleOutline /> {noteCount} note{noteCount !== 1 ? 's' : ''}
                            </span>
                        )}
                    </span>
                </div>

                {/* Right: status + chevron */}
                {cfg && (
                    <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap flex-shrink-0"
                        style={{ background: cfg.bg, color: cfg.color }}
                    >
                        <StatusIcon /> {cfg.label}
                    </span>
                )}
                <IoChevronDownOutline
                    className={`text-text-secondary text-sm flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown list */}
            {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-bg-secondary border border-border-color rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                    <div className="p-1.5 max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-border-color">
                        {drafts.map((draft) => {
                            const isActive = draft.id === selectedId;
                            const dCfg = STATUS_CONFIG[draft.status];
                            const DIcon = dCfg.icon;
                            const dNoteCount = noteCounts[draft.id] || 0;
                            return (
                                <button
                                    key={draft.id}
                                    className={`flex items-center gap-3 w-full p-2.5 px-3 rounded-lg cursor-pointer transition-all duration-150 text-left
                                        ${isActive
                                            ? 'bg-accent/8 border border-accent/30'
                                            : 'border border-transparent hover:bg-bg-hover'
                                        }`}
                                    onClick={() => {
                                        onSelect(draft.id);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {/* Icon */}
                                    <div className={`relative w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${isActive ? 'bg-accent text-white' : 'bg-bg-hover text-accent'}`}>
                                        <IoDocumentTextOutline />
                                        {dNoteCount > 0 && (
                                            <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#FF6037] text-white text-[7px] font-bold flex items-center justify-center leading-none">
                                                {dNoteCount}
                                            </span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                                        <span className="text-[13px] font-semibold text-text-primary truncate">{draft.title}</span>
                                        <span className="text-[11px] text-text-secondary">
                                            v{draft.version} · {draft.date} · {draft.duration}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <span
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
                                        style={{ background: dCfg.bg, color: dCfg.color }}
                                    >
                                        <DIcon /> {dCfg.label}
                                    </span>

                                    {/* Check for active */}
                                    {isActive && (
                                        <IoCheckmarkOutline className="text-accent text-base flex-shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DraftSelector;
