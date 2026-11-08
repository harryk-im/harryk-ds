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
  dark: { color: COLORS.grey[900] },
  grey: { color: COLORS.grey[600] },
  blue: { color: COLORS.blue[500] },
} as const;

export const paragraphLinkHoverColor = {
  black: { selectors: { "&:hover": { color: COLORS.black } } },
  dark: { selectors: { "&:hover": { color: COLORS.black } } },
  grey: { selectors: { "&:hover": { color: COLORS.grey[700] } } },
  blue: { selectors: { "&:hover": { color: COLORS.blue[600] } } },
} as const satisfies Record<keyof typeof paragraphColor, unknown>;

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
  },
  variants: {
    color: paragraphLinkHoverColor,
  },
});
