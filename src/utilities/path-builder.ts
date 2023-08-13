export interface PathBuilder {
    move: (x: number, y: number, absolute?: boolean) => PathBuilder
    line: (x: number, y: number, absolute?: boolean) => PathBuilder
    horizontal: (x: number, absolute?: boolean) => PathBuilder
    vertical: (y: number, absolute?: boolean) => PathBuilder
    close: () => string
    getResult: () => string
}

export const createPathBuilder = (): PathBuilder => {
    let path = ''

    const move = (x: number, y: number, absolute = false): PathBuilder => {
        path += ` ${absolute ? 'M' : 'm'} ${x} ${y}`
        return builder
    }

    const line = (x: number, y: number, absolute = false): PathBuilder => {
        path += ` ${absolute ? 'L' : 'l'} ${x} ${y}`
        return builder
    }

    const horizontal = (x: number, absolute = false): PathBuilder => {
        path += ` ${absolute ? 'H' : 'h'} ${x}`
        return builder
    }

    const vertical = (y: number, absolute = false): PathBuilder => {
        path += ` ${absolute ? 'V' : 'v'} ${y}`
        return builder
    }

    const close = (): string => {
        path += ' z'
        return path
    }

    const getResult = (): string => path

    const builder: PathBuilder = {
        move,
        line,
        horizontal,
        vertical,
        close,
        getResult
    }

    return builder
}
