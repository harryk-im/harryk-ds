import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import {
  COLORS,
  FONT_WEIGHTS,
  getTypography,
  RADII,
  SPACING,
} from "../../styles";

/**
 * 색상 역할별 CSS 변수예요.
 * `buttonColor`가 색상별 토큰을 주입하고, `buttonVariant`·`buttonBackdrop`이 소비해요.
 */
const fillBackground = createVar();
const weakText = createVar();
const weakBackdrop = createVar();

export const buttonColor = {
  blue: {
    vars: {
      [fillBackground]: COLORS.blue[300],
      [weakText]: COLORS.blue[200],
      [weakBackdrop]: COLORS.blueAlpha15[100],
    },
  },
  red: {
    vars: {
      [fillBackground]: COLORS.red[300],
      [weakText]: COLORS.red[200],
      [weakBackdrop]: COLORS.redAlpha15[100],
    },
  },
  grey: {
    vars: {
      [fillBackground]: COLORS.grey[300],
      [weakText]: COLORS.grey[200],
      [weakBackdrop]: COLORS.greyAlpha15[100],
    },
  },
} as const;

export const buttonVariant = {
  fill: {
    backgroundColor: fillBackground,
    color: COLORS.white,
  },
  weak: {
    backgroundColor: COLORS.white,
    color: weakText,
  },
} as const;

export const buttonSize = {
  sm: {
    padding: `${SPACING["2xs"]} ${SPACING.sm}`,
    ...getTypography("sm"),
  },
  md: {
    padding: `${SPACING.xs} ${SPACING.md}`,
    ...getTypography("md"),
  },
  lg: {
    padding: `${SPACING.sm} ${SPACING.lg}`,
    ...getTypography("lg"),
  },
} as const;

export const buttonBase = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: RADII.lg,
  border: "none",
  overflow: "hidden",
  fontWeight: FONT_WEIGHTS.bold,
  cursor: "pointer",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
} as const;

export const buttonStyle = recipe({
  base: buttonBase,
  variants: {
    color: buttonColor,
    variant: buttonVariant,
    size: buttonSize,
  },
});

/**
 * variant = "weak" 전용
 *
 * 버튼 전체를 덮는 반투명 색상 배경 레이어예요.
 * `inset: 0`으로 버튼 영역을 채우고, 부모가 심은 `weakBackdrop` 변수를 상속해요.
 */
export const buttonBackdrop = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundColor: weakBackdrop,
});

/**
 * 배경 레이어 위에 콘텐츠를 올리기 위한 콘텐츠 래퍼예요.
 * `position: relative` + DOM 순서(배경 뒤, 콘텐츠 앞)로 z-index 없이 위에 쌓여요.
 */
export const buttonContent = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});
