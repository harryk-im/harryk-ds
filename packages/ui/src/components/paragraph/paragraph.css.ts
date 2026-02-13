import { recipe } from "@vanilla-extract/recipes";
import { getTypography } from "../../styles/foundation";
import { COLORS, FONT_WEIGHTS } from "../../styles/tokens";

export const paragraphStyle = recipe({
  base: {
    margin: 0,
    padding: 0,
  },
  variants: {
    size: {
      xs: getTypography("xs"),
      sm: getTypography("sm"),
      md: getTypography("md"),
      lg: getTypography("lg"),
      xl: getTypography("xl"),
      "2xl": getTypography("2xl"),
    },
    color: {
      black: { color: COLORS.black },
      grey: { color: COLORS.grey[900] },
      lightGrey: { color: COLORS.grey[800] },
      blue: { color: COLORS.blue[300] },
    },
    bold: {
      true: { fontWeight: FONT_WEIGHTS.bold },
      false: { fontWeight: FONT_WEIGHTS.normal },
    },
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
