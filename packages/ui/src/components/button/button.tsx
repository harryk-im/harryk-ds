import React from "react";
import { buttonBackdrop, buttonContent, buttonStyle } from "./button.css";
import type { ButtonProps } from "./button.types";

/**
 * 다양한 색상, 스타일, 크기를 선택할 수 있는 버튼이에요.
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
