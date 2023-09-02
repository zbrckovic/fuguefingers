export const WHITE_KEY_WIDTH = 18
export const WHITE_KEY_HEIGHT = 70
export const BLACK_KEY_WIDTH = 10
export const BLACK_KEY_HEIGHT = 40

export const BLACK_KEY_TOP_PADDING = 5
export const BLACK_KEY_BOTTOM_PADDING = 10
export const WHITE_KEY_TOP_PADDING = 5
export const WHITE_KEY_BOTTOM_PADDING = 10

// Cut-out on the right side of C key and the left side of E key.
export const C_E_CUT = WHITE_KEY_WIDTH - (3 * WHITE_KEY_WIDTH - 3 * BLACK_KEY_WIDTH) / 2
// Cut-out on the left and right side of D key.
export const D_CUT = BLACK_KEY_WIDTH - C_E_CUT
// Cut-out ond the right side of F key and the left side of B key.
export const F_B_CUT = WHITE_KEY_WIDTH - (4 * WHITE_KEY_WIDTH - 5 * BLACK_KEY_WIDTH) / 2
// Cut-out on the left side of G key and the right side of A key.
export const G_A_OUTER_CUT = BLACK_KEY_WIDTH - F_B_CUT
// Cut-out on the right side of G key and the left side of A key.
export const G_A_INNER_CUT = BLACK_KEY_WIDTH / 2

// Total number of white keys on the piano.
export const WHITE_KEYS_COUNT = 52

// Total width of the whole keyboard.
export const KEYBOARD_WIDTH = WHITE_KEY_WIDTH * WHITE_KEYS_COUNT
export const KEYBOARD_HEIGHT = WHITE_KEY_HEIGHT

// The distance of C# key from the start of the octave.
export const C_SHARP_OFFSET = WHITE_KEY_WIDTH - C_E_CUT
// The distance of D# key from the start of the octave.
export const D_SHARP_OFFSET = C_SHARP_OFFSET + BLACK_KEY_WIDTH * 2
// The distance of F# key from the start of the octave.
export const F_SHARP_OFFSET = 4 * WHITE_KEY_WIDTH - F_B_CUT
// The distance of G# key from the start of the octave.
export const G_SHARP_OFFSET = F_SHARP_OFFSET + 2 * BLACK_KEY_WIDTH
// The distance of A# key from the start of the octave.
export const A_SHARP_OFFSET = G_SHARP_OFFSET + 2 * BLACK_KEY_WIDTH

// The height of dead zones at top and bottom parts of a key which, when pressed, produces min and
// max velocity respectively.
export const WHITE_KEY_VELOCITY_SENSITIVE_PART_HEIGHT = WHITE_KEY_HEIGHT - WHITE_KEY_TOP_PADDING - WHITE_KEY_BOTTOM_PADDING
export const BLACK_KEY_VELOCITY_SENSITIVE_PART_HEIGHT = BLACK_KEY_HEIGHT - BLACK_KEY_TOP_PADDING - BLACK_KEY_BOTTOM_PADDING

export const MARKER_RADIUS = BLACK_KEY_WIDTH * 0.4
export const MARKER_BOTTOM_PADDING = MARKER_RADIUS * 2
