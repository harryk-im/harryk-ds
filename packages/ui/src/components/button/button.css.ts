import { style, styleVariants } from "@vanilla-extract/css";
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/tokens";

// Button 컴포넌트의 기본 스타일코드에요
export const button = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",

  selectors: {
    "&:hover:not(:disabled)": {
      opacity: 0.8,
    },
    "&:active:not(:disabled)": {
      opacity: 0.6,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.4,
    },
  },
});

// Button 컴포넌트의 variants 스타일 코드예요
export const variants = styleVariants({
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  outline: {
    backgroundColor: colors.white,
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
  },
});

// Button 컴포넌트의 sizes 스타일 코드예요
export const sizes = styleVariants({
  sm: {
    padding: "8px 12px",
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.sm,
  },
  md: {
    padding: "12px 16px",
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.md,
  },
  lg: {
    padding: "16px 20px",
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.lg,
  },
});

// Button 컴포넌트의 스타일 타입이에요
export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;
