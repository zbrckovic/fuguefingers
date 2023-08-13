import { useState } from 'react'
import { type Note, type Velocity } from './midi-constants'

/**
 * Keys are MIDI note numbers of active notes and values are their velocities.
 */
export type MutableNoteVelocities = Record<Note, Velocity>

export type NoteVelocities = {
    readonly [K in keyof MutableNoteVelocities]: MutableNoteVelocities[K];
}

interface PianoHook {
    noteVelocities: NoteVelocities
    play: (presses: NoteVelocities, releases: ReadonlySet<number>) => void
}

export const usePiano = (): PianoHook => {
    const [noteVelocities, setNoteVelocities] = useState<NoteVelocities>({})

    const play = (presses: NoteVelocities, releases: ReadonlySet<number>): void => {
        setNoteVelocities(prev => {
            const next: MutableNoteVelocities = { ...prev }

            Object.entries(presses).forEach(([note, velocity]) => {
                next[Number(note)] = velocity
            })

            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            releases.forEach((note) => delete next[note])

            return next
        })
    }

    return { noteVelocities, play }
}
