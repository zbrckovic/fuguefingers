import React, {type FC, useEffect, useMemo, useState} from "react"
import {Piano} from "./components/Piano"
import {usePiano} from "./use-piano"
import {useSheetMusicDisplay} from "./hooks/use-sheet-music-display"
import prelude from "music-xml/wtk-prelude-1.xml"
import {SheetMusic} from "./components/SheetMusic"
import {Note, Velocity} from "./midi-constants"
import {useMidiListener} from "./hooks/use-midi-listener"
import {useMidiInputs} from "./hooks/use-midi-inputs"

export const App: FC = () => {
    // Sheet music to display.
    const [musicXml] = useState(prelude)

    // Current state of the piano keyboard.
    const {noteVelocities, play} = usePiano()

    const inputs = useMidiInputs()
    const [selectedInputName, setSelectedInputName] = useState<string>()
    const selectedInput = useMemo(
        () => selectedInputName !== undefined ? inputs[selectedInputName] : undefined,
        [inputs, selectedInputName]
    )

    const [press, release] = useMemo(() => {
        const press = (note: Note, velocity: Velocity) => {
            play({[note]: velocity})
        }

        const release = (note: Note) => {
            play(undefined, new Set([note]))
        }

        return [press, release]
    }, [play])

    useMidiListener(selectedInput, press, release)

    const [ref, sheetMusicDisplay] = useSheetMusicDisplay<HTMLDivElement>()

    useEffect(() => {
        if (sheetMusicDisplay === undefined) return
        if (musicXml === undefined) return
        sheetMusicDisplay.loadMusicXml(musicXml)
    }, [sheetMusicDisplay?.loadMusicXml, musicXml])

    const highlightedNotes: Set<number> = useMemo(
        () => sheetMusicDisplay?.notesUnderCursor ?? new Set(),
        [sheetMusicDisplay?.notesUnderCursor]
    )

    useEffect(() => {
        if (!sheetMusicDisplay) return
        const {isMusicXmlLoaded, goForward} = sheetMusicDisplay
        if (!isMusicXmlLoaded) return

        let areAllNotesPressed = true
        highlightedNotes.forEach(note => {
            areAllNotesPressed = areAllNotesPressed && noteVelocities[note] !== undefined
        })
        if (areAllNotesPressed) goForward()
    }, [noteVelocities, highlightedNotes, sheetMusicDisplay])

    return <div>
        <SheetMusic osmdRef={ref} sheetMusicDisplay={sheetMusicDisplay}/>
        <Piano noteVelocities={noteVelocities} highlightedNotes={highlightedNotes}/>
        <select value={selectedInputName} onChange={({target}) => {
            setSelectedInputName(target.value)
        }}>
            <option value={"/"}/>
            {

                Object.entries(inputs).map(([id, input]) =>
                    <option key={id} value={id}>
                        {input.name}
                    </option>
                )
            }
        </select>
    </div>
}
