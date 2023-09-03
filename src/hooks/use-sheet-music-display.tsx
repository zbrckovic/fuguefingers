import { type Cursor, OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
import { type MutableRefObject, useLayoutEffect, useRef, useState } from 'react'
import { useIsMounted } from './misc-hooks'

export interface SheetMusicDisplay {
    readonly isMusicXmlLoaded: boolean
    readonly isMusicXmlLoading: boolean
    readonly notesUnderCursor: Set<number>

    readonly loadMusicXml: (url: string) => void

    /** Moves the main cursor forward. */
    readonly goForward: () => void

    /** Moves the main cursor backward. */
    readonly goBackward: () => void
}

type Result<T> = [MutableRefObject<T | null>, SheetMusicDisplay | undefined]

export const useSheetMusicDisplay = <T extends HTMLElement> (): Result<T> => {
    const containerRef = useRef<T>(null)
    const { isMounted, unmount } = useIsMounted()
    const [sheetMusicDisplay, setSheetMusicDisplayMusicDisplay] = useState<SheetMusicDisplay | undefined>()

    useLayoutEffect(() => {
        if (containerRef.current === undefined || containerRef.current === null) {
            setSheetMusicDisplayMusicDisplay(undefined)
            return
        }

        const osmd = new OpenSheetMusicDisplay(containerRef.current)
        osmd.setOptions(osmdOptions)

        function loadMusicXml (url: string): void {
            setSheetMusicDisplayMusicDisplay(prev => prev === undefined
                ? undefined
                : ({
                    ...prev,
                    isMusicXmlLoading: true
                }))

            osmd
                .load(url)
                .then(() => {
                    if (!isMounted) return
                    osmd.render()
                    getCursor().show()
                    setSheetMusicDisplayMusicDisplay(prev => prev === undefined
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

        setSheetMusicDisplayMusicDisplay({
            isMusicXmlLoaded: false,
            isMusicXmlLoading: false,
            notesUnderCursor: new Set<number>(),
            loadMusicXml,
            goBackward,
            goForward
        })

        return unmount

        /** Returns the main cursor pointing to the current note. */
        function getCursor (): Cursor { return osmd.cursors[0] }

        function updateNotesUnderCursor (): void {
            const notesUnderCursor = getNotesUnderCursor()
            setSheetMusicDisplayMusicDisplay(prev => prev === undefined
                ? undefined
                : {
                    ...prev,
                    notesUnderCursor
                })
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
    }, [])

    return [containerRef, sheetMusicDisplay] as Result<T>
}

const osmdOptions = {
    backend: 'svg',
    drawingParameters: 'compacttight',
    drawCredits: false,
    drawTitle: false,
    drawSubtitle: false,
    drawComposer: false,
    drawLyricist: false,
    drawPartNames: false,
    renderSingleHorizontalStaffline: true,
    followCursor: true
}
