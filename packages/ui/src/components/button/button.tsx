import React from "react";
import { buttonBackdrop, buttonContent, buttonStyle } from "./button.css";
import type { ButtonProps } from "./button.types";

/**
 * 다양한 색상, 스타일, 크기를 선택할 수 있는 버튼이에요.
 *
 * @example
 * ```tsx
 * // 기본 사용법 (blue · fill · md)
 * <Button>클릭하세요</Button>
 *
 * // 색상 지정
 * <Button color="red">삭제</Button>
 *
 * // weak 스타일 (흰 배경 위 반투명 배경 레이어)
 * <Button color="grey" variant="weak">취소</Button>
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
      type = "button",
      color = "blue",
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
      <button ref={ref} type={type} className={buttonClasses} {...props}>
        {variant === "weak" && <span className={buttonBackdrop} aria-hidden />}
        <span className={buttonContent}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
