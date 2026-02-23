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
 * Components just consume its return value via props.
 *
 * When Frame.io is not configured (no token), falls back to demo data
 * so the UI always works.
 *
 * Usage:
 *   const {
 *       isConfigured, isLoading, error,
 *       drafts, selectedDraftId, selectDraft,
 *       notes, noteCounts,
 *       currentTime, setCurrentTime,
 *       highlightedTimestamp, handleMarkerClick,
 *       addNote, resolveNote,
 *   } = useFrameio();
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
    /*  Init: check if Frame.io is configured, then load data           */
    /* ================================================================ */
    useEffect(() => {
        let cancelled = false;

        async function init() {
            setIsLoading(true);
            setError(null);

            try {
                // 1. Verify connection
                await frameioService.verifyConnection();
                if (cancelled) return;
                setIsConfigured(true);

                // 2. Load assets
                // Use root asset ID from a meta tag, env, or default
                const rootId = document.querySelector('meta[name="frameio-root-asset"]')?.content
                    || import.meta.env.VITE_FRAMEIO_ROOT_ASSET_ID
                    || '';

                if (!rootId) {
                    // Token valid but no project configured — fall back to demo
                    console.warn('[Frame.io] No root asset ID configured, using demo data.');
                    loadDemoData();
                    return;
                }

                const assetsRes = await frameioService.getAssets(rootId);
                if (cancelled) return;

                const rawAssets = assetsRes.data?.assets || [];
                // Only include video assets
                const videoAssets = rawAssets.filter((a) => a.type === 'file' && a.filetype === 'video');
                const mappedDrafts = videoAssets.map((a, i) => mapAssetToDraft(a, i));

                setDrafts(mappedDrafts);
                if (mappedDrafts.length > 0) {
                    setSelectedDraftId(mappedDrafts[0].id);
                }

                // 3. Load comments for each asset
                const notesMap = {};
                for (const draft of mappedDrafts) {
                    try {
                        const commentsRes = await frameioService.getComments(draft.id);
                        const rawComments = commentsRes.data?.comments || [];
                        notesMap[draft.id] = rawComments.map(mapCommentToNote);
                    } catch {
                        notesMap[draft.id] = [];
                    }
                }
                if (cancelled) return;
                setAllNotes(notesMap);
            } catch (err) {
                if (cancelled) return;
                // If 400 (not configured) or network error, fall back gracefully
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
     * Add a note. If Frame.io is configured, post to API first.
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

        // If configured, also post to Frame.io
        if (isConfigured) {
            try {
                const res = await frameioService.createComment(selectedDraftId, {
                    text: noteData.text,
                    timestamp: noteData.timestamp,
                });
                const created = res.data?.comment;
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
     * Toggle resolve state on a note.
     */
    const resolveNote = useCallback((noteId) => {
        setAllNotes((prev) => ({
            ...prev,
            [selectedDraftId]: (prev[selectedDraftId] || []).map((n) =>
                n.id === noteId ? { ...n, resolved: !n.resolved } : n
            ),
        }));
        // TODO: When Frame.io supports completed-status updates, call the API here
    }, [selectedDraftId]);

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

        // Player
        currentTime,
        setCurrentTime,
        highlightedTimestamp,
        handleMarkerClick,
    };
}
