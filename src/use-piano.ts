import { useState } from 'react'

/**
 * Keys are MIDI note numbers of active notes and values are their velocities.
 */
export type MutableNoteVelocities = Record<number, number>

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
