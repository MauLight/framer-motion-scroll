import { motion } from 'framer-motion'

const FlipLink = ({ children, href }: { children: string, href: string }) => {
    const DURATION = 0.25
    const STAGGER = 0.025
    return (
        <motion.a
            initial='initial'
            whileHover='hover'
            href={href}
            className="relative block overflow-hidden whitespace-nowrap text-9xl uppercase font-title z-20"
            style={{
                lineHeight: 0.84
            }}
        >
            <div
            >
                {children.split('').map((l, i) => <motion.span
                    className='inline-block'
                    variants={{
                        initial: { y: 0 },
                        hover: { y: '-100%' }
                    }}
                    transition={{
                        duration: DURATION,
                        ease: 'easeInOut',
                        delay: i * STAGGER
                    }}
                    key={i}>{l}</motion.span>)}
            </div>
            <div
                className='absolute inset-0'
            >
                {children.split('').map((l, i) => <motion.span
                    className='inline-block'
                    variants={{
                        initial: { y: '100%' },
                        hover: { y: 0 }
                    }}
                    transition={{
                        duration: DURATION,
                        ease: 'easeInOut',
                        delay: i * STAGGER
                    }}
                    key={i}>{l}</motion.span>)}
            </div>
        </motion.a>
    )
}

const RevealLinks = () => {
    return (
        <section className="grid w-full h-screen place-content-center gap-5 bg-blue-400 px-10 text-gray-800">
            <FlipLink href="/about">Instagram</FlipLink>
            <FlipLink href="/about">Linkedin</FlipLink>
            <FlipLink href="/about">GitHub</FlipLink>
        </section>
    )
}

export default RevealLinks
