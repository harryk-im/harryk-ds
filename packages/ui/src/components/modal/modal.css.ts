import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { COLORS, FONT_WEIGHTS, getTypography, withOpacity } from "../../styles";

export const overlayStyle = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: withOpacity(COLORS.black, 0.5),
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const modalSize = {
  sm: { maxWidth: "360px" },
  md: { maxWidth: "540px" },
  lg: { maxWidth: "720px" },
} as const;

export const modalContentBase = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "calc(100% - 32px)",
  maxHeight: "90dvh",
  backgroundColor: COLORS.white,
  borderRadius: "8px",
  overflow: "hidden",
} as const;

export const modalContentStyle = recipe({
  base: modalContentBase,
  variants: {
    size: modalSize,
  },
  defaultVariants: {
    size: "md",
  },
});

export const modalHeaderStyle = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 24px",
  ...getTypography("lg"),
  fontWeight: FONT_WEIGHTS.bold,
  color: COLORS.black,
});

export const closeButtonStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: COLORS.grey[600],
  ...getTypography("md"),
  borderRadius: "8px",

  ":hover": {
    backgroundColor: COLORS.grey[100],
  },
});

export const modalBodyStyle = style({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  padding: "24px",
  ...getTypography("md"),
  color: COLORS.black,
});

export const modalFooterStyle = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
  padding: "16px 24px",
});
