import { useState, useRef, useEffect } from 'react';
import {
    IoPlayOutline,
    IoPauseOutline,
    IoExpandOutline,
    IoVolumeHighOutline,
    IoVideocamOutline,
    IoEllipsisHorizontalOutline,
} from 'react-icons/io5';

function VideoPlayer({ draft, currentTime, onTimeChange, notes = [], onMarkerClick }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const videoRef = useRef(null);
    const progressPercent = draft ? (currentTime / draft.durationSec) * 100 : 0;

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    // Sync external currentTime changes to video element
    useEffect(() => {
        if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
            videoRef.current.currentTime = currentTime;
        }
    }, [currentTime]);

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            onTimeChange(videoRef.current.currentTime);
        }
    };

    /* Group notes that share the same timestamp (±2s) into clusters */
    const markerClusters = notes.reduce((acc, note) => {
        const existing = acc.find((c) => Math.abs(c.timestamp - note.timestamp) <= 2);
        if (existing) {
            existing.count += 1;
            existing.ids.push(note.id);
        } else {
            acc.push({ timestamp: note.timestamp, count: 1, ids: [note.id] });
        }
        return acc;
    }, []);

    if (!draft) {
        return (
            <div className="overflow-hidden p-0 bg-bg-secondary rounded-xl shadow-sm border border-border-color">
                <div className="w-full aspect-video flex flex-col items-center justify-center text-text-secondary text-3xl gap-3">
                    <IoPlayOutline />
                    <p className="text-sm">Select a draft to begin reviewing</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden p-0 bg-bg-secondary rounded-xl shadow-sm border border-border-color flex flex-col">
            {/* Frame.io-style header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-color bg-bg-secondary">
                <div className="flex items-center gap-2.5">
                    <IoVideocamOutline className="text-accent text-base" />
                    <span className="text-[13px] font-semibold text-text-primary truncate max-w-[260px]">{draft.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold">v{draft.version}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-text-secondary font-mono">{draft.duration}</span>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-text-secondary hover:bg-bg-hover transition-colors">
                        <IoEllipsisHorizontalOutline />
                    </button>
                </div>
            </div>

            {/* Video area */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group/video">
                <video
                    ref={videoRef}
                    src={draft.streamUrl}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={handlePlayPause}
                />

                {!isPlaying && (
                    <button
                        onClick={handlePlayPause}
                        className="absolute inset-0 m-auto w-[68px] h-[68px] rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-[28px] text-white transition-all duration-200 border-2 border-white/20 hover:scale-[1.08] hover:bg-white/25 z-10"
                    >
                        <IoPlayOutline className="ml-1" />
                    </button>
                )}
            </div>

            {/* Controls bar */}
            <div className="flex items-center gap-3 p-3 px-4 bg-bg-secondary border-t border-border-color">
                <button
                    onClick={handlePlayPause}
                    className="w-7 h-7 flex items-center justify-center text-accent bg-accent/10 rounded-lg text-base transition-all hover:bg-accent/20"
                >
                    {isPlaying ? <IoPauseOutline /> : <IoPlayOutline className="ml-0.5" />}
                </button>
                <span className="text-[11px] font-semibold text-text-secondary font-mono whitespace-nowrap min-w-[85px]">
                    {formatTime(currentTime)} / {draft.duration}
                </span>

                {/* Timeline with annotation markers */}
                <div
                    className="flex-1 cursor-pointer py-1.5 relative"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = (e.clientX - rect.left) / rect.width;
                        const newTime = Math.round(pct * draft.durationSec);
                        videoRef.current.currentTime = newTime;
                        onTimeChange(newTime);
                    }}
                >
                    <div className="relative w-full h-[4px] bg-bg-hover rounded-full">
                        {/* Progress fill */}
                        <div
                            className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-150"
                            style={{ width: `${progressPercent}%` }}
                        />
                        {/* Playhead */}
                        <div
                            className="absolute top-1/2 w-3 h-3 bg-white border-2 border-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm transition-all duration-150 z-[3]"
                            style={{ left: `${progressPercent}%` }}
                        />
                    </div>

                    {/* Annotation markers */}
                    {markerClusters.map((cluster) => {
                        const pct = (cluster.timestamp / draft.durationSec) * 100;
                        const isHovered = hoveredMarker === cluster.timestamp;
                        return (
                            <div
                                key={cluster.timestamp}
                                className="absolute top-1/2 -translate-y-1/2 z-[5] group"
                                style={{ left: `${pct}%` }}
                                onMouseEnter={() => setHoveredMarker(cluster.timestamp)}
                                onMouseLeave={() => setHoveredMarker(null)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    videoRef.current.currentTime = cluster.timestamp;
                                    onTimeChange(cluster.timestamp);
                                    onMarkerClick?.(cluster.timestamp);
                                }}
                            >
                                {/* Marker dot */}
                                <div className={`w-2.5 h-2.5 rounded-full -translate-x-1/2 cursor-pointer transition-all duration-200 border-2 border-white shadow-md
                                    ${isHovered ? 'bg-[#FF6037] scale-150' : 'bg-[#FF6037]/80 scale-100'}
                                `} />

                                {/* Tooltip on hover */}
                                {isHovered && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#1a1a2e] text-white text-[10px] font-semibold rounded-md whitespace-nowrap shadow-lg border border-white/10 pointer-events-none animate-fade-in">
                                        {formatTime(cluster.timestamp)}
                                        {cluster.count > 1 && (
                                            <span className="ml-1 px-1.5 py-0.5 bg-accent rounded-full text-[9px]">{cluster.count}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center gap-1">
                    <button className="w-7 h-7 flex items-center justify-center text-text-secondary rounded-lg text-base transition-colors hover:bg-bg-hover hover:text-text-primary">
                        <IoVolumeHighOutline />
                    </button>
                    <button
                        onClick={() => videoRef.current.requestFullscreen()}
                        className="w-7 h-7 flex items-center justify-center text-text-secondary rounded-lg text-base transition-colors hover:bg-bg-hover hover:text-text-primary"
                    >
                        <IoExpandOutline />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
