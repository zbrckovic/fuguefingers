import { useEffect } from 'react'
import { MidiCommand, type Note } from '../midi-constants'
import { useIsMounted } from './use-is-mounted'

/**
 * Listens to MIDI input and calls the appropriate callback when a note is pressed or released.
 * @param input - MIDI input to listen to.
 * @param press - Callback to call when a note is pressed.
 * @param release - Callback to call when a note is released.
 */
export const useMidiInputListener = (
    input: MIDIInput | undefined,
    press: (node: Note, velocity: number) => void,
    release: (note: Note) => void
): void => {
    const { isMounted, unmount } = useIsMounted()

    useEffect(() => {
        if (input === undefined) return
        console.log('Listening to MIDI input', input.name)

        input.onmidimessage = (event) => {
            if (!isMounted()) return

            if (!(event instanceof MIDIMessageEvent)) return

            const status = event.data[0]
            const note = event.data[1]
            const velocity = event.data[2]

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
    }, [input, press, release, isMounted, unmount])
}
