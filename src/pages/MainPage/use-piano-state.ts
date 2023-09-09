import { type Note, type NoteVelocities, type Velocity } from '../../midi-constants'
import { useMemo, useState } from 'react'

type PianoState = Readonly<NoteVelocities>

interface PianoActions {
    readonly press: (note: Note, velocity: Velocity) => void
    readonly release: (note: Note) => void
    readonly clear: () => void
}

export const usePianoState = (): [PianoState, PianoActions] => {
    const [noteVelocities, setNoteVelocities] = useState<Readonly<NoteVelocities>>({})

    const actions = useMemo(() => {
        const press = (note: Note, velocity: Velocity): void => {
            setNoteVelocities(prev => ({ ...prev, [note]: velocity }))
        }

        const release = (note: Note): void => {
            setNoteVelocities(({ [note]: _, ...rest }) => rest)
        }

        const clear = (): void => { setNoteVelocities({}) }

        return { press, release, clear }
    }, [])

    return [noteVelocities, actions]
}
