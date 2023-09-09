import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { type MidiInputs } from '../midi-constants'
import { useIsMounted } from './use-is-mounted'

/**
 * Loads MIDI inputs and updates the state with them.
 * @param setInputs - State setter for MIDI inputs.
 */
export const useMidiInputsUpdater = (setInputs: Dispatch<SetStateAction<MidiInputs>>): void => {
    const { isMounted, unmount } = useIsMounted()

    useEffect(() => {
        navigator
            .requestMIDIAccess()
            .then(access => {
                if (!isMounted()) return

                access.onstatechange = (event) => {
                    if (!isMounted()) return

                    if (!(event instanceof MIDIConnectionEvent)) return
                    const { port } = event
                    if (!(port instanceof MIDIInput)) return

                    switch (port.state) {
                        case 'connected':
                            setInputs(inputs => ({ ...inputs, [port.id]: port }))
                            break
                        case 'disconnected':
                            setInputs(inputs => {
                                const { [port.id]: _, ...newInputs } = inputs
                                return newInputs
                            })
                            break
                    }
                }

                const newInputs: Record<string, MIDIInput> = {}
                access.inputs.forEach((input, id) => { newInputs[id] = input })
                setInputs(newInputs)
            })
            .catch(console.error)

        return unmount
    }, [setInputs, isMounted, unmount])
}
