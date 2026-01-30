import { motion } from "framer-motion";
import { forwardRef } from "react";
import { createFadeInVariants } from "./fade-in.motion";
import type { FadeInProps } from "./fade-in.types";

/**
 * 부드럽게 나타나는 애니메이션 효과를 주는 컴포넌트예요.
 *
 * @example
 * ```tsx
 * <FadeIn direction="up" distance={30}>
 *   <p>안녕하세요!</p>
 * </FadeIn>
 * ```
 */
export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  (
    {
      children,
      duration = 0.6,
      delay = 0,
      direction = "up",
      distance = 20,
      ...props
    },
    ref
  ) => {
    const variants = createFadeInVariants(direction, distance);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{
          duration,
          delay,
          ease: "easeInOut",
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

FadeIn.displayName = "FadeIn";
