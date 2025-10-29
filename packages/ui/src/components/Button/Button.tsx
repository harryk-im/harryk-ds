import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import type { ButtonSize, ButtonVariant } from "./Button.css";
import { button, sizes, variants } from "./Button.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref
  ) => {
    const buttonClasses = [button, variants[variant], sizes[size], className]
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
