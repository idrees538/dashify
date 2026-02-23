import useFrameio from '../../hooks/useFrameio';
import DraftSelector from './components/DraftSelector';
import VideoPlayer from './components/VideoPlayer';
import NotesPanel from './components/NotesPanel';
import { IoInformationCircleOutline } from 'react-icons/io5';

function Review() {
    const {
        isConfigured,
        isLoading,
        drafts,
        selectedDraftId,
        selectedDraft,
        selectDraft,
        noteCounts,
        notes,
        addNote,
        resolveNote,
        currentTime,
        setCurrentTime,
        highlightedTimestamp,
        handleMarkerClick,
    } = useFrameio();

    if (isLoading && isConfigured !== false) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] animate-pulse">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-text-secondary font-medium">Connecting to Frame.io...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-4 animate-fade-in relative">
            {/* Integration Banner (only if not configured) */}
            {isConfigured === false && (
                <div className="mb-6 p-4 bg-accent-light border border-accent/20 rounded-lg flex items-start gap-3 shadow-sm animate-slide-up">
                    <IoInformationCircleOutline className="text-accent text-lg flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-[13px] font-bold text-accent mb-0.5">Demo Mode Active</h4>
                        <p className="text-[11px] text-accent/80 font-medium">
                            Frame.io is not configured. To enable real-time integration, add your <code>FRAMEIO_TOKEN</code> to the server <code>.env</code> and <code>VITE_FRAMEIO_ROOT_ASSET_ID</code> to the client <code>.env</code>.
                        </p>
                    </div>
                </div>
            )}

            <div className="mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-base font-semibold text-text-primary">Review</h1>
                    <p className="text-[12px] text-text-secondary">
                        {isConfigured ? 'Real-time Frame.io integration active.' : 'Select a draft and add timestamped notes for your team.'}
                    </p>
                </div>
                {isConfigured && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border border-border-color rounded-lg text-[11px] font-semibold text-text-secondary shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Frame.io Connected
                    </div>
                )}
            </div>

            <DraftSelector
                drafts={drafts}
                selectedId={selectedDraftId}
                onSelect={selectDraft}
                noteCounts={noteCounts}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">
                <VideoPlayer
                    draft={selectedDraft}
                    currentTime={currentTime}
                    onTimeChange={setCurrentTime}
                    notes={notes}
                    onMarkerClick={handleMarkerClick}
                />
                <div className="lg:h-[calc(100%-20px)] lg:max-h-[540px] lg:min-h-[450px]">
                    <NotesPanel
                        notes={notes}
                        currentTime={currentTime}
                        onAddNote={addNote}
                        highlightedTimestamp={highlightedTimestamp}
                        onResolveNote={resolveNote}
                    />
                </div>
            </div>
        </div>
    );
}

export default Review;
