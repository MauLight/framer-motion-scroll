import { type ReactElement, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'

const imageList = [
    {
        url: 'https://images.unsplash.com/photo-1720766595415-076a2a643a33',
        title: 'Flowers'
    },
    {
        url: 'https://images.unsplash.com/photo-1716630114831-4fcc3236010b',
        title: 'Sea shore'
    },
    {
        url: 'https://images.unsplash.com/photo-1719552444757-03acf6eaa87e',
        title: 'Car'
    },
    {
        url: 'https://images.unsplash.com/photo-1719480489942-29ce70eeaf82',
        title: 'Sunlight'
    },
    {
        url: 'https://images.unsplash.com/photo-1719465580670-7f2ff4a4029f',
        title: 'Subway'
    }
]

const useParallax = (value: MotionValue<number>, distance: number) => {
    return useTransform(value, [0, 1], [-distance, distance])
}

const Image = ({ url }: { url: { url: string, title: string } }): ReactElement => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 300)

    return (
        <section className='relative h-screen flex justify-center items-center perspective-[100px]'>
            <div className='w-screen h-[500px] relative overflow-hidden' ref={ref}>
                <img src={url.url} alt={url.title} className='absolute top-0 left-0 right-0 bottom-0 w-[100%] h-[100%] object-cover' />
            </div>
            <motion.h2 className='absolute left-[calc(50%+220px)] w-[600px] text-8xl text-[#10100e]' style={{ y }}>{`#${url.title}`}</motion.h2>
        </section>
    )
}

const Parallax = (): ReactElement => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div className='relative'>
            {
                imageList.map((url, index) => <Image key={index} url={url} />)
            }
            <motion.div className='fixed z-50 left-0 right-0 h-2 bottom-[100px] bg-[#10100e]' style={{ scaleX }}></motion.div>
        </div>
    )


}

export default Parallax