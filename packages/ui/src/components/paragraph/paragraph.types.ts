import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import type {
  paragraphColors,
  paragraphSizes,
  paragraphWeights,
} from "./paragraph.css";

/**
 * Paragraph 컴포넌트의 가용한 크기예요.
 */
export type ParagraphSize = keyof typeof paragraphSizes;

/**
 * Paragraph 컴포넌트의 가용한 색상이에요.
 */
export type ParagraphColor = keyof typeof paragraphColors;

/**
 * Paragraph 컴포넌트의 가용한 굵기예요.
 */
export type ParagraphWeight = keyof typeof paragraphWeights;

/**
 * Paragraph 컴포넌트 내부에서 공유되는 컨텍스트 타입이에요.
 * 상위 Paragraph에서 설정한 스타일 값을 하위 컴포넌트가 참조할 때 사용해요.
 */
export interface ParagraphContextType {
  /** 텍스트의 크기예요. */
  size?: ParagraphSize;
  /** 텍스트의 색상이에요. */
  color?: ParagraphColor;
  /** 텍스트의 굵기예요. */
  weight?: ParagraphWeight;
}

/**
 * Paragraph 컴포넌트들의 공통 Props 정의예요.
 */
export interface BaseParagraphProps {
  /**
   * 텍스트의 크기를 설정해요.
   * @default "md"
   */
  size?: ParagraphSize;
  /**
   * 텍스트의 색상을 설정해요.
   * @default "black"
   */
  color?: ParagraphColor;
  /**
   * 텍스트의 굵기를 설정해요.
   * @default "normal"
   */
  weight?: ParagraphWeight;
  children?: ReactNode;
  className?: string;
}

export interface ParagraphProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "color">,
    BaseParagraphProps {}

export interface ParagraphTextProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    BaseParagraphProps {}

export interface ParagraphLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    BaseParagraphProps {}
