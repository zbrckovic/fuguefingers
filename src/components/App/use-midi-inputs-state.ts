import { type MidiInputs } from '../../midi-constants'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'

interface MidiInputsState extends State {
    readonly selectedMidiInput: MIDIInput | undefined
    readonly setMidiInputs: Dispatch<SetStateAction<MidiInputs>>
    readonly setSelectedMidiInputName: (selectedMidiInputName: string | undefined) => void
}

interface State {
    readonly midiInputs: Readonly<MidiInputs>
    readonly selectedMidiInputName: string | undefined
}

export const useMidiInputsState = (): MidiInputsState => {
    const [state, setState] = useState<State>({ midiInputs: {}, selectedMidiInputName: undefined })

    const setMidiInputs = useCallback<Dispatch<SetStateAction<MidiInputs>>>(dispatch => {
        setState(prev => {
            const midiInputs = dispatch instanceof Function
                ? dispatch(prev.midiInputs)
                : dispatch

            const selectedIsValid = prev.selectedMidiInputName === undefined ||
                midiInputs[prev.selectedMidiInputName] !== undefined
            const selectedMidiInputName = selectedIsValid
                ? prev.selectedMidiInputName
                : undefined

            return { midiInputs, selectedMidiInputName }
        })
    }, [])

    const setSelectedMidiInputName = useCallback((selectedMidiInputName: string | undefined) => {
        setState(prev => ({ ...prev, selectedMidiInputName }))
    }, [])

    const selectedMidiInput = state.selectedMidiInputName !== undefined
        ? state.midiInputs[state.selectedMidiInputName]
        : undefined

    return { ...state, setSelectedMidiInputName, selectedMidiInput, setMidiInputs }
}
