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

export const badgeColor = {
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

export const badgeVariant = {
  fill: {
    backgroundColor: fillBackground,
    color: COLORS.white,
  },
  weak: {
    // 불투명한 바닥 레이어예요. 위에 얹는 반투명 레이어(badgeBackdrop)와 합쳐져
    // 어떤 배경 위에 놓여도 같은 색·같은 대비로 보여요.
    backgroundColor: COLORS.lightGrey[100],
    color: weakText,
  },
} as const;

export const badgeSize = {
  xs: {
    padding: `${SPACING["3xs"]} ${SPACING["2xs"]}`,
    ...getTypography("2xs"),
  },
  sm: {
    padding: `${SPACING["3xs"]} ${SPACING["2xs"]}`,
    ...getTypography("xs"),
  },
  md: {
    padding: `${SPACING["3xs"]} ${SPACING.xs}`,
    ...getTypography("sm"),
  },
  lg: {
    padding: `${SPACING["3xs"]} ${SPACING.xs}`,
    ...getTypography("md"),
  },
} as const;

export const badgeBase = {
  position: "relative",
  // badgeBackdrop의 zIndex: -1 을 이 뱃지 안에 가둬요.
  // 지우면 배경 레이어가 루트 배경 뒤로 숨고, transform 애니메이션 중에만
  // 잠깐 보이는 식으로 조용히 깨져요.
  isolation: "isolate",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: RADII.full,
  fontWeight: FONT_WEIGHTS.bold,
  whiteSpace: "nowrap",
} as const;

export const badgeStyle = recipe({
  base: badgeBase,
  variants: {
    color: badgeColor,
    variant: badgeVariant,
    size: badgeSize,
  },
});

/**
 * variant = "weak" 전용
 *
 * 뱃지 전체를 덮는 반투명 색상 배경 레이어예요.
 * `inset: 0`으로 뱃지 영역을 채우고, 부모가 심은 `weakBackdrop` 변수를 상속해요.
 * `zIndex: -1`로 루트 배경 위·글자 아래에 그려져서 콘텐츠 래퍼 없이도 글자를 가리지 않아요.
 */
export const badgeBackdrop = style({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  borderRadius: "inherit",
  pointerEvents: "none",
  backgroundColor: weakBackdrop,
});
