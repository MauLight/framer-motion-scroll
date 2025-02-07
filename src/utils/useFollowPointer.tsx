import { RefObject, useEffect } from 'react'
import { useMotionValue, useSpring, frame } from 'framer-motion'

const spring = { damping: 10, stiffness: 100, restDelta: 0.001 }

export const useFollowPointer = ( ref: RefObject<HTMLElement> ) => {
    const xPoint = useMotionValue(0)
    const yPoint = useMotionValue(0)
    const x = useSpring(xPoint, spring)
    const y = useSpring(yPoint, spring)

    useEffect(() => {
        if (!ref.current) return
        const handlePointerMove = ({ clientX, clientY } : MouseEvent) => {
            const element = ref.current!
            frame.read(() => {
                xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2),
                yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2)    
            })
        }

        window.addEventListener('pointermove', handlePointerMove)
        return () => window.removeEventListener('pointermove', handlePointerMove)
    }, [])
    return { x, y }
}