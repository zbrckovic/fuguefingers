import React, {MutableRefObject} from 'react'
import {SheetMusicDisplay} from "../hooks/use-sheet-music-display";

interface Props {
    osmdRef: MutableRefObject<HTMLDivElement | null>
    sheetMusicDisplay: SheetMusicDisplay | undefined
}

export function SheetMusic({osmdRef, sheetMusicDisplay}: Props) {
    return <div>
        <div ref={osmdRef}/>
        <button disabled={sheetMusicDisplay === undefined}
                onClick={sheetMusicDisplay?.goBackward}>Backward
        </button>
        <button disabled={sheetMusicDisplay === undefined}
                onClick={sheetMusicDisplay?.goForward}>Forward
        </button>
    </div>
}
