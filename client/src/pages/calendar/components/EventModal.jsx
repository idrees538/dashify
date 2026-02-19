import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { EVENT_TYPES } from '../constants';

const INITIAL = { title: '', type: 'shoot', time: '' };

export default function EventModal({ cell, onSave, onClose }) {
    const [form, setForm] = useState(INITIAL);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        onSave(cell.key, {
            title: form.title.trim(),
            type: form.type,
            time: form.time || null,
        });
        setForm(INITIAL);
    };

    const dateLabel = cell.date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-2xl
                   bg-[var(--bg-secondary)] border border-[var(--border-color)]
                   shadow-2xl p-6 animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg
                     flex items-center justify-center
                     text-[var(--icon-color)] hover:bg-[var(--bg-hover)]
                     transition-colors"
                >
                    <IoCloseOutline size={20} />
                </button>

                {/* Header */}
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                    Add Event
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-5">{dateLabel}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                            Event Title
                        </label>
                        <input
                            autoFocus
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="e.g. Brand shoot, IG post…"
                            className="w-full px-3.5 py-2.5 rounded-lg text-sm
                         bg-[var(--bg-primary)] border border-[var(--border-color)]
                         text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40
                         transition-shadow"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                            Type
                        </label>
                        <div className="flex gap-3">
                            {Object.entries(EVENT_TYPES).map(([key, t]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setForm({ ...form, type: key })}
                                    className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                    rounded-lg text-sm font-semibold border transition-all
                    ${form.type === key
                                            ? `${t.bg} ${t.text} ${t.border} ring-2 ${t.ring}`
                                            : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                                        }
                  `}
                                >
                                    <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time (optional) */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                            Time <span className="text-[var(--text-secondary)]/60">(optional)</span>
                        </label>
                        <input
                            type="time"
                            value={form.time}
                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg text-sm
                         bg-[var(--bg-primary)] border border-[var(--border-color)]
                         text-[var(--text-primary)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40
                         transition-shadow"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold
                         border border-[var(--border-color)] text-[var(--text-secondary)]
                         hover:bg-[var(--bg-hover)] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold
                         bg-[var(--accent)] text-white
                         hover:opacity-90 transition-opacity
                         disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled={!form.title.trim()}
                        >
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
