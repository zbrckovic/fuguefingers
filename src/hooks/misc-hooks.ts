import { useCallback, useRef } from 'react'

interface UseMountedHook {
    isMounted: () => boolean
    unmount: () => void
}

/**
 * This is a hook which tracks whether the component is mounted or not. It is useful for avoiding
 * state updates on unmounted components.
 */
export const useIsMounted = (): UseMountedHook => {
    const isMountedRef = useRef(true)

    const isMounted = useCallback((): boolean => isMountedRef.current, [])
    const unmount = useCallback((): void => { isMountedRef.current = false }, [])

    return { isMounted, unmount }
}
