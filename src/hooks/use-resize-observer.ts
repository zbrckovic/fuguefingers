import { type RefObject, useLayoutEffect, useRef } from 'react'

type Callback = (width: number, height: number) => void

export const useResizeObserver = <T extends HTMLElement> (cb: Callback): RefObject<T> => {
    const ref = useRef<T>(null)

    useLayoutEffect(() => {
        const element = ref.current
        if (element === undefined || element === null) return

        const resizeObserver = new ResizeObserver(([entry]) => {
            const [size] = entry.contentBoxSize
            const width = size.inlineSize
            const height = size.blockSize
            cb(width, height)
        })

        resizeObserver.observe(element)

        return () => { resizeObserver.unobserve(element) }
    }, [cb])

    return ref
}
