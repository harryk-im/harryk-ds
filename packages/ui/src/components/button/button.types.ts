import type { RecipeVariants } from "@vanilla-extract/recipes";
import type React from "react";
import type {
  buttonColors,
  buttonSizes,
  buttonStyle,
  buttonVariants,
} from "./button.css";

/**
 * Button 컴포넌트의 Props예요.
 * HTML button 요소의 모든 속성을 지원해요.
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * 버튼의 색상을 선택해요.
   * @default "primary"
   */
  color?: ButtonColors;

  /**
   * 버튼의 스타일을 선택해요.
   * @default "fill"
   */
  variant?: ButtonVariants;

  /**
   * 버튼의 크기를 선택해요.
   * @default "md"
   */
  size?: ButtonSizes;
}

/**
 * Button 컴포넌트의 모든 스타일 옵션을 포함하는 타입이에요.
 * recipe에서 자동으로 추론돼요.
 */
export type ButtonToken = RecipeVariants<typeof buttonStyle>;

/**
 * 버튼의 색상을 지정해요.
 * - `primary`: 주요 액션에 사용하는 파란색이에요.
 * - `secondary`: 보조 액션에 사용하는 회색이에요.
 */
export type ButtonColors = keyof typeof buttonColors;

/**
 * 버튼의 크기를 지정해요.
 * - `sm`: 작은 크기예요.
 * - `md`: 기본 크기예요.
 * - `lg`: 큰 크기예요.
 */
export type ButtonSizes = keyof typeof buttonSizes;

/**
 * 버튼의 스타일을 지정해요.
 * - `fill`: 배경색이 채워진 스타일이에요.
 * - `outline`: 테두리만 있는 스타일이에요.
 */
export type ButtonVariants = keyof typeof buttonVariants;
