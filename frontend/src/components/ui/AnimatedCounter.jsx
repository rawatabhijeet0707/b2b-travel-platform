import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion'

export default function AnimatedCounter({ value, duration = 2, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(0)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    if (inView) {
      motionValue.set(value)
    }
  }, [inView, value, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      setDisplay(Math.floor(latest))
    })
  }, [spring])

  return (
    <motion.span ref={ref}>
      {prefix}{display.toLocaleString('en-IN')}{suffix}
    </motion.span>
  )
}
