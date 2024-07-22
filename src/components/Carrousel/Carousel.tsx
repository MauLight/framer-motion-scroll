import { Dispatch, SetStateAction, useEffect, useState, type ReactElement } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const imageList = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1721519342334-1296861728bd'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1721292181759-60482c13fe98'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1721204933122-8b9f5c4d0b5d'
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1721075142071-93e08d3d28e1'
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1720743193866-485bed5010e9'
    },
]

const SECOND = 1000
const AUTO_DELAY = 10 * SECOND
const DRAG_BUFFER = 50
const SPRING_OPTIONS = { type: 'spring', mass: 3, damping: 80, stiffness: 300 }

const Dots = ({ imgIndex, setImgIndex }: { imgIndex: number, setImgIndex: Dispatch<SetStateAction<number>> }) => (
    <div className="flex w-full justify-center gap-x-10">
        {
            imageList.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-3 h-3 rounded-full bg-neutral-50 outline outline-offset-4 transition-colors ${imgIndex === i ? 'bg-neutral-50 outline-neutral-50' : 'bg-neutral-600 outline-neutral-600'}`}
                />
            ))
        }
    </div>
)

const Images = (): ReactElement => {
    const [imgIndex, setImgIndex] = useState(0)
    const [dragging, setDragging] = useState(false)

    const dragX = useMotionValue(0)

    const onDragStart = () => {
        setDragging(true)
    }

    const onDragEnd = () => {
        setDragging(false)
        const x = dragX.get()
        if (x <= -DRAG_BUFFER && imgIndex < imageList.length - 1) {
            setImgIndex((prev) => (prev + 1))
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((prev) => (prev - 1))
        }
    }

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get()
            if (x === 0) setImgIndex((prev) => prev === imageList.length - 1 ? 0 : prev + 1)
        }, AUTO_DELAY)
        return () => clearInterval(intervalRef)
    }, [])

    return (
        <div className='flex flex-col gap-y-10'>
            <motion.div
                drag='x'
                dragTransition={{ bounceDamping: 10, bounceStiffness: 100 }}
                transition={SPRING_OPTIONS}
                dragConstraints={{ left: 0, right: 0 }}
                style={{
                    x: dragX
                }}
                animate={{ translateX: `-${imgIndex * 100}%` }}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                className="flex items-center cursor-grab active:cursor-grabbing">
                {imageList.map((image, i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: imgIndex === i ? 0.95 : 0.85 }}
                        transition={SPRING_OPTIONS}
                        className='aspect-video w-screen shrink-0 rounded-[10px] bg-neutral-800 object-cover'
                        style={{ backgroundImage: `url(${image.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    />
                ))}
            </motion.div>
            <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
        </div>
    )
}

const Carousel = (): ReactElement => {
    return (
        <div className='relative w-screen min-h-screen overflow-hidden bg-[#10100e] py-10'>
            <Images />
        </div>
    )
}

export default Carousel
