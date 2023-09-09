import { type Cursor, OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
import { type MutableRefObject, useLayoutEffect, useRef, useState } from 'react'
import {
    type SheetMusicDisplay, type SheetMusicDisplayActions, type SheetMusicDisplayState
} from '../domain/sheet-music-display'
import { useIsMounted } from './use-is-mounted'

interface Result<T> {
    readonly containerRef: MutableRefObject<T | null>
    readonly sheetMusicDisplay?: SheetMusicDisplay
}

export const useSheetMusicDisplay = <T extends HTMLElement> (): Result<T> => {
    const containerRef = useRef<T>(null)
    const { isMounted, unmount } = useIsMounted()

    const [state, setState] = useState<SheetMusicDisplayState>()
    const [actions, setActions] = useState<SheetMusicDisplayActions>()

    useLayoutEffect(() => {
        if (containerRef.current === undefined || containerRef.current === null) {
            setState(undefined)
            return
        }

        const osmd = new OpenSheetMusicDisplay(containerRef.current)
        osmd.setOptions(osmdOptions)

        function loadMusicXml (url: string): void {
            setState(
                prev => prev === undefined
                    ? undefined
                    : ({ ...prev, isMusicXmlLoading: true })
            )

            osmd
                .load(url)
                .then(() => {
                    if (!isMounted()) return
                    osmd.render()
                    getCursor().show()
                    setState(prev => prev === undefined
                        ? undefined
                        : {
                            ...prev,
                            isMusicXmlLoaded: true,
                            isMusicXmlLoading: false
                        })
                    updateNotesUnderCursor()
                })
                .catch(error => { throw error })
        }

        const goBackward = (): void => {
            getCursor().previous()
            updateNotesUnderCursor()
        }

        const goForward = (): void => {
            getCursor().next()
            updateNotesUnderCursor()
        }

        setState({
            isMusicXmlLoaded: false,
            isMusicXmlLoading: false,
            notesUnderCursor: new Set<number>()
        })

        setActions({ loadMusicXml, goBackward, goForward })

        return unmount

        /** Returns the main cursor pointing to the current note. */
        function getCursor (): Cursor { return osmd.cursors[0] }

        function updateNotesUnderCursor (): void {
            const notesUnderCursor = getNotesUnderCursor()
            setState(prev => prev === undefined ? undefined : { ...prev, notesUnderCursor })
        }

        function getNotesUnderCursor (): Set<number> {
            const result = new Set<number>()

            getCursor().NotesUnderCursor().forEach(note => {
                if (note.isRest()) return
                if (note.NoteTie !== undefined) {
                    const isFirstNoteInTie = note === note.NoteTie.Notes[0]
                    if (!isFirstNoteInTie) return
                }

                const pitch = note.Pitch
                if (pitch === undefined) return
                result.add(pitch.getHalfTone())
            })

            return result
        }
    }, [isMounted, unmount])

    return {
        containerRef,
        sheetMusicDisplay: state !== undefined && actions !== undefined
            ? { state, actions }
            : undefined
    }
}

const osmdOptions = {
    backend: 'svg',
    drawingParameters: 'compact',
    drawCredits: false,
    drawTitle: false,
    drawSubtitle: false,
    drawComposer: false,
    drawLyricist: false,
    drawPartNames: false,
    renderSingleHorizontalStaffline: false,
    followCursor: true,
    drawMeasureNumbers: true,
    measureNumberInterval: 1
}
