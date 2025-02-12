import { useRef } from "react"
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion"
import { wrap } from "@motionone/utils"

interface ParallaxProps {
    children: string
    baseVelocity: number
}

const ParallaxText = ({ children, baseVelocity = 100 }: ParallaxProps) => {
    const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy)
  })

    return (
        <div className="whitespace-nowrap overflow-hidden flex flex-nowrap tracking-[-2px] bg-[#ffffff]">
            <motion.div className="uppercase text-8xl flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block mr-[30px]">{children} </span>
                <span className="block mr-[30px]">{children} </span>
                <span className="block mr-[30px]">{children} </span>
                <span className="block mr-[30px]">{children} </span>
            </motion.div>
        </div>
    )
}

export default ParallaxText