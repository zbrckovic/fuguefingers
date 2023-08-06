import { type MutableRefObject, useLayoutEffect, useRef, useState } from 'react'
import { type Cursor, OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
import { useIsMounted } from './misc-hooks'

interface SheetMusicDisplay {
    readonly isMusicXmlLoaded: boolean
    readonly isMusicXmlLoading: boolean
    readonly loadMusicXml: (url: string) => void
    /** Moves the main cursor forward. */
    readonly goForward: () => void
    /** Moves the main cursor backward. */
    readonly goBackward: () => void
    readonly getNotesUnderCursor: () => Set<number>
}

export const useSheetMusicDisplay = <T extends HTMLElement> (): [MutableRefObject<T | null>, SheetMusicDisplay | undefined] => {
    const containerRef = useRef<T>(null)

    const { isMounted, unmount } = useIsMounted()
    const [musicXmlLoadingState, setMusicXmlLoadingState] = useState<SheetMusicDisplay>()

    useLayoutEffect(() => {
        if (containerRef.current === undefined || containerRef.current === null) {
            setMusicXmlLoadingState(undefined)
            return
        }
        if (musicXmlLoadingState !== undefined) return

        // Initialize OpenSheetMusicDisplay.

        const osmd = new OpenSheetMusicDisplay(containerRef.current)
        osmd.setOptions({
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
        })

        /** Returns the main cursor pointing to the current note. */
        const getCursor = (): Cursor => osmd.cursors[0]

        setMusicXmlLoadingState({
            isMusicXmlLoaded: false,
            isMusicXmlLoading: false,
            loadMusicXml (url: string): void {
                if (!isMounted) return

                setMusicXmlLoadingState(prevState => {
                    if (prevState === undefined) return
                    return ({
                        ...prevState,
                        isMusicXmlLoading: true
                    })
                })
                osmd
                    .load(url)
                    .then(() => {
                        if (!isMounted) return
                        osmd.render()
                        getCursor().show()
                        setMusicXmlLoadingState(prevState => {
                            if (prevState === undefined) return
                            return {
                                ...prevState,
                                isMusicXmlLoaded: true,
                                isMusicXmlLoading: false
                            }
                        })
                    })
                    .catch(error => { throw error })
            },
            goBackward (): void { getCursor().previous() },
            goForward (): void { getCursor().next() },
            getNotesUnderCursor (): Set<number> {
                const result = new Set<number>()

                getCursor().NotesUnderCursor().forEach(note => {
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
        })

        return unmount
    }, [])

    return [containerRef, musicXmlLoadingState]
}
