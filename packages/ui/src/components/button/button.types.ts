import type React from "react";
import type { buttonColor, buttonSize, buttonVariant } from "./button.css";

/**
 * Button 컴포넌트의 Props예요.
 * HTML button 요소의 모든 속성을 지원해요.
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * 버튼의 색상을 선택해요.
   * @default "blue"
   */
  color?: ButtonColor;

  /**
   * 버튼의 스타일을 선택해요.
   * @default "fill"
   */
  variant?: ButtonVariant;

  /**
   * 버튼의 크기를 선택해요.
   * @default "md"
   */
  size?: ButtonSize;
}

/**
 * 버튼의 색상을 지정해요.
 * - `blue`: 주요 액션에 사용하는 파란색이에요.
 * - `red`: 위험하거나 주의가 필요한 액션에 사용하는 빨간색이에요.
 * - `grey`: 보조 액션에 사용하는 회색이에요.
 */
export type ButtonColor = keyof typeof buttonColor;

/**
 * 버튼의 크기를 지정해요.
 * - `sm`: 작은 크기예요.
 * - `md`: 기본 크기예요.
 * - `lg`: 큰 크기예요.
 */
export type ButtonSize = keyof typeof buttonSize;

/**
 * 버튼의 스타일을 지정해요.
 * - `fill`: 배경색이 채워진 스타일이에요.
 * - `weak`: 흰 배경 위에 반투명 색상 배경 레이어를 덧입힌 스타일이에요.
 */
export type ButtonVariant = keyof typeof buttonVariant;
