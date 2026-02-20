import { useState } from 'react';
import { IoSendOutline, IoTimeOutline, IoPersonCircleOutline, IoAddOutline } from 'react-icons/io5';

function NoteItem({ note }) {
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return (
        <div className="flex gap-2.5 p-3 rounded-xl transition-colors hover:bg-bg-hover">
            <div className="text-[28px] text-text-secondary flex-shrink-0 leading-none">
                <IoPersonCircleOutline />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-text-primary">{note.author}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-light text-accent text-[10px] font-semibold font-mono">
                        <IoTimeOutline /> {formatTime(note.timestamp)}
                    </span>
                </div>
                <p className="text-[13px] text-text-primary leading-relaxed mb-1">{note.text}</p>
                <span className="text-[11px] text-text-secondary">{note.date}</span>
            </div>
        </div>
    );
}

function NotesPanel({ notes, currentTime, onAddNote }) {
    const [newNote, setNewNote] = useState('');

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;
        onAddNote({
            id: Date.now(),
            author: 'You',
            text: newNote.trim(),
            timestamp: currentTime,
            date: 'Just now',
        });
        setNewNote('');
    };

    return (
        <div className="flex flex-col max-h-[520px] bg-bg-secondary rounded-xl p-[18px] shadow-sm border border-border-color">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border-color mb-4">
                <h3 className="text-[17px] font-semibold text-text-primary flex items-center gap-2">
                    Notes
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-accent-light text-accent text-[12px] font-bold">{notes.length}</span>
                </h3>
            </div>

            {/* Note input */}
            <form className="flex flex-col gap-2 mb-5" onSubmit={handleSubmit}>
                <div className="inline-flex items-center gap-1 self-start px-2.5 py-1 rounded-md bg-accent-light text-accent text-[12px] font-semibold font-mono">
                    <IoTimeOutline /> {formatTime(currentTime)}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-border-color bg-bg-primary text-text-primary text-[13px] transition-colors focus:outline-none focus:border-accent placeholder:text-text-secondary/60"
                        placeholder="Add a note at this timestamp…"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button type="submit" className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center text-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:scale-[1.05] flex-shrink-0" disabled={!newNote.trim()}>
                        <IoSendOutline />
                    </button>
                </div>
            </form>

            {/* Notes list */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 scrollbar-thin scrollbar-thumb-border-color">
                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 px-5 text-text-secondary text-[28px] gap-2">
                        <IoAddOutline />
                        <p className="text-[13px]">No notes yet. Add your first annotation above.</p>
                    </div>
                ) : (
                    notes
                        .slice()
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .map((note) => <NoteItem key={note.id} note={note} />)
                )}
            </div>
        </div>
    );
}

export default NotesPanel;
