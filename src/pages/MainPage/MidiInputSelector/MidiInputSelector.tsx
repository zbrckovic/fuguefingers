import React, { type FC } from 'react'
import { type MidiInputs } from '../../../midi-constants'
import styles from './MidiInputSelector.module.sass'

interface Props {
    /** Selected midi input name. */
    value?: string
    /** Called with midi input name when midi input is selected. */
    onChange: (name: string) => void
    midiInputs: MidiInputs
}

export const MidiInputSelector: FC<Props> = ({ value, onChange, midiInputs }) =>
    <select
        className={styles.root}
        value={value}
        onChange={({ target }) => { onChange(target.value) }}>
        <option value={'/'}/>
        {
            Object.entries(midiInputs).map(([id, input]) =>
                <option key={id} value={id}>
                    {input.name}
                </option>
            )
        }
    </select>
