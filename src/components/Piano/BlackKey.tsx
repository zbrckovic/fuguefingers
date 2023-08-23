import {
    BLACK_KEY_BOTTOM_PADDING,
    BLACK_KEY_HEIGHT,
    BLACK_KEY_TOP_PADDING,
    BLACK_KEY_WIDTH
} from "../dimensions"
import {createPathBuilder} from "../../utilities/path-builder"
import React, {FC} from "react"
import classNames from "classnames"
import {PianoKey} from "../../piano-key"
import {Velocity} from "../../midi-constants"
import styles from "./BlackKey.module.sass"

interface Props {
    className?: string
    pianoKey: PianoKey
    velocity?: Velocity
    highlighted: boolean
}

export const BlackKey: FC<Props> = ({className, highlighted}) =>
    <>
        <path className={classNames(styles.root, {[styles.highlighted]: highlighted}, className)}
              d={keyPath}
              onClick={() => {
                  console.log("edge part")
              }}
        />
        <path className={classNames(styles.velocitySensitivePart)}
              d={velocitySensitivePartPath}
              onClick={() => {
                  console.log("velocity sensitive part")
              }}
        />
    </>


const createKeyPath = (topPadding = 0, bottomPadding = 0) => createPathBuilder()
    .move(0, topPadding)
    .horizontal(BLACK_KEY_WIDTH)
    .vertical(BLACK_KEY_HEIGHT - topPadding - bottomPadding)
    .horizontal(-BLACK_KEY_WIDTH)
    .close()

const velocitySensitivePartPath = createKeyPath(BLACK_KEY_TOP_PADDING, BLACK_KEY_BOTTOM_PADDING)
const keyPath = createKeyPath()
