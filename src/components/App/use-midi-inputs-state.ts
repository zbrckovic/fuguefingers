import {MidiInputs} from "../../midi-constants"
import {Dispatch, SetStateAction, useCallback, useState} from "react"

interface State {
    readonly midiInputs: Readonly<MidiInputs>
    readonly selectedMidiInputName: string | undefined
}

export const useMidiInputsState = () => {
    const [state, setState] = useState<State>({
        midiInputs: {},
        selectedMidiInputName: undefined
    })

    const setMidiInputs = useCallback<Dispatch<SetStateAction<MidiInputs>>>(dispatch => {
        setState(prevState => {
            const midiInputs = dispatch instanceof Function
                ? dispatch(prevState.midiInputs)
                : dispatch

            const selectedIsValid = prevState.selectedMidiInputName === undefined
                || midiInputs[prevState.selectedMidiInputName] !== undefined
            const selectedMidiInputName = selectedIsValid
                ? prevState.selectedMidiInputName
                : undefined
            return {midiInputs, selectedMidiInputName}
        })
    }, [])

    const setSelectedMidiInputName = useCallback((selectedMidiInputName: string | undefined) => {
        setState(prevState => ({...prevState, selectedMidiInputName}))
    }, [])

    const selectedMidiInput = state.selectedMidiInputName !== undefined
        ? state.midiInputs[state.selectedMidiInputName]
        : undefined

    return {
        ...state,
        selectedMidiInput,
        setMidiInputs,
        setSelectedMidiInputName
    }
}
