import React, {type FC} from 'react'
import {type NoteVelocities} from '../../use-piano'
import classNames from 'classnames'
import styles from './Piano.module.sass'
import {KEYBOARD_HEIGHT, KEYBOARD_WIDTH, WHITE_KEY_WIDTH} from '../dimensions'
import {PianoKey, pianoKeys} from "../../piano-key";
import {BOTTOM_A, TOP_C} from "../../midi-constants";
import {WhiteKey} from "./WhiteKey";

interface Props {
    className?: string
    noteVelocities: NoteVelocities
}

export const Piano: FC<Props> = ({className, noteVelocities}) =>
    <svg
        className={classNames(styles.root, className)}
        viewBox={`${0} ${0} ${KEYBOARD_WIDTH} ${KEYBOARD_HEIGHT}`}
        width={KEYBOARD_WIDTH}
        height={KEYBOARD_HEIGHT}
    >
        {
            pianoKeys.white.map(
                (keyInfo, i) =>
                    <svg key={keyInfo.note} y={0} x={i * WHITE_KEY_WIDTH}>
                        <WhiteKey
                            ordinal={keyInfo.ordinal}
                            edge={getEdgeFromKey(keyInfo)}
                        />
                    </svg>
            )
        }
    </svg>

const getEdgeFromKey = (keyInfo: PianoKey): 'bottomA' | 'topC' | undefined => {
    switch (keyInfo.note) {
        case BOTTOM_A:
            return 'bottomA'
        case TOP_C:
            return 'topC'
    }
}
