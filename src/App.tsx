import React, { type FC } from 'react'
import { SheetMusic } from './components/SheetMusic'
import { Piano } from './components/Piano'
import { usePiano } from './use-piano'

export const App: FC = () => {
    const { noteVelocities } = usePiano()

    return <div>
        <Piano noteVelocities={ noteVelocities }/>
        <SheetMusic/>
    </div>
}
