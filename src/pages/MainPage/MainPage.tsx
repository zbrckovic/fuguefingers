import prelude from 'music-xml/wtk-prelude-1.xml'
import React, { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useMidiInputListener } from 'hooks/use-midi-input-listener'
import { useMidiInputsUpdater } from 'hooks/use-midi-inputs-updater'
import { useSheetMusicDisplay } from 'hooks/use-sheet-music-display'
import { SheetMusic } from 'components/SheetMusic'
import { Footer } from './Footer'
import { useMidiInputsState } from './use-midi-inputs-state'
import { usePianoState } from './use-piano-state'
import styles from './MainPage.module.sass'

export const MainPage: FC = () => {
    // Sheet music to display.
    const [musicXml] = useState(prelude)

    // Global piano state which shows all pressed keys.
    const [noteVelocities, pianoActions] = usePianoState()

    // Momentary piano state which is a subset of global state. It shows only pressed keys at
    // current moment. It is used to test against marked notes.
    const [momentaryNoteVelocities, momentaryPianoActions] = usePianoState()

    const handlePress = useCallback((note: number, velocity: number) => {
        pianoActions.press(note, velocity)
        momentaryPianoActions.press(note, velocity)
    }, [pianoActions, momentaryPianoActions])

    const handleRelease = useCallback((note: number) => {
        pianoActions.release(note)
        momentaryPianoActions.release(note)
    }, [pianoActions, momentaryPianoActions])

    const { containerRef, sheetMusicDisplay } = useSheetMusicDisplay<HTMLDivElement>()

    useEffect(() => {
        if (musicXml !== undefined) sheetMusicDisplay?.actions?.loadMusicXml(musicXml)
    }, [sheetMusicDisplay?.actions, musicXml])

    const markedNotes: Set<number> = useMemo(
        () => sheetMusicDisplay?.state.notesUnderCursor ?? new Set(),
        [sheetMusicDisplay?.state.notesUnderCursor]
    )

    useEffect(() => {
        const isMusicXmlLoaded = sheetMusicDisplay?.state.isMusicXmlLoaded ?? false
        if (!isMusicXmlLoaded) return

        let areAllNotesPressed = true
        markedNotes.forEach(note => {
            areAllNotesPressed =
                areAllNotesPressed && momentaryNoteVelocities[note] !== undefined
        })
        if (areAllNotesPressed) {
            momentaryPianoActions.clear()
            sheetMusicDisplay?.actions.goForward()
        }
    }, [
        momentaryNoteVelocities,
        markedNotes,
        momentaryPianoActions,
        sheetMusicDisplay?.state.isMusicXmlLoaded,
        sheetMusicDisplay?.actions
    ])

    const [
        {
            midiInputs,
            selectedMidiInputName,
            selectedMidiInput
        },
        {
            setMidiInputs,
            setSelectedMidiInputName
        }
    ] = useMidiInputsState()
    useMidiInputsUpdater(setMidiInputs)
    useMidiInputListener(selectedMidiInput, handlePress, handleRelease)

    return <div className={styles.root}>
        <main className={styles.main}>
            <SheetMusic
                className={styles.sheetMusic}
                osmdRef={containerRef}
                sheetMusicDisplay={sheetMusicDisplay}
                value={selectedMidiInputName}
                onChange={setSelectedMidiInputName}
                midiInputs={midiInputs}
            />
        </main>
        <Footer
            noteVelocities={noteVelocities}
            markedNotes={markedNotes}
            onPress={handlePress}
            onRelease={handleRelease}
        />
    </div>
}
