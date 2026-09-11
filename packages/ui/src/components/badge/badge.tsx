import React from "react";
import { badgeBackdrop, badgeStyle } from "./badge.css";
import type { BadgeProps } from "./badge.types";

/**
 * 다양한 색상, 스타일, 크기를 선택할 수 있는 뱃지예요.
 *
 * @example
 * ```tsx
 * // 기본 사용법 (blue · fill · md)
 * <Badge>프론트엔드</Badge>
 *
 * // 색상 지정
 * <Badge color="red">오류</Badge>
 *
 * // weak 스타일 (옅은 바닥 위 반투명 색상 레이어)
 * <Badge color="grey" variant="weak">임시 저장</Badge>
 *
 * // 크기 지정
 * <Badge size="xs">NEW</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color = "blue",
      variant = "fill",
      size = "md",
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
      <span {...props} ref={ref} className={badgeClasses}>
        {variant === "weak" && <span className={badgeBackdrop} aria-hidden />}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
