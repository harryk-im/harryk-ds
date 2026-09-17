import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import {
  COLORS,
  FONT_WEIGHTS,
  getTypography,
  RADII,
  SPACING,
} from "../../styles";

const fillBackground = createVar();
const weakText = createVar();
const weakBackdrop = createVar();

export const buttonColor = {
  blue: {
    vars: {
      [fillBackground]: COLORS.blue[500],
      [weakText]: COLORS.blue[600],
      [weakBackdrop]: COLORS.blueAlpha15[300],
    },
  },
  red: {
    vars: {
      [fillBackground]: COLORS.red[500],
      [weakText]: COLORS.red[600],
      [weakBackdrop]: COLORS.redAlpha15[300],
    },
  },
  grey: {
    vars: {
      [fillBackground]: COLORS.grey[500],
      [weakText]: COLORS.grey[600],
      [weakBackdrop]: COLORS.greyAlpha15[300],
    },
  },
} as const;

export const buttonVariant = {
  fill: {
    backgroundColor: fillBackground,
    color: COLORS.white,
  },
  weak: {
    backgroundColor: COLORS.lightGrey[100],
    color: weakText,
  },
} as const;

export const buttonSize = {
  sm: {
    padding: `${SPACING["2xs"]} ${SPACING.sm}`,
    borderRadius: RADII.md,
    ...getTypography("sm"),
  },
  md: {
    padding: `${SPACING.xs} ${SPACING.md}`,
    borderRadius: RADII.lg,
    ...getTypography("md"),
  },
  lg: {
    padding: `${SPACING.sm} ${SPACING.lg}`,
    borderRadius: RADII.xl,
    ...getTypography("lg"),
  },
} as const;

export const buttonBase = {
  position: "relative",
  // buttonBackdrop의 zIndex: -1 을 이 버튼 안에 가둬요.
  // 지우면 배경 레이어가 루트 배경 뒤로 숨고, transform 애니메이션 중에만
  // 잠깐 보이는 식으로 조용히 깨져요.
  isolation: "isolate",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  fontWeight: FONT_WEIGHTS.bold,
  cursor: "pointer",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
    '&[aria-busy="true"]': {
      cursor: "wait",
    },
  },
} as const;

export const buttonStyle = recipe({
  base: buttonBase,
  variants: {
    color: buttonColor,
    variant: buttonVariant,
    size: buttonSize,
    fullWidth: {
      true: { width: "100%" },
    },
  },
});

/**
 * variant = "weak" 전용
 *
 * 버튼 전체를 덮는 반투명 색상 배경 레이어예요.
 * `inset: 0`으로 버튼 영역을 채우고, 부모가 심은 `weakBackdrop` 변수를 상속해요.
 * `zIndex: -1`로 루트 배경 위·글자 아래에 그려져서 콘텐츠 래퍼 없이도 글자를 가리지 않아요.
 */
export const buttonBackdrop = style({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  borderRadius: "inherit",
  pointerEvents: "none",
  backgroundColor: weakBackdrop,
});
