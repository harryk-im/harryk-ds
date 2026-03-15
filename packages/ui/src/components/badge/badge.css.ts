import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { COLORS, FONT_WEIGHTS, getTypography } from "../../styles";

export const badgeColors = styleVariants({
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
});

export const badgeVariants = styleVariants({
  fill: {},
  outline: {
    backgroundColor: COLORS.white,
  },
  weak: {},
});

export const badgeSizes = styleVariants({
  sm: {
    padding: "2px 4px",
    ...getTypography("xs"),
  },
  md: {
    padding: "4px 8px",
    ...getTypography("sm"),
  },
  lg: {
    padding: "6px 12px",
    ...getTypography("md"),
  },
});

const badgeBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  borderWidth: "1px",
  borderStyle: "solid",
  fontWeight: FONT_WEIGHTS.bold,
  whiteSpace: "nowrap",
});

export const badgeStyle = recipe({
  base: badgeBase,

  variants: {
    color: badgeColors,
    variant: badgeVariants,
    size: badgeSizes,
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
    {
      variants: {
        color: "primary",
        variant: "weak",
      },
      style: {
        backgroundColor: COLORS.blue[200],
        color: COLORS.white,
        borderColor: COLORS.blue[100],
      },
    },
    {
      variants: {
        color: "secondary",
        variant: "weak",
      },
      style: {
        backgroundColor: COLORS.grey[200],
        color: COLORS.grey[800],
        borderColor: COLORS.grey[100],
      },
    },
  ],
});
