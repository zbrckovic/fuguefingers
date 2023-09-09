import classNames from 'classnames'
import React, { type FC, type MutableRefObject } from 'react'
import { type SheetMusicDisplay } from '../../domain/sheet-music-display'
import { type MidiInputs } from '../../midi-constants'
import { MidiInputSelector } from '../../pages/MainPage/MidiInputSelector'
import styles from './SheetMusic.module.sass'

interface Props {
    className?: string
    osmdRef: MutableRefObject<HTMLDivElement | null>
    sheetMusicDisplay?: SheetMusicDisplay
    /** Selected midi input name. */
    value?: string
    /** Called with midi input name when midi input is selected. */
    onChange: (name: string) => void
    midiInputs: MidiInputs
}

/**
 * Renders sheet music display.
 * The user of this component must use useSheetMusicDisplay hook to create ref and sheet music
 * display object, then pass them to this component.
 * @param osmdRef - reference to the div element that will contain OpenSheetMusicDisplay.
 * @param sheetMusicDisplay - sheet music display object.
 * @see useSheetMusicDisplay - hook that creates sheet music display object.
 */
export const SheetMusic: FC<Props> = ({
    className,
    osmdRef,
    sheetMusicDisplay,
    value,
    midiInputs,
    onChange
}) =>
    <div className={classNames(className, styles.root)}>
        <div className={styles.osmdWrapper}>
            <div ref={osmdRef}/>
        </div>
        <div className={styles.controls}>
            <button
                disabled={sheetMusicDisplay === undefined}
                onClick={sheetMusicDisplay?.actions.goBackward}
            >
                Backward
            </button>
            <MidiInputSelector value={value} onChange={onChange} midiInputs={midiInputs}/>
            <button
                disabled={sheetMusicDisplay === undefined}
                onClick={sheetMusicDisplay?.actions.goForward}
            >
                Forward
            </button>
        </div>
    </div>
