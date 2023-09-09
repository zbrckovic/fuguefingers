import { type MidiInputs } from '../../midi-constants'
import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'

interface MidiInputsState extends State {
    readonly selectedMidiInput: MIDIInput | undefined
}

interface MidiInputsActions {
    readonly setMidiInputs: Dispatch<SetStateAction<MidiInputs>>
    readonly setSelectedMidiInputName: (selectedMidiInputName: string | undefined) => void
}

interface State {
    readonly midiInputs: Readonly<MidiInputs>
    readonly selectedMidiInputName: string | undefined
}

export const useMidiInputsState = (): [MidiInputsState, MidiInputsActions] => {
    const [state, setState] = useState<State>({ midiInputs: {}, selectedMidiInputName: undefined })

    const actions = useMemo(() => {
        const setMidiInputs: Dispatch<SetStateAction<MidiInputs>> = dispatch => {
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
        }

        const setSelectedMidiInputName = (selectedMidiInputName: string | undefined): void => {
            setState(prev => ({ ...prev, selectedMidiInputName }))
        }

        return { setMidiInputs, setSelectedMidiInputName }
    }, [])

    const selectedMidiInput = state.selectedMidiInputName !== undefined
        ? state.midiInputs[state.selectedMidiInputName]
        : undefined

    return [{ ...state, selectedMidiInput }, actions]
}
