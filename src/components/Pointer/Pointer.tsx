import { useRef } from 'react'
import { useFollowPointer } from '../../utils/useFollowPointer'
import { motion } from 'framer-motion'

const Pointer = () => {
  const ref = useRef(null)
  const { x, y } = useFollowPointer(ref)  
  return (
    <div className='absolute h-[4000px] top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
    <motion.div ref={ref} className='w-[200px] h-[200px] rounded-full bg-[#ff0066]' style={{ x, y }}></motion.div>
    </div>
  )
}

export default Pointer
