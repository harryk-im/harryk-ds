import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const buttonColors = styleVariants({
  primary: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  secondary: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },
});

export const buttonVariants = styleVariants({
  fill: {
    border: "none",
  },
  outline: {
    backgroundColor: "transparent",
    border: "2px solid transparent",
  },
});

export const buttonSizes = styleVariants({
  sm: {
    padding: "8px 16px",
    fontSize: "14px",
  },
  md: {
    padding: "12px 24px",
    fontSize: "16px",
  },
  lg: {
    padding: "16px 32px",
    fontSize: "18px",
  },
});

export const buttonStyle = recipe({
  base: {
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",

    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },

  variants: {
    color: buttonColors,
    variant: buttonVariants,
    size: buttonSizes,
  },

  compoundVariants: [
    {
      variants: {
        color: "primary",
        variant: "outline",
      },
      style: {
        backgroundColor: "transparent",
        color: "#3b82f6",
        borderColor: "#3b82f6",
      },
    },
    {
      variants: {
        color: "secondary",
        variant: "outline",
      },
      style: {
        backgroundColor: "transparent",
        color: "#374151",
        borderColor: "#374151",
      },
    },
  ],
});
