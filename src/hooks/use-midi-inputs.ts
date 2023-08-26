import {useIsMounted} from "./misc-hooks"
import {useEffect, useState} from "react"

export const useMidiInputs = () => {
    const {isMounted, unmount} = useIsMounted()

    const [inputs, setInputs] = useState<Record<string, MIDIInput>>({})

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

    return inputs
}
