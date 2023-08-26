import {MidiCommand, Note} from "../midi-constants"
import {useIsMounted} from "./misc-hooks"
import {useEffect} from "react"

export const useMidiListener = (
    input: MIDIInput | undefined,
    press: (node: Note, velocity: number) => void,
    release: (note: Note) => void
) => {
    const {isMounted, unmount} = useIsMounted()

    useEffect(() => {
        if (input === undefined) return
        console.log("Listening to MIDI input", input.name)

        input.onmidimessage = (event) => {
            if (!isMounted) return

            if (!(event instanceof MIDIMessageEvent)) return

            const status = event.data[0]
            const note = event.data[1]
            const velocity = event.data[2]

            const ch = status & 0x0F
            const command = status & 0xF0

            switch (command) {
                case MidiCommand.NOTE_ON:
                    press(note, velocity)
                    break
                case MidiCommand.NOTE_OFF:
                    release(note)
                    break
            }
        }

        return unmount
    }, [input])
}
