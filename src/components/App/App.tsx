import React, {type FC, useCallback, useEffect, useMemo, useState} from "react"
import {Piano} from "../Piano"
import {useSheetMusicDisplay} from "../../hooks/use-sheet-music-display"
import prelude from "music-xml/wtk-prelude-1.xml"
import {SheetMusic} from "../SheetMusic"
import {useMidiInputListener} from "../../hooks/use-midi-input-listener"
import {useMidiInputsUpdater} from "../../hooks/use-midi-inputs-updater"
import {useMidiInputsState} from "./use-midi-inputs-state"
import {usePianoState} from "./use-piano-state"

export const App: FC = () => {
    // Sheet music to display.
    const [musicXml] = useState(prelude)

    // Global piano state which shows all pressed keys.
    const pianoState = usePianoState()

    // Momentary piano state which is a subset of global state. It shows only pressed keys at
    // current moment. It is used to test against marked notes.
    const momentaryPianoState = usePianoState()

    const handlePress = useCallback((note: number, velocity: number) => {
        pianoState.press(note, velocity)
        momentaryPianoState.press(note, velocity)
    }, [pianoState.press, momentaryPianoState.press])

    const handleRelease = useCallback((note: number) => {
        pianoState.release(note)
        momentaryPianoState.release(note)
    }, [pianoState.release, momentaryPianoState.release])

    const [ref, sheetMusicDisplay] = useSheetMusicDisplay<HTMLDivElement>()

    useEffect(() => {
        if (musicXml !== undefined) sheetMusicDisplay?.loadMusicXml(musicXml)
    }, [sheetMusicDisplay?.loadMusicXml, musicXml])

    const markedNotes: Set<number> = useMemo(
        () => sheetMusicDisplay?.notesUnderCursor ?? new Set(),
        [sheetMusicDisplay?.notesUnderCursor]
    )

    useEffect(() => {
        if (!sheetMusicDisplay) return
        const {isMusicXmlLoaded, goForward} = sheetMusicDisplay
        if (!isMusicXmlLoaded) return

        let areAllNotesPressed = true
        markedNotes.forEach(note => {
            areAllNotesPressed =
                areAllNotesPressed && momentaryPianoState.noteVelocities[note] !== undefined
        })
        if (areAllNotesPressed) {
            momentaryPianoState.clear()
            goForward()
        }
    }, [
        momentaryPianoState.noteVelocities,
        momentaryPianoState.clear,
        markedNotes,
        sheetMusicDisplay
    ])


    const {
        midiInputs,
        selectedMidiInputName,
        selectedMidiInput,
        setSelectedMidiInputName,
        setMidiInputs
    } = useMidiInputsState()
    useMidiInputsUpdater(setMidiInputs)
    useMidiInputListener(selectedMidiInput, handlePress, handleRelease)

    return <div>
        <SheetMusic osmdRef={ref} sheetMusicDisplay={sheetMusicDisplay}/>
        <Piano
            noteVelocities={pianoState.noteVelocities}
            markedNotes={markedNotes}
            onPress={handlePress}
            onRelease={handleRelease}
        />
        <select value={selectedMidiInputName} onChange={({target}) => {
            setSelectedMidiInputName(target.value)
        }}>
            <option value={"/"}/>
            {
                Object.entries(midiInputs).map(([id, input]) =>
                    <option key={id} value={id}>
                        {input.name}
                    </option>
                )
            }
        </select>
    </div>
}


