import { motion, useScroll, useSpring } from 'framer-motion'
import { ReactElement, useRef } from 'react'
import Parallax from './components/Parallax/Parallax'
import ParallaxText from './components/Parallax/ParallaxText'

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
  const ref = useRef(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  return (
    <div className="w-screen justify-center items-center flex flex-col gap-y-20 px-20 py-10">
      <motion.div className='fixed top-0 left-0 right-0 origin-[0%] h-2 bg-red-500' style={{ scaleX }}></motion.div>
      {/* <svg className='fixed top-[20px] left-[20px] -rotate-90' id="progress" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="indicator"
          style={{ pathLength: scrollXProgress }}
        />
      </svg>
      <h1 className="text-5xl text-gray-800">Hello World!</h1>
      <div ref={ref} className="w-[1000px] h-[600px] flex gap-x-10 overflow-x-auto">
        {
          Array(10).fill(0).map((_) => <div className='min-w-[200px] h-full bg-gray-800'></div>)
        }
      </div>
      <div className="w-full flex flex-col gap-y-[400px] items-center">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className='rounded-full w-[200px] h-[200px] bg-[#10100e]'>
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
