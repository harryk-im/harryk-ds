import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { COLORS, FONT_WEIGHTS, getTypography } from "../../styles";

export const buttonColors = styleVariants({
  primary: {
    backgroundColor: COLORS.blue[300],
    color: COLORS.white,
  },
  secondary: {
    backgroundColor: COLORS.grey[200],
    color: COLORS.grey[800],
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
    ...getTypography("sm"),
  },
  md: {
    padding: "12px 24px",
    ...getTypography("md"),
  },
  lg: {
    padding: "16px 32px",
    ...getTypography("lg"),
  },
});

const buttonBase = style({
  borderRadius: "8px",
  fontWeight: FONT_WEIGHTS.bold,
  cursor: "pointer",
  transition: "all 0.1s ease-in-out",
  outline: "none",

  ":hover": {
    opacity: 0.8,
  },

  ":active": {
    transform: "scale(0.96)",
  },

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
    "&:disabled:hover": {
      opacity: 0.6,
    },
    "&:disabled:active": {
      transform: "none",
    },
  },
});

export const buttonStyle = recipe({
  base: buttonBase,

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
        color: COLORS.blue[300],
        borderColor: COLORS.blue[300],
      },
    },
    {
      variants: {
        color: "secondary",
        variant: "outline",
      },
      style: {
        backgroundColor: "transparent",
        color: COLORS.grey[800],
        borderColor: COLORS.grey[200],
      },
    },
  ],
});
