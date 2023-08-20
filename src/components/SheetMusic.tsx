import React, {MutableRefObject} from "react"
import {SheetMusicDisplay} from "../hooks/use-sheet-music-display"

interface Props {
    osmdRef: MutableRefObject<HTMLDivElement | null>
    sheetMusicDisplay: SheetMusicDisplay | undefined
}

/**
 * Renders sheet music display.
 * The user of this component must use useSheetMusicDisplay hook to create ref and sheet music
 * display object, then pass them to this component.
 * @param osmdRef - reference to the div element that will contain OpenSheetMusicDisplay.
 * @param sheetMusicDisplay - sheet music display object.
 * @see useSheetMusicDisplay - hook that creates sheet music display object.
 */
export const SheetMusic = ({osmdRef, sheetMusicDisplay}: Props) =>
    <div>
        <div ref={osmdRef}/>
        <button disabled={sheetMusicDisplay === undefined}
                onClick={sheetMusicDisplay?.goBackward}>Backward
        </button>
        <button disabled={sheetMusicDisplay === undefined}
                onClick={sheetMusicDisplay?.goForward}>Forward
        </button>
    </div>
