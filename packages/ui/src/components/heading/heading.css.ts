import { recipe } from "@vanilla-extract/recipes";

import { getTypography } from "../../styles/foundation";
import { COLORS, FONT_WEIGHTS } from "../../styles/tokens";

export const headingSize = {
  "2xs": getTypography("2xs"),
  xs: getTypography("xs"),
  sm: getTypography("sm"),
  md: getTypography("md"),
  lg: getTypography("lg"),
  xl: getTypography("xl"),
  "2xl": getTypography("2xl"),
  "3xl": getTypography("3xl"),
} as const;

export const headingColor = {
  black: { color: COLORS.black },
  grey: { color: COLORS.grey[800] },
  lightGrey: { color: COLORS.grey[600] },
} as const;

export const headingWeight = {
  bold: { fontWeight: FONT_WEIGHTS.bold },
  normal: { fontWeight: FONT_WEIGHTS.normal },
} as const;

export const headingAlign = {
  left: { textAlign: "left" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },
} as const;

export const headingStyle = recipe({
  base: {
    margin: 0,
    padding: 0,
    display: "block",
  },
  variants: {
    size: headingSize,
    color: headingColor,
    weight: headingWeight,
    align: headingAlign,
  },
  defaultVariants: {
    color: "black",
    weight: "bold",
    align: "left",
  },
});
