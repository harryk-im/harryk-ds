import { recipe } from "@vanilla-extract/recipes";

import { getTypography } from "../../styles/foundation";
import { COLORS, FONT_WEIGHTS } from "../../styles/tokens";

export const paragraphSize = {
  "2xs": getTypography("2xs"),
  xs: getTypography("xs"),
  sm: getTypography("sm"),
  md: getTypography("md"),
  lg: getTypography("lg"),
  xl: getTypography("xl"),
  "2xl": getTypography("2xl"),
  "3xl": getTypography("3xl"),
} as const;

export const paragraphColor = {
  black: { color: COLORS.black },
  grey: { color: COLORS.grey[900] },
  lightGrey: { color: COLORS.grey[800] },
  blue: { color: COLORS.blue[300] },
} as const;

export const paragraphWeight = {
  bold: { fontWeight: FONT_WEIGHTS.bold },
  normal: { fontWeight: FONT_WEIGHTS.normal },
} as const;

export const paragraphStyle = recipe({
  base: {
    margin: 0,
    padding: 0,
  },
  variants: {
    size: paragraphSize,
    color: paragraphColor,
    weight: paragraphWeight,
  },
});

export const paragraphLinkStyle = recipe({
  base: {
    textDecoration: "underline",
    cursor: "pointer",
    ":hover": {
      backgroundColor: COLORS.grey[100],
      opacity: 0.8,
    },
  },
});
