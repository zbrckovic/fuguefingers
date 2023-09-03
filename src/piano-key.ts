import { BOTTOM_A, type Note, TOP_C } from './midi-constants'

export interface PianoKey {
    /**
     * The MIDI number of the note represented by this key.
     */
    note: Note
    /**
     * The number of the octave of this key. The bottom octave of the piano is designated by number
     * 0.
     */
    octave: number
    /**
     * The color of this key.
     */
    isWhite: boolean
    /**
     * A 1-based ordinal number of this key among all keys within the octave (1-12). In other words,
     * this is a step of the chromatic scale starting with C.
     */
    chromaticDegree: number
    /**
     * In case of white key, this is a 1-based ordinal number of this white key among all white keys
     * within the octave (1-7).
     * In case of black key, this is a 1-based ordinal number of this black key among all black keys
     * within the octave (1-5).
     */
    ordinal: number
}

interface PianoKeys {
    white: PianoKey[]
    black: PianoKey[]
}

const calculateKeys = (): PianoKeys => {
    const calculatePianoKeyInfo = (note: Note): PianoKey => {
        const chromaticDegree = calculateChromaticDegree(note)
        const octave = calculateOctave(note)
        const isBlack = blackKeysOrdinals[chromaticDegree] !== undefined
        const ordinal = isBlack
            ? blackKeysOrdinals[chromaticDegree]
            : whiteKeysOrdinals[chromaticDegree]

        return {
            note,
            octave,
            isWhite: !isBlack,
            chromaticDegree,
            ordinal
        }
    }

    const calculateChromaticDegree = (note: Note): number => note % 12 + 1

    const calculateOctave = (note: Note): number => Math.floor(note / 12) - 1

    const whiteKeysOrdinals: Record<number, number> = {
        1: 1, // C
        3: 2, // D
        5: 3, // E
        6: 4, // F
        8: 5, // G
        10: 6, // A
        12: 7 // B
    }

    const blackKeysOrdinals: Record<number, number> = {
        2: 1, // C#
        4: 2, // D#
        7: 3, // F#
        9: 4, // G#
        11: 5 // A#
    }

    const white: PianoKey[] = []
    const black: PianoKey[] = []

    for (let note = BOTTOM_A; note <= TOP_C; note++) {
        const info = calculatePianoKeyInfo(note)
        if (info.isWhite) {
            white.push(info)
        } else {
            black.push(info)
        }
    }

    return {
        white,
        black
    }
}

export const pianoKeys = calculateKeys()
