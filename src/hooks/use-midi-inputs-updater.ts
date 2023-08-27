import {useIsMounted} from "./misc-hooks"
import {Dispatch, SetStateAction, useEffect} from "react"
import {MidiInputs} from "../midi-constants"

/**
 * Loads MIDI inputs and updates the state with them.
 * @param setInputs - State setter for MIDI inputs.
 */
export const useMidiInputsUpdater = (setInputs: Dispatch<SetStateAction<MidiInputs>>) => {
    const {isMounted, unmount} = useIsMounted()

    useEffect(() => {
        navigator.requestMIDIAccess().then(access => {
            if (!isMounted) return

            access.onstatechange = (event) => {
                if (!isMounted) return

                if (!(event instanceof MIDIConnectionEvent)) return
                const {port} = event
                if (!(port instanceof MIDIInput)) return

                switch (port.state) {
                    case "connected":
                        setInputs(inputs => ({...inputs, [port.id]: port}))
                        break
                    case "disconnected":
                        setInputs(inputs => {
                            const newInputs = {...inputs}
                            delete newInputs[port.id]
                            return newInputs
                        })
                        break
                }
            }

            const newInputs: Record<string, MIDIInput> = {}
            access.inputs.forEach((input, id) => newInputs[id] = input)
            setInputs(newInputs)
        })

        return unmount
    }, [])
}
