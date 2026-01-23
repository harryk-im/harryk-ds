const primary = "#678EDC";
const black = "#000000";
const white = "#FFFFFF";
const typography = "#1D1D1D";

export const COLORS = {
  primary,
  black,
  white,
  typography,
  gray: {
    900: typography,
    600: "#515151",
    300: "#E1E1E1",
  },
  blue: {
    900: "#466DFE",
    600: primary,
  },
  red: {
    600: "#FF6B6B",
  },
  yellow: {
    600: "#FFD93D",
  },
  green: {
    600: "#A8E6CF",
  },
} as const;
