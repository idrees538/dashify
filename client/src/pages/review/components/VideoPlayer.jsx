import { IoPlayOutline, IoExpandOutline, IoVolumeHighOutline } from 'react-icons/io5';

function VideoPlayer({ draft, currentTime, onTimeChange }) {
    const progressPercent = draft ? (currentTime / draft.durationSec) * 100 : 0;

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    if (!draft) {
        return (
            <div className="review-player card">
                <div className="review-player__empty">
                    <IoPlayOutline />
                    <p>Select a draft to begin reviewing</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden p-0 bg-bg-secondary rounded-xl shadow-sm border border-border-color">
            {/* Simulated video area */}
            <div className={`relative w-full aspect-video flex items-center justify-center overflow-hidden
                ${draft.color === 'purple' ? 'bg-gradient-to-br from-[#FF6037]/25 via-accent/20 to-black/60' :
                    draft.color === 'blue' ? 'bg-gradient-to-br from-blue-500/30 via-blue-600/15 to-black/60' :
                        draft.color === 'green' ? 'bg-gradient-to-br from-[#10B981]/25 via-[#34D399]/15 to-black/60' :
                            'bg-gradient-to-br from-[#F59E0B]/30 via-[#FBBF24]/15 to-black/60'}`}>
                <button className="w-[72px] h-[72px] rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-[32px] text-white transition-all duration-200 border-2 border-white/20 hover:scale-[1.08] hover:bg-white/25">
                    <IoPlayOutline />
                </button>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="bg-black/60 text-white px-3 py-1 rounded-md text-[12px] font-semibold">{draft.title}</span>
                    <span className="bg-accent text-white px-2.5 py-1 rounded-md text-[11px] font-bold">v{draft.version}</span>
                </div>
            </div>

            {/* Controls bar */}
            <div className="flex items-center gap-3 p-[14px] px-[18px] bg-bg-secondary border-t border-border-color">
                <button className="w-8 h-8 flex items-center justify-center text-text-secondary rounded-md text-lg transition-colors hover:text-text-primary">
                    <IoPlayOutline />
                </button>
                <span className="text-[12px] font-semibold text-text-secondary font-mono whitespace-nowrap">
                    {formatTime(currentTime)} / {draft.duration}
                </span>
                <div
                    className="flex-1 cursor-pointer py-1.5"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = (e.clientX - rect.left) / rect.width;
                        onTimeChange(Math.round(pct * draft.durationSec));
                    }}
                >
                    <div className="relative w-full h-[5px] bg-bg-hover rounded-full">
                        <div
                            className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-150"
                            style={{ width: `${progressPercent}%` }}
                        />
                        <div
                            className="absolute top-1/2 w-3.5 h-3.5 bg-accent border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm transition-all duration-150"
                            style={{ left: `${progressPercent}%` }}
                        />
                    </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center text-text-secondary rounded-md text-lg transition-colors hover:text-text-primary">
                    <IoVolumeHighOutline />
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-text-secondary rounded-md text-lg transition-colors hover:text-text-primary">
                    <IoExpandOutline />
                </button>
            </div>
        </div>
    );
}

export default VideoPlayer;
