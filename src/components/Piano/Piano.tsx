import React, {type FC} from 'react'
import {type NoteVelocities} from '../../use-piano'
import classNames from 'classnames'
import styles from './Piano.module.sass'
import {
    A_SHARP_OFFSET,
    C_SHARP_OFFSET,
    D_SHARP_OFFSET,
    F_SHARP_OFFSET,
    G_SHARP_OFFSET,
    KEYBOARD_HEIGHT,
    KEYBOARD_WIDTH,
    WHITE_KEY_WIDTH
} from '../dimensions'
import {pianoKeys} from "../../piano-key";
import {WhiteKey} from "./WhiteKey";
import {BlackKey} from "./BlackKey";

interface Props {
    className?: string
    noteVelocities: NoteVelocities
}

export const Piano: FC<Props> = ({className}) =>
    <svg
        className={classNames(styles.root, className)}
        viewBox={`${0} ${0} ${KEYBOARD_WIDTH} ${KEYBOARD_HEIGHT}`}
        width={KEYBOARD_WIDTH}
        height={KEYBOARD_HEIGHT}
    >
        {
            pianoKeys.white.map((pianoKey, i) => (
                <svg key={pianoKey.note} y={0} x={i * WHITE_KEY_WIDTH}>
                    <WhiteKey
                        pianoKey={pianoKey}
                    />
                </svg>
            ))
        }
        {
            pianoKeys.black.map(pianoKey => {
                // Octave 0 starts in negative quadrant because piano doesn't have first 5 keys of octave 0.
                const octaveX = (pianoKey.octave) * WHITE_KEY_WIDTH * 7 - 5 * WHITE_KEY_WIDTH
                const offsetInOctave = getKeyOffset(pianoKey.ordinal)
                const x = octaveX + offsetInOctave

                return <svg key={pianoKey.note} x={x} y={0}>
                    <BlackKey pianoKey={pianoKey}/>
                </svg>;
            })
        }
    </svg>


const getKeyOffset = (function () {
    const keyOffsets = [
        C_SHARP_OFFSET,
        D_SHARP_OFFSET,
        F_SHARP_OFFSET,
        G_SHARP_OFFSET,
        A_SHARP_OFFSET
    ]
    return (ordinal: number) => keyOffsets[ordinal - 1]
})()