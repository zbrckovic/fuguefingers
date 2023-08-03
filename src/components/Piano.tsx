import React, { type FC } from 'react'
import { type NoteVelocities } from '../use-piano'

interface Props {
    noteVelocities: NoteVelocities
}

export const Piano: FC<Props> = ({ noteVelocities }) => {
    return <div>Piano</div>
}
