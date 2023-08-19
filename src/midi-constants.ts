/**
 * MIDI code number of a musical note (tone).
 */
export type Note = number

/**
 * MIDI value for note velocity. Only note-start (key-press) velocity is relevant for this app (not
 * the release velocity).
 */
export type Velocity = number

/**
 * MIDI number of A0.
 */
export const BOTTOM_A: Note = 21

/**
 * MIDI number of C4.
 */
export const MIDDLE_C: Note = 48

/**
 * MIDI number of C8.
 */
export const TOP_C: Note = 108

export const NOTE_VELOCITY_MAX = 127
export const NOTE_VELOCITY_MIN = 0
