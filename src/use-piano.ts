import {useCallback, useState} from "react"
import {type Note, type Velocity} from "./midi-constants"

/**
 * Keys are MIDI note numbers of active notes and values are their velocities.
 */
export type MutableNoteVelocities = Record<Note, Velocity>

export type NoteVelocities = {
    readonly [K in keyof MutableNoteVelocities]: MutableNoteVelocities[K];
}

interface PianoHook {
    noteVelocities: NoteVelocities
    play: (presses?: NoteVelocities, releases?: ReadonlySet<number>) => void
}

export const usePiano = (): PianoHook => {
    const [noteVelocities, setNoteVelocities] = useState<NoteVelocities>({})

    const play = useCallback((presses?: NoteVelocities, releases?: ReadonlySet<number>): void => {
        setNoteVelocities(prevState => {
            const nextState: MutableNoteVelocities = {...prevState}

            if (presses !== undefined) {
                Object.entries(presses).forEach(([note, velocity]) => {
                    nextState[Number(note)] = velocity
                })
            }

            releases?.forEach((note) => delete nextState[note])

            return nextState
        })
    }, [])

    return {noteVelocities, play}
}
