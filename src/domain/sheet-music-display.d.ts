export interface SheetMusicDisplayState {
    readonly isMusicXmlLoaded: boolean
    readonly isMusicXmlLoading: boolean
    readonly notesUnderCursor: Set<number>
}

export interface SheetMusicDisplayActions {
    readonly loadMusicXml: (url: string) => void

    /** Moves the main cursor forward. */
    readonly goForward: () => void

    /** Moves the main cursor backward. */
    readonly goBackward: () => void
}

export interface SheetMusicDisplay {
    readonly state: SheetMusicDisplayState
    readonly actions: SheetMusicDisplayActions
}
