import { recipe } from "@vanilla-extract/recipes";

import { COLORS, FONT_WEIGHTS, getTypography } from "../../styles";

export const buttonColor = {
  primary: {
    backgroundColor: COLORS.blue[300],
    color: COLORS.white,
    borderColor: COLORS.blue[300],
  },
  secondary: {
    backgroundColor: COLORS.grey[200],
    color: COLORS.grey[800],
    borderColor: COLORS.grey[200],
  },
} as const;

export const buttonVariant = {
  fill: {},
  outline: {
    backgroundColor: COLORS.white,
  },
} as const;

export const buttonSize = {
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
  boxSizing: "border-box",
  borderRadius: "8px",
  border: "2px solid",
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
    color: buttonColor,
    variant: buttonVariant,
    size: buttonSize,
  },
  compoundVariants: [
    {
      variants: {
        color: "primary",
        variant: "outline",
      },
      style: {
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
        color: COLORS.grey[800],
        borderColor: COLORS.grey[200],
      },
    },
  ],
});
