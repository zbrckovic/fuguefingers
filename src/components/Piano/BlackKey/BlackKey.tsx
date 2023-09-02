import React, {FC} from "react"
import classNames from "classnames"
import {PianoKey} from "../../../piano-key"
import {Velocity} from "../../../midi-constants"
import styles from "./BlackKey.module.sass"
import {keyVelocityCalculator} from "../velocity-calculator";
import {mainShapePath, velocitySensitiveShapePath} from "./black-key-svg-paths";
import {
    BLACK_KEY_HEIGHT,
    BLACK_KEY_WIDTH,
    MARKER_BOTTOM_PADDING,
    MARKER_RADIUS
} from "../../dimensions";

interface Props {
    pianoKey: PianoKey
    velocity?: Velocity
    marked?: boolean
    onPress: (velocity: number) => void
    onRelease: () => void
}

export const BlackKey: FC<Props> = ({velocity, marked = false, onPress, onRelease}) => <>
    <path
        className={classNames(
            styles.background,
            {[styles.pressed]: velocity !== undefined},
        )}
        d={mainShapePath}
        onMouseDown={(event) => {
            const pathElement: SVGPathElement = event.currentTarget
            const velocity =
                keyVelocityCalculator.black.calculateAtEdge(pathElement, event.clientY);
            if (velocity !== undefined) onPress(velocity)
        }}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
    />
    <path className={classNames(styles.velocitySensitivePart)}
          d={velocitySensitiveShapePath}
          onMouseDown={(event) => {
              const pathElement: SVGPathElement = event.currentTarget
              const velocity =
                  keyVelocityCalculator.black.calculateInMiddle(pathElement, event.clientY);
              onPress(velocity)
          }}
          onMouseUp={onRelease}
    />
    <circle
        className={classNames(styles.marker, {[styles.marked]: marked})}
        cx={BLACK_KEY_WIDTH / 2}
        cy={BLACK_KEY_HEIGHT - MARKER_BOTTOM_PADDING}
        r={MARKER_RADIUS * 0.94}
    />
</>



