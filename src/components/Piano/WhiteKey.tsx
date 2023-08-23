import {BOTTOM_A, TOP_C, type Velocity} from "../../midi-constants"
import React, {type FC} from "react"

import styles from "./WhiteKey.module.sass"
import classNames from "classnames"
import {
    BLACK_KEY_BOTTOM_PADDING,
    BLACK_KEY_HEIGHT,
    BLACK_KEY_WIDTH,
    C_E_CUT,
    D_CUT,
    F_B_CUT,
    G_A_INNER_CUT,
    G_A_OUTER_CUT, WHITE_KEY_BOTTOM_PADDING,
    WHITE_KEY_HEIGHT, WHITE_KEY_TOP_PADDING,
    WHITE_KEY_WIDTH
} from "../dimensions"
import {createPathBuilder} from "../../utilities/path-builder"
import {PianoKey} from "../../piano-key"

interface Props {
    className?: string
    pianoKey: PianoKey
    velocity?: Velocity
    highlighted: boolean
}

export const WhiteKey: FC<Props> = ({className, pianoKey, highlighted}) =>
    <>
        <path className={classNames(styles.root, {[styles.highlighted]: highlighted}, className)}
              d={getKeyPath(pianoKey.ordinal, getEdgeFromKey(pianoKey))}
              onClick={() => {
                  console.log("edge part")
              }}
        />
        <path className={classNames(styles.velocitySensitivePart)}
              d={getVelocitySensitivePath(pianoKey.ordinal, getEdgeFromKey(pianoKey))}
              onClick={() => {
                  console.log("velocity sensitive part")
              }}
        />
    </>

const createKeyPaths = (topPadding: number = 0, bottomPadding: number = 0) => {
    // SVG paths for all white keys.
    const keyPaths = [
        // C
        createPathBuilder()
            .move(0, WHITE_KEY_HEIGHT - bottomPadding)
            .vertical(-WHITE_KEY_HEIGHT + topPadding + bottomPadding)
            .horizontal(WHITE_KEY_WIDTH - C_E_CUT)
            .vertical(BLACK_KEY_HEIGHT - topPadding)
            .horizontal(C_E_CUT)
            .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT - bottomPadding)
            .close(),
        // D
        createPathBuilder()
            .move(0, WHITE_KEY_HEIGHT - bottomPadding)
            .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT + bottomPadding)
            .horizontal(D_CUT)
            .vertical(-BLACK_KEY_HEIGHT + topPadding)
            .horizontal(BLACK_KEY_WIDTH)
            .vertical(BLACK_KEY_HEIGHT - topPadding)
            .horizontal(D_CUT)
            .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT - bottomPadding)
            .close(),
        // E
        createPathBuilder()
            .move(0, WHITE_KEY_HEIGHT - bottomPadding)
            .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT + bottomPadding)
            .horizontal(C_E_CUT)
            .vertical(-BLACK_KEY_HEIGHT + topPadding)
            .horizontal(WHITE_KEY_WIDTH - C_E_CUT)
            .vertical(WHITE_KEY_HEIGHT - topPadding - bottomPadding)
            .close(),
        // F
        createPathBuilder()
            .move(0, WHITE_KEY_HEIGHT - bottomPadding)
            .vertical(-WHITE_KEY_HEIGHT + topPadding + bottomPadding)
            .horizontal(WHITE_KEY_WIDTH - F_B_CUT)
            .vertical(BLACK_KEY_HEIGHT - topPadding)
            .horizontal(F_B_CUT)
            .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT - bottomPadding)
            .close(),
        // G
        createPathBuilder()
            .move(0, WHITE_KEY_HEIGHT - bottomPadding)
            .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT + bottomPadding)
            .horizontal(G_A_OUTER_CUT)
            .vertical(-BLACK_KEY_HEIGHT + topPadding)
            .horizontal(WHITE_KEY_WIDTH - G_A_OUTER_CUT - G_A_INNER_CUT)
            .vertical(BLACK_KEY_HEIGHT - topPadding)
            .horizontal(G_A_INNER_CUT)
            .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT - bottomPadding)
            .close(),
        // A
        createPathBuilder()
            .move(0, WHITE_KEY_HEIGHT - bottomPadding)
            .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT + bottomPadding)
            .horizontal(G_A_INNER_CUT)
            .vertical(-BLACK_KEY_HEIGHT + topPadding)
            .horizontal(WHITE_KEY_WIDTH - G_A_OUTER_CUT - G_A_INNER_CUT)
            .vertical(BLACK_KEY_HEIGHT - topPadding)
            .horizontal(G_A_OUTER_CUT)
            .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT - bottomPadding)
            .close(),
        // B
        createPathBuilder()
            .move(0, WHITE_KEY_HEIGHT - bottomPadding)
            .vertical(-WHITE_KEY_HEIGHT + BLACK_KEY_HEIGHT + bottomPadding)
            .horizontal(F_B_CUT)
            .vertical(-BLACK_KEY_HEIGHT + topPadding)
            .horizontal(WHITE_KEY_WIDTH - F_B_CUT)
            .vertical(WHITE_KEY_HEIGHT - topPadding - bottomPadding)
            .close()
    ]

    // SVG path for the bottom A key. This key has a special path because there's no inner cut-off on
    // bottom A key like on all other A keys.
    const bottomA = createPathBuilder()
        .move(0, WHITE_KEY_HEIGHT - bottomPadding)
        .vertical(-WHITE_KEY_HEIGHT + topPadding + bottomPadding)
        .horizontal(WHITE_KEY_WIDTH - G_A_OUTER_CUT)
        .vertical(BLACK_KEY_HEIGHT - topPadding)
        .horizontal(G_A_OUTER_CUT)
        .vertical(WHITE_KEY_HEIGHT - BLACK_KEY_HEIGHT - bottomPadding)
        .close()

    // SVG path for the top C key. This key has a special path because there's no cut-off on the top C
    // key.
    const topC = createPathBuilder()
        .move(0, WHITE_KEY_HEIGHT - bottomPadding)
        .vertical(-WHITE_KEY_HEIGHT + topPadding + bottomPadding)
        .horizontal(WHITE_KEY_WIDTH)
        .vertical(WHITE_KEY_HEIGHT - topPadding - bottomPadding)
        .close()


    return (ordinal: number, edge?: "bottomA" | "topC") => {
        switch (edge) {
            case "bottomA":
                return bottomA
            case "topC":
                return topC
            default:
                return keyPaths[ordinal - 1]
        }
    }
}

const getKeyPath = createKeyPaths()
const getVelocitySensitivePath = createKeyPaths(WHITE_KEY_TOP_PADDING, WHITE_KEY_BOTTOM_PADDING)

const getEdgeFromKey = (keyInfo: PianoKey): "bottomA" | "topC" | undefined => {
    switch (keyInfo.note) {
        case BOTTOM_A:
            return "bottomA"
        case TOP_C:
            return "topC"
    }
}

