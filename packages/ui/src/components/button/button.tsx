import React from "react";
import { buttonStyle } from "./button.css";
import type { ButtonColors, ButtonSizes, ButtonVariants } from "./button.types";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  color?: ButtonColors;
  variant?: ButtonVariants;
  size?: ButtonSizes;
}

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
