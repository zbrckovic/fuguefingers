import React, {type FC, useEffect, useState} from 'react'
import {Piano} from './components/Piano'
import {usePiano} from './use-piano'
import {useSheetMusicDisplay} from "./hooks/use-sheet-music-display";
import prelude from 'music-xml/wtk-prelude-1.xml'
import {SheetMusic} from "./components/SheetMusic";

export const App: FC = () => {
    // Sheet music to display.
    const [musicXml] = useState(prelude)

    // Current state of the piano keyboard.
    const {noteVelocities} = usePiano()

    const [ref, sheetMusicDisplay] = useSheetMusicDisplay<HTMLDivElement>()

    useEffect(() => {
        if (sheetMusicDisplay === undefined) return
        if (musicXml === undefined) return
        sheetMusicDisplay.loadMusicXml(musicXml)
    }, [sheetMusicDisplay?.loadMusicXml, musicXml])

    console.log(sheetMusicDisplay?.notesUnderCursor)

    return <div>
        <SheetMusic osmdRef={ref} sheetMusicDisplay={sheetMusicDisplay}/>
        <Piano noteVelocities={noteVelocities}/>
    </div>
}
