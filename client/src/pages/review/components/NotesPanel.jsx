import { useState, useRef, useEffect } from 'react';
import {
    IoSendOutline,
    IoTimeOutline,
    IoPersonCircleOutline,
    IoAddOutline,
    IoChatbubbleOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkCircle,
    IoFunnelOutline,
    IoBrushOutline,
    IoAtOutline,
} from 'react-icons/io5';

const FILTER_TABS = [
    { key: 'all', label: 'All' },
    { key: 'unresolved', label: 'Open' },
    { key: 'resolved', label: 'Resolved' },
];

function NoteItem({ note, isHighlighted, noteRef, onResolve }) {
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return (
        <div
            ref={noteRef}
            className={`relative flex gap-3 p-3.5 rounded-xl transition-all duration-300 border group/note
                ${note.resolved
                    ? 'opacity-50'
                    : ''
                }
                ${isHighlighted
                    ? 'bg-accent/8 border-accent/40 shadow-[0_0_12px_var(--accent-light)]'
                    : 'bg-transparent border-transparent hover:bg-bg-hover'
                }`}
        >
            {/* Accent left bar */}
            <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300
                ${isHighlighted ? 'bg-accent' : note.resolved ? 'bg-[#10b981]' : 'bg-transparent'}`}
            />

            <div className="text-[28px] text-text-secondary flex-shrink-0 leading-none mt-0.5">
                <IoPersonCircleOutline />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-semibold text-text-primary">{note.author}</span>
                    <button
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono cursor-pointer transition-colors
                            ${isHighlighted
                                ? 'bg-accent text-white'
                                : 'bg-accent-light text-accent hover:bg-accent hover:text-white'
                            }`}
                    >
                        <IoTimeOutline /> {formatTime(note.timestamp)}
                    </button>
                    {note.resolved && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#10b981]/10 text-[#10b981] text-[9px] font-semibold">
                            <IoCheckmarkCircle /> Resolved
                        </span>
                    )}
                </div>
                <p className={`text-[13px] leading-relaxed mb-1.5 ${note.resolved ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                    {note.text}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-text-secondary">{note.date}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover/note:opacity-100 transition-opacity">
                        <button className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] text-text-secondary hover:text-accent hover:bg-accent-light transition-colors">
                            <IoChatbubbleOutline /> Reply
                        </button>
                        <button
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] transition-colors
                                ${note.resolved
                                    ? 'text-[#f59e0b] hover:bg-[#f59e0b]/10'
                                    : 'text-text-secondary hover:text-[#10b981] hover:bg-[#10b981]/10'
                                }`}
                            onClick={() => onResolve?.(note.id)}
                        >
                            {note.resolved ? (
                                <><IoCheckmarkCircle /> Reopen</>
                            ) : (
                                <><IoCheckmarkCircleOutline /> Resolve</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NotesPanel({ notes, currentTime, onAddNote, highlightedTimestamp, onResolveNote }) {
    const [newNote, setNewNote] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const noteRefs = useRef({});
    const listRef = useRef(null);
    const inputRef = useRef(null);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    /* Auto-scroll to highlighted note */
    useEffect(() => {
        if (highlightedTimestamp == null) return;
        const matchingNote = notes.find((n) => Math.abs(n.timestamp - highlightedTimestamp) <= 2);
        if (matchingNote && noteRefs.current[matchingNote.id]) {
            noteRefs.current[matchingNote.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [highlightedTimestamp, notes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;
        onAddNote({
            id: Date.now(),
            author: 'You',
            text: newNote.trim(),
            timestamp: currentTime,
            date: 'Just now',
            resolved: false,
        });
        setNewNote('');
    };

    const sortedNotes = notes.slice().sort((a, b) => a.timestamp - b.timestamp);

    const filteredNotes = sortedNotes.filter((note) => {
        if (activeFilter === 'unresolved') return !note.resolved;
        if (activeFilter === 'resolved') return note.resolved;
        return true;
    });

    const unresolvedCount = notes.filter((n) => !n.resolved).length;
    const resolvedCount = notes.filter((n) => n.resolved).length;

    return (
        <div className="flex flex-col h-full bg-bg-secondary rounded-xl shadow-sm border border-border-color">
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-3 border-b border-border-color">
                <h3 className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
                    <IoChatbubbleOutline className="text-accent" />
                    Notes
                    <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-accent-light text-accent text-[11px] font-bold">
                        {notes.length}
                    </span>
                </h3>
                <div className="flex items-center gap-2">
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent-light transition-colors text-sm" title="Drawing annotations (coming soon)">
                        <IoBrushOutline />
                    </button>
                    <span className="text-[10px] text-text-secondary/60 font-semibold tracking-wide px-1.5 py-0.5 rounded bg-bg-hover">
                        Frame.io
                    </span>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-border-color">
                {FILTER_TABS.map((tab) => {
                    const count = tab.key === 'all' ? notes.length : tab.key === 'unresolved' ? unresolvedCount : resolvedCount;
                    return (
                        <button
                            key={tab.key}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-150
                                ${activeFilter === tab.key
                                    ? 'bg-accent text-white shadow-sm'
                                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                                }`}
                            onClick={() => setActiveFilter(tab.key)}
                        >
                            {tab.label}
                            <span className={`text-[9px] px-1 py-0.5 rounded-full font-bold min-w-[16px] text-center leading-none
                                ${activeFilter === tab.key ? 'bg-white/20' : 'bg-bg-hover'}`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Note input */}
            <form className="flex flex-col gap-2 px-4 py-3 border-b border-border-color" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-light text-accent text-[11px] font-semibold font-mono">
                        <IoTimeOutline className="text-[10px]" /> {formatTime(currentTime)}
                    </span>
                    <span className="text-[10px] text-text-secondary/50">Click timeline to set timestamp</span>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full px-3 py-2 pr-8 rounded-lg border border-border-color bg-bg-primary text-text-primary text-[13px] transition-colors focus:outline-none focus:border-accent placeholder:text-text-secondary/50"
                            placeholder="Add a note at this timestamp…"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                        />
                        <IoAtOutline className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary/40 text-sm" />
                    </div>
                    <button
                        type="submit"
                        className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center text-base transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:scale-105 flex-shrink-0"
                        disabled={!newNote.trim()}
                    >
                        <IoSendOutline />
                    </button>
                </div>
            </form>

            {/* Notes list */}
            <div ref={listRef} className="flex-1 overflow-y-auto flex flex-col gap-0.5 px-2 py-2 scrollbar-thin scrollbar-thumb-border-color">
                {filteredNotes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 px-5 text-text-secondary text-[24px] gap-2">
                        {activeFilter !== 'all' ? (
                            <>
                                <IoFunnelOutline />
                                <p className="text-[12px] text-center">No {activeFilter} notes found.</p>
                            </>
                        ) : (
                            <>
                                <IoAddOutline />
                                <p className="text-[12px] text-center">No notes yet. Scrub the timeline and add your first annotation.</p>
                            </>
                        )}
                    </div>
                ) : (
                    filteredNotes.map((note) => (
                        <NoteItem
                            key={note.id}
                            note={note}
                            isHighlighted={highlightedTimestamp != null && Math.abs(note.timestamp - highlightedTimestamp) <= 2}
                            noteRef={(el) => { noteRefs.current[note.id] = el; }}
                            onResolve={onResolveNote}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default NotesPanel;
