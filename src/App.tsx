import React, { type FC } from 'react'
import { SheetMusic } from './components/SheetMusic'
import { Piano } from './components/Piano'
import { usePiano } from './use-piano'
import prelude from 'music-xml/wtk-prelude-1.xml'

export const App: FC = () => {
    const { noteVelocities } = usePiano()

    return <div>
        <SheetMusic musicXml={ prelude }/>
        <Piano noteVelocities={ noteVelocities }/>
    </div>
}
