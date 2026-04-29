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
  md: { maxWidth: "720px" },
  lg: { maxWidth: "1024px" },
} as const;

export const modalContentBase = {
  position: "relative" as const,
  width: "calc(100% - 32px)",
  backgroundColor: COLORS.white,
  borderRadius: "8px",
  border: `1px solid ${COLORS.grey[200]}`,
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
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 24px",
  borderBottom: `1px solid ${COLORS.grey[200]}`,
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
  padding: "24px",
  ...getTypography("md"),
  color: COLORS.black,
});

export const modalFooterStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
  padding: "16px 24px",
  borderTop: `1px solid ${COLORS.grey[200]}`,
});
