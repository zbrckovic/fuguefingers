import { type Note, type NoteVelocities, type Velocity } from '../../midi-constants'
import { useCallback, useState } from 'react'

interface PianoState {
    readonly noteVelocities: Readonly<NoteVelocities>
    readonly press: (note: Note, velocity: Velocity) => void
    readonly release: (note: Note) => void
    readonly clear: () => void
}

export const usePianoState = (): PianoState => {
    const [noteVelocities, setNoteVelocities] = useState<Readonly<NoteVelocities>>({})

    const press = useCallback((note: Note, velocity: Velocity) => {
        setNoteVelocities(prev => ({ ...prev, [note]: velocity }))
    }, [])

    const release = useCallback((note: Note) => {
        setNoteVelocities(({ [note]: _, ...rest }) => rest)
    }, [])

    const clear = useCallback(() => { setNoteVelocities({}) }, [])

    return { noteVelocities, press, release, clear }
}
