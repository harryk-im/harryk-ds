import { recipe } from "@vanilla-extract/recipes";

import { COLORS, FONT_WEIGHTS, getTypography } from "../../styles";

export const buttonColors = {
  primary: {
    backgroundColor: COLORS.blue[300],
    color: COLORS.white,
  },
  secondary: {
    backgroundColor: COLORS.grey[200],
    color: COLORS.grey[800],
  },
} as const;

export const buttonVariants = {
  fill: {
    border: "none",
  },
  outline: {
    backgroundColor: "transparent",
    border: "2px solid transparent",
  },
} as const;

export const buttonSizes = {
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
} as const;

export const buttonBase = {
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
} as const;

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
