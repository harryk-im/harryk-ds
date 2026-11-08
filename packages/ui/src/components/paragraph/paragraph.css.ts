import { recipe } from "@vanilla-extract/recipes";

import { getTypography, withOpacity } from "../../styles/foundation";
import { COLORS, FONT_WEIGHTS, RADII } from "../../styles/tokens";

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
  black: {
    selectors: {
      "&:hover": { backgroundColor: withOpacity(COLORS.black, 0.15) },
    },
  },
  dark: {
    selectors: { "&:hover": { backgroundColor: COLORS.greyAlpha15[900] } },
  },
  grey: {
    selectors: { "&:hover": { backgroundColor: COLORS.greyAlpha15[600] } },
  },
  blue: {
    selectors: { "&:hover": { backgroundColor: COLORS.blueAlpha15[500] } },
  },
} as const satisfies Record<keyof typeof paragraphColor, unknown>;

export const paragraphLinkRadius = {
  "2xs": { borderRadius: RADII.sm },
  xs: { borderRadius: RADII.sm },
  sm: { borderRadius: RADII.sm },
  md: { borderRadius: RADII.sm },
  lg: { borderRadius: RADII.md },
  xl: { borderRadius: RADII.md },
  "2xl": { borderRadius: RADII.md },
  "3xl": { borderRadius: RADII.md },
} as const satisfies Record<keyof typeof paragraphSize, unknown>;

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
    size: paragraphLinkRadius,
  },
});
