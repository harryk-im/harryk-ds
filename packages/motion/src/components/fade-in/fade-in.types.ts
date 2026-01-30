import type { HTMLMotionProps } from "framer-motion";
import type React from "react";

/**
 * FadeIn 컴포넌트가 나타날 방향을 정의해요.
 * - `up`: 아래에서 위로
 * - `down`: 위에서 아래로
 * - `left`: 오른쪽에서 왼쪽으로
 * - `right`: 왼쪽에서 오른쪽으로
 * - `none`: 제자리에서 나타남
 */
export type FadeInDirection = "up" | "down" | "left" | "right" | "none";

/**
 * FadeIn 컴포넌트의 Props예요.
 * framer-motion의 HTMLMotionProps를 상속받아 div의 모든 모션 속성을 지원해요.
 */
export interface FadeInProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "exit"> {
  children: React.ReactNode;
  /**
   * 애니메이션 지속 시간(초)이에요.
   * @default 0.6
   */
  duration?: number;
  /**
   * 애니메이션 시작 전 지연 시간(초)이에요.
   * @default 0
   */
  delay?: number;
  /**
   * 나타날 방향이에요.
   * @default "up"
   */
  direction?: FadeInDirection;
  /**
   * 이동할 거리(px)예요.
   * @default 20
   */
  distance?: number;
}
