import type {
  headingAligns,
  headingColors,
  headingSizes,
  headingWeights,
} from "./heading.css";

/**
 * Heading 컴포넌트에서 지원하는 HTML 태그 목록이에요.
 */
export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";

/**
 * Heading 컴포넌트의 가용한 크기예요.
 */
export type HeadingSize = keyof typeof headingSizes;

/**
 * Heading 컴포넌트의 가용한 색상이에요.
 */
export type HeadingColor = keyof typeof headingColors;

/**
 * Heading 컴포넌트의 가용한 굵기예요.
 */
export type HeadingWeight = keyof typeof headingWeights;

/**
 * Heading 컴포넌트의 가용한 정렬 방식이에요.
 */
export type HeadingAlign = keyof typeof headingAligns;
