import { type RefObject, useLayoutEffect, useRef } from 'react'

export const useResizeObserver = <T extends HTMLElement> (): RefObject<T> => {
    const ref = useRef<T>(null)

    useLayoutEffect(() => {
        const element = ref.current
        if (element === undefined || element === null) return

        const resizeObserver = new ResizeObserver(() => {
            console.log('resize')
        })

        resizeObserver.observe(element)

        return () => { resizeObserver.unobserve(element) }
    }, [])

    return ref
}
