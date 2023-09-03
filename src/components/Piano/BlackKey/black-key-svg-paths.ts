import { createPathBuilder } from '../../../utilities/path-builder'
import {
    BLACK_KEY_BOTTOM_PADDING, BLACK_KEY_HEIGHT, BLACK_KEY_TOP_PADDING, BLACK_KEY_WIDTH
} from '../../dimensions'

const createKeyPath = (topPadding = 0, bottomPadding = 0): string =>
    createPathBuilder()
        .move(0, topPadding)
        .horizontal(BLACK_KEY_WIDTH)
        .vertical(BLACK_KEY_HEIGHT - topPadding - bottomPadding)
        .horizontal(-BLACK_KEY_WIDTH)
        .close()

export const mainShapePath = createKeyPath()
export const velocitySensitiveShapePath = createKeyPath(BLACK_KEY_TOP_PADDING, BLACK_KEY_BOTTOM_PADDING)
