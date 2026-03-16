import React from "react";
import { buttonStyle } from "./button.css";
import type { ButtonProps } from "./button.types";

/**
 * 다양한 색상, 스타일, 크기를 선택할 수 있는 버튼이에요.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Button>클릭하세요</Button>
 *
 * // 색상과 스타일 지정
 * <Button color="primary" variant="outline">Outline 버튼</Button>
 *
 * // 크기 지정
 * <Button size="lg">큰 버튼</Button>
 *
 * // 비활성화
 * <Button disabled>비활성화된 버튼</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "primary",
      variant = "fill",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const buttonClasses = [buttonStyle({ color, variant, size }), className]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
