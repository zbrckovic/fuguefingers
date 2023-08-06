import React, { type FC, useEffect } from 'react'
import { useSheetMusicDisplay } from '../hooks/use-sheet-music-display'

interface Props {
    musicXml?: string
}

export const SheetMusic: FC<Props> = ({ musicXml }) => {
    const [ref, sheetMusicDisplay] = useSheetMusicDisplay<HTMLDivElement>()

    const loadMusicXml = sheetMusicDisplay?.loadMusicXml

    useEffect(() => {
        if (loadMusicXml === undefined || musicXml === undefined) return
        loadMusicXml(musicXml)
    }, [loadMusicXml, musicXml])

    return <div ref={ ref }/>
}
