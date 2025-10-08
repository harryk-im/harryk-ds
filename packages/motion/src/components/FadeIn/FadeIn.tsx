import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'
import React from 'react'

export interface FadeInProps
  extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'exit'> {
  children: React.ReactNode
  duration?: number
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 0.6,
  delay = 0,
  direction = 'up',
  distance = 20,
  ...props
}) => {
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 }
      case 'down':
        return { y: -distance, opacity: 0 }
      case 'left':
        return { x: distance, opacity: 0 }
      case 'right':
        return { x: -distance, opacity: 0 }
      case 'none':
        return { opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const getFinalTransform = () => {
    return { x: 0, y: 0, opacity: 1 }
  }

  return (
    <motion.div
      initial={getInitialTransform()}
      animate={getFinalTransform()}
      exit={getInitialTransform()}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
