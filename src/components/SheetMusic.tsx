import React, { type FC, type MutableRefObject } from 'react'
import { type SheetMusicDisplay } from '../sheet-music-display'
import { useResizeObserver } from '../utilities/use-resize-observer'
import styles from './SheetMusic.module.sass'

interface Props {
    osmdRef: MutableRefObject<HTMLDivElement | null>
    sheetMusicDisplay?: SheetMusicDisplay
}

/**
 * Renders sheet music display.
 * The user of this component must use useSheetMusicDisplay hook to create ref and sheet music
 * display object, then pass them to this component.
 * @param osmdRef - reference to the div element that will contain OpenSheetMusicDisplay.
 * @param sheetMusicDisplay - sheet music display object.
 * @see useSheetMusicDisplay - hook that creates sheet music display object.
 */
export const SheetMusic: FC<Props> = ({ osmdRef, sheetMusicDisplay }) => {
    const ref = useResizeObserver<HTMLDivElement>()

    return <main ref={ref} className={styles.root}>
        <div ref={osmdRef}/>
        <button
            disabled={sheetMusicDisplay === undefined}
            onClick={sheetMusicDisplay?.actions.goBackward}
        >
            Backward
        </button>
        <button
            disabled={sheetMusicDisplay === undefined}
            onClick={sheetMusicDisplay?.actions.goForward}
        >
            Forward
        </button>
    </main>
}
