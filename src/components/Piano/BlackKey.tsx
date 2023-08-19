import {BLACK_KEY_HEIGHT, BLACK_KEY_WIDTH} from "../dimensions";
import {createPathBuilder} from "../../utilities/path-builder";
import React, {FC} from "react";
import classNames from "classnames";
import {PianoKey} from "../../piano-key";
import {Velocity} from "../../midi-constants";

interface Props {
    className?: string
    pianoKey: PianoKey
    velocity?: Velocity
}

export const BlackKey: FC<Props> = ({className}) =>
    <path className={classNames(className)}
          fill="black"
          d={keyPath}
    />

const keyPath = createPathBuilder()
    .move(0, 0)
    .horizontal(BLACK_KEY_WIDTH)
    .vertical(BLACK_KEY_HEIGHT)
    .horizontal(-BLACK_KEY_WIDTH)
    .close()
