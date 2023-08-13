import {type Velocity} from '../../midi-constants'
import React, {type FC} from 'react'

import styles from './WhiteKey.module.sass'
import classNames from 'classnames'
import {
    BLACK_KEY_HEIGHT,
    BLACK_KEY_WIDTH,
    C_E_CUT,
    D_CUT,
    F_B_CUT,
    G_A_INNER_CUT,
    G_A_OUTER_CUT,
    WHITE_KEY_HEIGHT,
    WHITE_KEY_WIDTH
} from '../dimensions'
import {createPathBuilder} from '../../utilities/path-builder'

interface Props {
    className?: string
    velocity?: Velocity
    highlighted?: boolean
    ordinal: number
    edge?: 'bottomA' | 'topC'
}

export const WhiteKey: FC<Props> = ({ordinal, edge}) =>
    <path
        className={classNames(styles.root)}
        d={getKeyPath(ordinal, edge)}
    />

const getKeyPath = (ordinal: number, edge?: 'bottomA' | 'topC') => {
    switch (edge) {
        case 'bottomA':
            return bottomA
        case 'topC':
            return topC
        default:
            return keyPaths[ordinal - 1]
    }
}

// SVG path for the bottom A key. This key has a special path because there's no inner cut-off on bottom A key like on
// all other A keys.
const bottomA = createPathBuilder()
    .move(0, WHITE_KEY_HEIGHT)
    .vertical(-WHITE_KEY_HEIGHT)
    .horizontal(WHITE_KEY_WIDTH - G_A_OUTER_CUT)
    .vertical(BLACK_KEY_HEIGHT)
    .horizontal(G_A_OUTER_CUT)
    .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT)
    .close()

// SVG path for the top C key. This key has a special path because there's no cut-off on the top C key.
const topC = createPathBuilder()
    .move(0, WHITE_KEY_HEIGHT)
    .vertical(-WHITE_KEY_HEIGHT)
    .horizontal(WHITE_KEY_WIDTH)
    .vertical(WHITE_KEY_HEIGHT)
    .close()

// SVG paths for all white keys.
const keyPaths = [
    // C
    createPathBuilder()
        .move(0, WHITE_KEY_HEIGHT)
        .vertical(-WHITE_KEY_HEIGHT)
        .horizontal(WHITE_KEY_WIDTH - C_E_CUT)
        .vertical(BLACK_KEY_HEIGHT)
        .horizontal(C_E_CUT)
        .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT)
        .close(),
    // D
    createPathBuilder()
        .move(0, WHITE_KEY_HEIGHT)
        .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT)
        .horizontal(D_CUT)
        .vertical(-BLACK_KEY_HEIGHT)
        .horizontal(BLACK_KEY_WIDTH)
        .vertical(BLACK_KEY_HEIGHT)
        .horizontal(D_CUT)
        .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT)
        .close(),
    // E
    createPathBuilder()
        .move(0, WHITE_KEY_HEIGHT)
        .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT)
        .horizontal(C_E_CUT)
        .vertical(-BLACK_KEY_HEIGHT)
        .horizontal(WHITE_KEY_WIDTH - C_E_CUT)
        .vertical(WHITE_KEY_HEIGHT)
        .close(),
    // F
    createPathBuilder()
        .move(0, WHITE_KEY_HEIGHT)
        .vertical(-WHITE_KEY_HEIGHT)
        .horizontal(WHITE_KEY_WIDTH - F_B_CUT)
        .vertical(BLACK_KEY_HEIGHT)
        .horizontal(F_B_CUT)
        .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT)
        .close(),
    // G
    createPathBuilder()
        .move(0, WHITE_KEY_HEIGHT)
        .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT)
        .horizontal(G_A_OUTER_CUT)
        .vertical(-BLACK_KEY_HEIGHT)
        .horizontal(WHITE_KEY_WIDTH - G_A_OUTER_CUT - G_A_INNER_CUT)
        .vertical(BLACK_KEY_HEIGHT)
        .horizontal(G_A_INNER_CUT)
        .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT)
        .close(),
    // A
    createPathBuilder()
        .move(0, WHITE_KEY_HEIGHT)
        .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT)
        .horizontal(G_A_INNER_CUT)
        .vertical(-BLACK_KEY_HEIGHT)
        .horizontal(WHITE_KEY_WIDTH - G_A_OUTER_CUT - G_A_INNER_CUT)
        .vertical(BLACK_KEY_HEIGHT)
        .horizontal(G_A_OUTER_CUT)
        .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT)
        .close(),
    // B
    createPathBuilder().move(0, WHITE_KEY_HEIGHT)
        .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT)
        .horizontal(F_B_CUT)
        .vertical(-BLACK_KEY_HEIGHT)
        .horizontal(WHITE_KEY_WIDTH - F_B_CUT)
        .vertical(WHITE_KEY_HEIGHT)
        .close()
]
