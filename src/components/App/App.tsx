import React, {type FC, useEffect, useMemo, useState} from "react"
import {Piano} from "../Piano"
import {useSheetMusicDisplay} from "../../hooks/use-sheet-music-display"
import prelude from "music-xml/wtk-prelude-1.xml"
import {SheetMusic} from "../SheetMusic"
import {useMidiInputListener} from "../../hooks/use-midi-input-listener"
import {useMidiInputsUpdater} from "../../hooks/use-midi-inputs-updater"
import {useMidiInputsState} from "./use-midi-inputs-state"
import {usePianoKeyboardState} from "./use-piano-keyboard-state"

export const App: FC = () => {
    // Sheet music to display.
    const [musicXml] = useState(prelude)

    const {
        midiInputs,
        selectedMidiInputName,
        selectedMidiInput,
        setSelectedMidiInputName,
        setMidiInputs
    } = useMidiInputsState()
    const {noteVelocities, press, release} = usePianoKeyboardState()
    useMidiInputsUpdater(setMidiInputs)
    useMidiInputListener(selectedMidiInput, press, release)

    const [ref, sheetMusicDisplay] = useSheetMusicDisplay<HTMLDivElement>()

    // Load sheet music when both sheet music display and music xml are ready.
    useEffect(() => {
        if (sheetMusicDisplay === undefined) return
        if (musicXml === undefined) return
        sheetMusicDisplay.loadMusicXml(musicXml)
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
            areAllNotesPressed = areAllNotesPressed && noteVelocities[note] !== undefined
        })
        if (areAllNotesPressed) {
            goForward()
            // TODO: think about cancelling pressed notes somehow.
        }
    }, [noteVelocities, markedNotes, sheetMusicDisplay])

    return <div>
        <SheetMusic osmdRef={ref} sheetMusicDisplay={sheetMusicDisplay}/>
        <Piano
            noteVelocities={noteVelocities}
            markedNotes={markedNotes}
            onPress={press}
            onRelease={release}
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


