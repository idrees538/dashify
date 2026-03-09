import { useState, useEffect, useCallback, useRef } from 'react';
import frameioService from '../services/frameioService';
import {
    mapAssetToDraft,
    mapCommentToNote,
    DEMO_DRAFTS,
    DEMO_NOTES,
} from '../services/frameioConfig';

/**
 * useFrameio Hook
 * ===============
 * Encapsulates all Frame.io state, fetching, and mutations.
 *
 * The admin connects Frame.io once via OAuth. Regular users never
 * see OAuth prompts — they simply see videos and can comment.
 * If Frame.io is not yet configured, falls back to demo data.
 */
export default function useFrameio() {
    /* ---- Connection state ---- */
    const [isConfigured, setIsConfigured] = useState(null); // null = checking
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ---- Data state ---- */
    const [drafts, setDrafts] = useState([]);
    const [selectedDraftId, setSelectedDraftId] = useState(null);
    const [allNotes, setAllNotes] = useState({});
    const [currentTime, setCurrentTime] = useState(0);
    const [highlightedTimestamp, setHighlightedTimestamp] = useState(null);

    const highlightTimeoutRef = useRef(null);

    /* ---- Derived ---- */
    const selectedDraft = drafts.find((d) => d.id === selectedDraftId) || null;
    const notes = allNotes[selectedDraftId] || [];
    const noteCounts = drafts.reduce((acc, d) => {
        acc[d.id] = (allNotes[d.id] || []).length;
        return acc;
    }, {});

    /* ================================================================ */
    /*  Init: try loading assets directly (no /me check needed)         */
    /* ================================================================ */
    useEffect(() => {
        let cancelled = false;

        async function init() {
            setIsLoading(true);
            setError(null);

            try {
                // Use root asset ID from env
                const rootId = document.querySelector('meta[name="frameio-root-asset"]')?.content
                    || import.meta.env.VITE_FRAMEIO_ROOT_ASSET_ID
                    || '';

                if (!rootId) {
                    // No project configured — fall back to demo
                    console.warn('[Frame.io] No root asset ID configured, using demo data.');
                    setIsConfigured(false);
                    loadDemoData();
                    return;
                }

                // Try loading assets directly — the backend uses admin tokens
                const assetsRes = await frameioService.getAssets(rootId);
                if (cancelled) return;

                setIsConfigured(true);

                // Handle different response formats from V2/V4
                const resData = assetsRes.data || assetsRes;
                let rawAssets = [];
                if (Array.isArray(resData)) {
                    rawAssets = resData;
                } else if (Array.isArray(resData.assets)) {
                    rawAssets = resData.assets;
                } else if (Array.isArray(resData.data)) {
                    rawAssets = resData.data;
                }

                console.log('[Frame.io] Raw assets loaded:', rawAssets.length, rawAssets.map(a => ({
                    name: a.name, type: a.type || a._type, filetype: a.filetype
                })));

                // Include video assets (V2 uses _type, V4 uses type)
                const videoAssets = rawAssets.filter((a) => {
                    const assetType = a.type || a._type || '';
                    const fileType = a.filetype || a.file_type || a.media_type || '';
                    return (assetType === 'file' || assetType === 'version_stack') &&
                        (fileType.startsWith('video') || a.is_hls_required || a.original || a.stream_url);
                });
                const mappedDrafts = videoAssets.map((a, i) => mapAssetToDraft(a, i));

                setDrafts(mappedDrafts);
                if (mappedDrafts.length > 0) {
                    setSelectedDraftId(mappedDrafts[0].id);
                }

                // Load comments for each asset
                const notesMap = {};
                for (const draft of mappedDrafts) {
                    try {
                        const commentsRes = await frameioService.getComments(draft.id);
                        // Handle Dashify API format: { success: true, data: { comments: [...] } }
                        const resData = commentsRes.data || commentsRes;
                        const rawComments = Array.isArray(resData) ? resData : (resData.comments || resData.data || []);

                        notesMap[draft.id] = rawComments.map(mapCommentToNote);
                    } catch (err) {
                        console.warn(`[Frame.io] Failed to load comments for ${draft.id}:`, err.message);
                        notesMap[draft.id] = [];
                    }
                }
                if (cancelled) return;
                setAllNotes(notesMap);
            } catch (err) {
                if (cancelled) return;
                console.warn('[Frame.io] Not configured or error, using demo data:', err.message);
                setIsConfigured(false);
                loadDemoData();
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        function loadDemoData() {
            setDrafts(DEMO_DRAFTS);
            setSelectedDraftId(DEMO_DRAFTS[0].id);
            setAllNotes(DEMO_NOTES);
            setIsLoading(false);
        }

        init();

        return () => { cancelled = true; };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* ================================================================ */
    /*  Actions                                                         */
    /* ================================================================ */

    const selectDraft = useCallback((id) => {
        setSelectedDraftId(id);
        setCurrentTime(0);
        setHighlightedTimestamp(null);
    }, []);

    const handleMarkerClick = useCallback((timestamp) => {
        setHighlightedTimestamp(timestamp);
        setCurrentTime(timestamp);
        // Clear highlight after 4s
        if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
        highlightTimeoutRef.current = setTimeout(() => setHighlightedTimestamp(null), 4000);
    }, []);

    /**
     * Add a note. Posts to Frame.io API (attribution is handled server-side).
     */
    const addNote = useCallback(async (noteData) => {
        // Optimistic UI: add immediately
        const tempNote = {
            id: Date.now(),
            author: 'You',
            text: noteData.text,
            timestamp: noteData.timestamp,
            date: 'Just now',
            resolved: false,
        };

        setAllNotes((prev) => ({
            ...prev,
            [selectedDraftId]: [...(prev[selectedDraftId] || []), tempNote],
        }));

        // Post to Frame.io via backend (server adds [userName] prefix)
        if (isConfigured) {
            try {
                const res = await frameioService.createComment(selectedDraftId, {
                    text: noteData.text,
                    timestamp: noteData.timestamp,
                });
                // The backend returns { success: true, data: commentObject }
                const created = res.data;
                if (created) {
                    // Replace temp note with real one
                    const realNote = mapCommentToNote(created);
                    setAllNotes((prev) => ({
                        ...prev,
                        [selectedDraftId]: (prev[selectedDraftId] || []).map((n) =>
                            n.id === tempNote.id ? realNote : n
                        ),
                    }));
                }
            } catch (err) {
                console.error('[Frame.io] Failed to post comment:', err.message);
                // Keep the optimistic note — user can retry
            }
        }
    }, [selectedDraftId, isConfigured]);

    /**
     * Refresh notes for the currently selected draft.
     */
    const refreshNotes = useCallback(async () => {
        if (!selectedDraftId || !isConfigured) return;

        try {
            const commentsRes = await frameioService.getComments(selectedDraftId);
            const resData = commentsRes.data || commentsRes;
            const rawComments = Array.isArray(resData) ? resData : (resData.comments || resData.data || []);
            const mappedNotes = rawComments.map(mapCommentToNote);

            setAllNotes((prev) => ({
                ...prev,
                [selectedDraftId]: mappedNotes,
            }));
        } catch (err) {
            console.error('[Frame.io] Failed to refresh notes:', err.message);
        }
    }, [selectedDraftId, isConfigured]);

    /**
     * Toggle resolve state on a note.
     * (Admin-only action on the backend, but we keep the optimistic UI for consistency).
     */
    const resolveNote = useCallback(async (noteId) => {
        const note = notes.find((n) => n.id === noteId);
        if (!note) return;

        const newResolved = !note.resolved;

        // Optimistic UI
        setAllNotes((prev) => ({
            ...prev,
            [selectedDraftId]: (prev[selectedDraftId] || []).map((n) =>
                n.id === noteId ? { ...n, resolved: newResolved } : n
            ),
        }));

        if (isConfigured) {
            try {
                await frameioService.toggleCommentResolution(noteId, newResolved);
            } catch (err) {
                console.error('[Frame.io] Failed to toggle resolution:', err.message);
                // Rollback on error
                setAllNotes((prev) => ({
                    ...prev,
                    [selectedDraftId]: (prev[selectedDraftId] || []).map((n) =>
                        n.id === noteId ? { ...n, resolved: !newResolved } : n
                    ),
                }));
            }
        }
    }, [selectedDraftId, isConfigured, notes]);

    /**
     * Update an existing note.
     */
    const updateNote = useCallback(async (noteId, newText) => {
        const note = notes.find((n) => n.id === noteId);
        if (!note) return;

        const oldText = note.text;

        // Optimistic UI update
        setAllNotes((prev) => ({
            ...prev,
            [selectedDraftId]: (prev[selectedDraftId] || []).map((n) =>
                n.id === noteId ? { ...n, text: newText } : n
            ),
        }));

        if (isConfigured) {
            try {
                await frameioService.updateComment(noteId, { text: newText });
            } catch (err) {
                console.error('[Frame.io] Failed to update comment:', err.message);
                // Rollback on error
                setAllNotes((prev) => ({
                    ...prev,
                    [selectedDraftId]: (prev[selectedDraftId] || []).map((n) =>
                        n.id === noteId ? { ...n, text: oldText } : n
                    ),
                }));
            }
        }
    }, [selectedDraftId, isConfigured, notes]);

    /**
     * Delete a note.
     */
    const deleteNote = useCallback(async (noteId) => {
        const note = notes.find((n) => n.id === noteId);
        if (!note) return;

        // Optimistic UI removal
        const deletedNoteIndex = notes.findIndex((n) => n.id === noteId);
        const deletedNote = notes[deletedNoteIndex];

        setAllNotes((prev) => ({
            ...prev,
            [selectedDraftId]: (prev[selectedDraftId] || []).filter((n) => n.id !== noteId),
        }));

        if (isConfigured) {
            try {
                await frameioService.deleteComment(noteId);
            } catch (err) {
                console.error('[Frame.io] Failed to delete comment:', err.message);
                // Rollback on error: re-insert the note at its original position
                setAllNotes((prev) => {
                    const currentNotes = [...(prev[selectedDraftId] || [])];
                    if (deletedNoteIndex !== -1) {
                        currentNotes.splice(deletedNoteIndex, 0, deletedNote);
                    }
                    return {
                        ...prev,
                        [selectedDraftId]: currentNotes,
                    };
                });
            }
        }
    }, [selectedDraftId, isConfigured, notes]);

    /* ================================================================ */
    /*  Cleanup                                                         */
    /* ================================================================ */
    useEffect(() => {
        return () => {
            if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
        };
    }, []);

    return {
        // Connection
        isConfigured,
        isLoading,
        error,

        // Drafts
        drafts,
        selectedDraftId,
        selectedDraft,
        selectDraft,
        noteCounts,

        // Notes
        notes,
        addNote,
        resolveNote,
        updateNote,
        deleteNote,
        refreshNotes,

        // Player
        currentTime,
        setCurrentTime,
        highlightedTimestamp,
        handleMarkerClick,
    };
}
