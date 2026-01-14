import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

/**
 * 버튼의 색상 토큰이에요.
 * primary와 secondary 두 가지 색상을 제공해요.
 */
export const buttonColors = styleVariants({
  /** 주요 액션에 사용하는 색상이에요. */
  primary: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  /** 보조 액션에 사용하는 색상이에요. */
  secondary: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },
});

/**
 * 버튼의 스타일 토큰이에요.
 * fill과 outline 두 가지 스타일을 제공해요.
 */
export const buttonVariants = styleVariants({
  /** 배경색이 채워진 기본 스타일이에요. */
  fill: {
    border: "none",
  },
  /** 테두리만 있는 스타일이에요. */
  outline: {
    backgroundColor: "transparent",
    border: "2px solid transparent",
  },
});

/**
 * 버튼의 크기 토큰이에요.
 * sm, md, lg 세 가지 크기를 제공해요.
 */
export const buttonSizes = styleVariants({
  /** 작은 크기예요. */
  sm: {
    padding: "8px 16px",
    fontSize: "14px",
  },
  /** 기본 크기예요. */
  md: {
    padding: "12px 24px",
    fontSize: "16px",
  },
  /** 큰 크기예요. */
  lg: {
    padding: "16px 32px",
    fontSize: "18px",
  },
});

/**
 * 버튼의 기본 스타일이에요.
 * 모든 버튼에 공통으로 적용되는 스타일과 인터랙션을 정의해요.
 */
const buttonBase = style({
  borderRadius: "8px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.1s ease-in-out",
  outline: "none",

  /** hover 시 opacity가 낮아져요. */
  ":hover": {
    opacity: 0.8,
  },

  /** press(active) 시 살짝 작아져요. */
  ":active": {
    transform: "scale(0.96)",
  },

  /** disabled 상태에서는 인터랙션이 비활성화돼요. */
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
    "&:disabled:hover": {
      opacity: 0.6,
    },
    "&:disabled:active": {
      transform: "none",
    },
  },
});

/**
 * Button 컴포넌트의 스타일 recipe예요.
 * color, variant, size 옵션을 조합해서 버튼 스타일을 생성해요.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * buttonStyle({ color: "primary", variant: "fill", size: "md" })
 *
 * // Outline 스타일
 * buttonStyle({ color: "primary", variant: "outline", size: "lg" })
 * ```
 */
export const buttonStyle = recipe({
  base: buttonBase,

  /** 버튼의 스타일 옵션이에요. */
  variants: {
    color: buttonColors,
    variant: buttonVariants,
    size: buttonSizes,
  },

  /** color와 variant 조합에 따라 적용되는 스타일이에요. */
  compoundVariants: [
    {
      variants: {
        color: "primary",
        variant: "outline",
      },
      style: {
        backgroundColor: "transparent",
        color: "#3b82f6",
        borderColor: "#3b82f6",
      },
    },
    {
      variants: {
        color: "secondary",
        variant: "outline",
      },
      style: {
        backgroundColor: "transparent",
        color: "#374151",
        borderColor: "#374151",
      },
    },
  ],
});
