import classNames from 'classnames'
import React, { type FC } from 'react'
import { BOTTOM_A, TOP_C, type Velocity } from '../../../midi-constants'
import { type PianoKey } from '../../../piano-key'
import {
    MARKER_BOTTOM_PADDING, MARKER_RADIUS, WHITE_KEY_HEIGHT, WHITE_KEY_WIDTH
} from '../../dimensions'
import { keyVelocityCalculator } from '../velocity-calculator'
import { getMainShapePath, getVelocitySensitiveShapePath } from './white-key-svg-paths'

import styles from './WhiteKey.module.sass'

interface Props {
    pianoKey: PianoKey
    velocity?: Velocity
    marked?: boolean
    onPress: (velocity: number) => void
    onRelease: () => void
}

export const WhiteKey: FC<Props> = ({ pianoKey, velocity, marked = false, onPress, onRelease }) =>
    <>
        <path
            className={classNames(styles.background, { [styles.pressed]: velocity !== undefined })}
            d={getMainShapePath(pianoKey.ordinal, getEdgeFromKey(pianoKey))}
            onMouseDown={(event) => {
                const pathElement: SVGPathElement = event.currentTarget
                const velocity =
                    keyVelocityCalculator.white.calculateAtEdge(pathElement, event.clientY)
                if (velocity !== undefined) onPress(velocity)
            }}
            onMouseUp={onRelease}
            onMouseLeave={onRelease}
        />
        <path
            className={classNames(styles.velocitySensitivePart)}
            d={getVelocitySensitiveShapePath(pianoKey.ordinal, getEdgeFromKey(pianoKey))}
            onMouseDown={(event) => {
                const pathElement: SVGPathElement = event.currentTarget
                const velocity =
                    keyVelocityCalculator.white.calculateInMiddle(pathElement, event.clientY)
                onPress(velocity)
            }}
            onMouseUp={onRelease}
        />
        <circle
            className={classNames(styles.marker, { [styles.marked]: marked })}
            cx={WHITE_KEY_WIDTH / 2}
            cy={WHITE_KEY_HEIGHT - MARKER_BOTTOM_PADDING}
            r={MARKER_RADIUS}
        />
    </>

const getEdgeFromKey = (keyInfo: PianoKey): 'bottomA' | 'topC' | undefined => {
    switch (keyInfo.note) {
        case BOTTOM_A:
            return 'bottomA'
        case TOP_C:
            return 'topC'
    }
}
