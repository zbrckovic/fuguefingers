import {useRef} from 'react'

interface UseMountedHook {
    isMounted: boolean
    unmount: () => void
}

/**
 * This is a hook which tracks whether the component is mounted or not. It is useful for avoiding
 * state updates on unmounted components.
 */
export const useIsMounted = (): UseMountedHook => {
    const isMountedRef = useRef(true)
    const unmount = (): void => {
        isMountedRef.current = false
    }
    return {isMounted: isMountedRef.current, unmount}
}
