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
 * Keys are MIDI note numbers of active notes and values are their velocities.
 */
export type NoteVelocities = Record<Note, Velocity>

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

export enum MidiCommand {
    NOTE_ON = 0x90,
    NOTE_OFF = 0x80
}

export type MidiInputs = Record<string, MIDIInput>
