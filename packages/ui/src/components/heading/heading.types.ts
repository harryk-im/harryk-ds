import type React from "react";
import type {
  headingAligns,
  headingColors,
  headingSizes,
  headingWeights,
} from "./heading.css";

/**
 * Heading 컴포넌트의 Props예요.
 * HTML heading 요소나 div 요소의 모든 속성을 지원해요.
 */
export interface HeadingProps
  extends Omit<
    React.HTMLAttributes<HTMLHeadingElement | HTMLDivElement>,
    "color" | "as"
  > {
  /**
   * 사용할 HTML 태그를 설정해요.
   * @default "h1"
   */
  as?: HeadingTag;

  /**
   * 제목의 크기를 설정해요. 기본적으로 as 태그에 따라 최적화된 사이즈가 적용돼요.
   */
  size?: HeadingSize;

  /**
   * 제목의 색상을 설정해요.
   * @default "black"
   */
  color?: HeadingColor;

  /**
   * 제목의 굵기를 설정해요.
   * @default "bold"
   */
  weight?: HeadingWeight;

  /**
   * 텍스트의 정렬을 설정해요.
   * @default "left"
   */
  align?: HeadingAlign;
}

/**
 * Heading 컴포넌트에서 지원하는 HTML 태그 목록이에요.
 * - `h1`~`h6`: 표준 제목 태그예요.
 * - `div`: 스타일링을 위해 div 태그를 사용해야 할 때 선택해요.
 */
export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";

/**
 * Heading 컴포넌트의 가용한 크기예요.
 * - `2xs`, `xs`, `sm`: 작은 제목 크기예요.
 * - `md`: 중간 크기의 제목이에요.
 * - `lg`, `xl`, `2xl`, `3xl`: 강조를 위한 큰 제목 크기예요.
 */
export type HeadingSize = keyof typeof headingSizes;

/**
 * Heading 컴포넌트의 가용한 색상이에요.
 * - `black`: 기본 검정색이에요.
 * - `grey`: 짙은 회색이에요.
 * - `lightGrey`: 연한 회색이에요.
 */
export type HeadingColor = keyof typeof headingColors;

/**
 * Heading 컴포넌트의 가용한 굵기예요.
 * - `bold`: 굵은 텍스트(600)예요.
 * - `normal`: 일반 텍스트(400)예요.
 */
export type HeadingWeight = keyof typeof headingWeights;

/**
 * Heading 컴포넌트의 가용한 정렬 방식이에요.
 * - `left`: 왼쪽 정렬이에요.
 * - `center`: 가운데 정렬이에요.
 * - `right`: 오른쪽 정렬이에요.
 */
export type HeadingAlign = keyof typeof headingAligns;
