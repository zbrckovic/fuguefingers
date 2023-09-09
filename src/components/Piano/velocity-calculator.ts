import { NOTE_VELOCITY_MAX, NOTE_VELOCITY_MIN } from '../../midi-constants'
import {
    BLACK_KEY_TOP_PADDING, BLACK_KEY_VELOCITY_SENSITIVE_PART_HEIGHT, WHITE_KEY_TOP_PADDING,
    WHITE_KEY_VELOCITY_SENSITIVE_PART_HEIGHT
} from './dimensions'

export const keyVelocityCalculator = {
    white: {
        calculateInMiddle: (element: Element, pressPointY: number) =>
            calculateKeyVelocityInMiddle(
                element,
                pressPointY,
                WHITE_KEY_VELOCITY_SENSITIVE_PART_HEIGHT
            ),
        calculateAtEdge: (element: Element, pressPointY: number) =>
            calculateKeyVelocityAtEdge(element, pressPointY, WHITE_KEY_TOP_PADDING)
    },
    black: {
        calculateInMiddle: (element: Element, pressPointY: number) =>
            calculateKeyVelocityInMiddle(
                element,
                pressPointY,
                BLACK_KEY_VELOCITY_SENSITIVE_PART_HEIGHT
            ),
        calculateAtEdge: (element: Element, pressPointY: number) =>
            calculateKeyVelocityAtEdge(element, pressPointY, BLACK_KEY_TOP_PADDING)
    }
}

const calculateKeyVelocityInMiddle = (
    element: Element,
    pressPointY: number,
    velocitySensitivePartHeight: number
): number => {
    const rect = element.getBoundingClientRect()
    const y = pressPointY - rect.y
    const velocityRatio = y / velocitySensitivePartHeight
    const velocityRaw = Math.round(velocityRatio * NOTE_VELOCITY_MAX)
    return clampVelocity(velocityRaw)
}

const calculateKeyVelocityAtEdge = (
    element: Element,
    pressPointY: number,
    topPadding: number
): number => {
    const rect = element.getBoundingClientRect()
    const y = pressPointY - rect.y - topPadding
    return y <= topPadding ? NOTE_VELOCITY_MIN : NOTE_VELOCITY_MAX
}

const clampVelocity = (velocity: number): number => {
    if (velocity <= NOTE_VELOCITY_MIN) return NOTE_VELOCITY_MIN
    if (velocity >= NOTE_VELOCITY_MAX) return NOTE_VELOCITY_MAX
    return velocity
}
