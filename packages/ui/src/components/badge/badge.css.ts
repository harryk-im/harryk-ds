import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { COLORS, FONT_SIZES, FONT_WEIGHTS } from "../../styles";

/**
 * 뱃지의 색상 토큰이에요.
 * primary와 secondary 두 가지 색상을 제공해요.
 */
export const badgeColors = styleVariants({
  /** 주요 정보에 사용하는 색상이에요. */
  primary: {
    backgroundColor: COLORS.blue[600],
    color: COLORS.white,
    borderColor: COLORS.blue[600],
  },
  /** 보조 정보에 사용하는 색상이에요. */
  secondary: {
    backgroundColor: COLORS.gray[300],
    color: COLORS.gray[600],
    borderColor: COLORS.gray[300],
  },
});

/**
 * 뱃지의 스타일 토큰이에요.
 * fill, outline, weak 세 가지 스타일을 제공해요.
 */
export const badgeVariants = styleVariants({
  /** 배경색이 채워진 기본 스타일이에요. */
  fill: {},
  /** 테두리만 있는 스타일이에요. */
  outline: {
    backgroundColor: COLORS.white,
  },
  /** 배경색이 반투명한 스타일이에요. (배경 75% 투명, 테두리 50% 투명) */
  weak: {},
});

/**
 * 뱃지의 크기 토큰이에요.
 * sm, md, lg 세 가지 크기를 제공해요.
 */
export const badgeSizes = styleVariants({
  /** 작은 크기예요. */
  sm: {
    padding: "2px 4px",
    fontSize: FONT_SIZES.xs,
  },
  /** 기본 크기예요. */
  md: {
    padding: "4px 8px",
    fontSize: FONT_SIZES.sm,
  },
  /** 큰 크기예요. */
  lg: {
    padding: "6px 12px",
    fontSize: FONT_SIZES.md,
  },
});

/**
 * 뱃지의 기본 스타일이에요.
 * 모든 뱃지에 공통으로 적용되는 스타일을 정의해요.
 */
const badgeBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  borderWidth: "1px",
  borderStyle: "solid",
  fontWeight: FONT_WEIGHTS.bold,
  whiteSpace: "nowrap",
});

/**
 * Badge 컴포넌트의 스타일 recipe예요.
 * color, variant, size 옵션을 조합해서 뱃지 스타일을 생성해요.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * badgeStyle({ color: "primary", variant: "fill", size: "md" })
 *
 * // Outline 스타일
 * badgeStyle({ color: "primary", variant: "outline", size: "lg" })
 *
 * // Weak 스타일 (반투명 배경)
 * badgeStyle({ color: "primary", variant: "weak", size: "sm" })
 * ```
 */
export const badgeStyle = recipe({
  base: badgeBase,

  /** 뱃지의 스타일 옵션이에요. */
  variants: {
    color: badgeColors,
    variant: badgeVariants,
    size: badgeSizes,
  },

  /** color와 variant 조합에 따라 적용되는 스타일이에요. */
  compoundVariants: [
    // primary + outline
    {
      variants: {
        color: "primary",
        variant: "outline",
      },
      style: {
        backgroundColor: "transparent",
        color: COLORS.blue[600],
        borderColor: COLORS.blue[600],
      },
    },
    // secondary + outline
    {
      variants: {
        color: "secondary",
        variant: "outline",
      },
      style: {
        backgroundColor: "transparent",
        color: COLORS.gray[600],
        borderColor: COLORS.gray[300],
      },
    },
    // primary + weak
    {
      variants: {
        color: "primary",
        variant: "weak",
      },
      style: {
        backgroundColor: `${COLORS.blue[600]}40`,
        color: COLORS.blue[600],
        borderColor: `${COLORS.blue[600]}80`,
      },
    },
    // secondary + weak
    {
      variants: {
        color: "secondary",
        variant: "weak",
      },
      style: {
        backgroundColor: `${COLORS.gray[300]}40`,
        color: COLORS.gray[600],
        borderColor: `${COLORS.gray[300]}80`,
      },
    },
  ],
});
