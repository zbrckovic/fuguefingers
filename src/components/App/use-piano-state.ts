import {Note, NoteVelocities, Velocity} from "../../midi-constants"
import {useCallback, useState} from "react"

export const usePianoState = () => {
    const [noteVelocities, setNoteVelocities] = useState<Readonly<NoteVelocities>>({})

    const press = useCallback((note: Note, velocity: Velocity) => {
        setNoteVelocities(noteVelocities => ({
            ...noteVelocities,
            [note]: velocity
        }))
    }, [])

    const release = useCallback((note: Note) => {
        setNoteVelocities(noteVelocities => {
            const {[note]: _, ...rest} = noteVelocities
            return rest
        })
    }, [])

    const clear = useCallback(() => setNoteVelocities({}), [])

    return {
        noteVelocities,
        press,
        release,
        clear
    }
}
