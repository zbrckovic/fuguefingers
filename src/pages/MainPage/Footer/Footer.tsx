import React, { type FC, useState } from 'react'
import { Piano } from '../../../components/Piano'
import { KEYBOARD_ASPECT_RATIO } from '../../../components/Piano/dimensions'
import { useResizeObserver } from '../../../hooks/use-resize-observer'
import { type NoteVelocities } from '../../../midi-constants'
import styles from './Footer.module.sass'

interface Props {
    noteVelocities: Readonly<NoteVelocities>
    markedNotes: ReadonlySet<number>
    onPress: (note: number, velocity: number) => void
    onRelease: (note: number) => void
}

export const Footer: FC<Props> = ({ noteVelocities, markedNotes, onPress, onRelease }) => {
    const [width, setWidth] = useState<number>(100)
    const ref = useResizeObserver<HTMLDivElement>(setWidth)

    return <footer className={styles.root}>
        <div ref={ref} style={styles.pianoContainer} >
            <Piano
                width={width}
                height={width / KEYBOARD_ASPECT_RATIO}
                noteVelocities={noteVelocities}
                markedNotes={markedNotes}
                onPress={onPress}
                onRelease={onRelease}
            />
        </div>
    </footer>
}
