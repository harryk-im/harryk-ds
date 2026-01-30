import type { Variants } from "framer-motion";
import type { FadeInDirection } from "./fade-in.types";

/**
 * 방향별 초기 위치 및 투명도 값을 정의한 토큰 객체예요.
 * distance 값을 주입받아 동적으로 값을 생성해요.
 */
export const getInitialVariant = (
  direction: FadeInDirection,
  distance: number
) => {
  const directions = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 },
    none: { opacity: 0 },
  };

  return directions[direction];
};

/**
 * FadeIn 컴포넌트의 애니메이션 Variants를 생성하는 함수예요.
 */
export const createFadeInVariants = (
  direction: FadeInDirection,
  distance: number
): Variants => {
  return {
    hidden: getInitialVariant(direction, distance),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
    },
  };
};
