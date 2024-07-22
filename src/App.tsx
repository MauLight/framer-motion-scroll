import { motion, useScroll, useSpring } from 'framer-motion'
import { ReactElement, useRef, useState } from 'react'
import Parallax from './components/Parallax/Parallax'
import ParallaxText from './components/Parallax/ParallaxText'
import Pointer from './components/Pointer/Pointer'
import { useFollowPointer } from './utils/useFollowPointer'
import RevealLinks from './components/revealLinks/RevealLinks'
import Carousel from './components/Carrousel/Carousel'

const Item = (): ReactElement => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start']
  })
  return (
    <div ref={ref} className='flex gap-x-10'>
      <svg className='sticky top-0 w-[80px] h-[80px] m-0 p-0' id="progress" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="indicator"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <div className="flex w-[200px] h-[300px] bg-gray-600 border"></div>
    </div>
  )
}

const App = () => {
  const [isVisible, setIsVisible] = useState(true)
  const ref = useRef(null)
  const { x, y } = useFollowPointer(ref)
  return (
    <div className="w-screen justify-center items-center flex flex-col gap-y-20 px-20 py-10">
      <RevealLinks />
      <Carousel />
      <motion.div ref={ref} className='w-[200px] h-[200px] rounded-full bg-[#ff0066]' style={{ x, y }}></motion.div>
      <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      </div>
      <motion.div
        onClick={() => { setIsVisible(!isVisible); console.log(isVisible) }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: 1 }}
        transition={{
          duration: 1.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className='z-50 rounded-full w-[200px] h-[200px] bg-[#10100e]'>
      </motion.div>
      <Parallax />
      <div className="flex relative">
        <section className='w-screen relative py-[85vh] overflow-hidden'>
          <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
          <ParallaxText baseVelocity={5}>Velocity Scroll Short</ParallaxText>
        </section>
        <img className='absolute top-0 -z-10 w-screen h-full object-cover' src='https://images.unsplash.com/photo-1721057911005-203fc357ba22' />
      </div>
    </div>
  )
}

export default App
