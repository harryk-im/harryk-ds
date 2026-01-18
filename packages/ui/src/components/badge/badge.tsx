import React from "react";
import { badgeStyle } from "./badge.css";
import type { BadgeColors, BadgeSizes, BadgeVariants } from "./badge.types";

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /**
   * 뱃지의 색상을 선택해요.
   * @default "primary"
   */
  color?: BadgeColors;

  /**
   * 뱃지의 스타일을 선택해요.
   * @default "fill"
   */
  variant?: BadgeVariants;

  /**
   * 뱃지의 크기를 선택해요.
   * @default "sm"
   */
  size?: BadgeSizes;
}

/**
 * 다양한 색상, 스타일, 크기를 선택할 수 있는 뱃지예요.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Badge>New</Badge>
 *
 * // 색상과 스타일 지정
 * <Badge color="primary" variant="outline">Outline 뱃지</Badge>
 *
 * // 크기 지정
 * <Badge size="lg">큰 뱃지</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color = "primary",
      variant = "fill",
      size = "sm",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const badgeClasses = [badgeStyle({ color, variant, size }), className]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
