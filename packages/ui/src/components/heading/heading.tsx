import React from "react";
import { headingStyle } from "./heading.css";
import type {
  HeadingAlign,
  HeadingColor,
  HeadingSize,
  HeadingTag,
  HeadingWeight,
} from "./heading.types";

const TAG_TO_SIZE_MAP: Record<HeadingTag, HeadingSize> = {
  h1: "3xl",
  h2: "2xl",
  h3: "xl",
  h4: "lg",
  h5: "md",
  h6: "sm",
  div: "3xl",
} as const;

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
 * 페이지나 섹션의 제목을 렌더링하는 컴포넌트예요.
 * `as`에 따라 적절한 HTML 태그(`h1`~`h6`, `div`)로 렌더링됩니다.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Heading as="h1">메인 제목</Heading>
 *
 * // 색상과 정렬 지정
 * <Heading as="h2" color="grey" align="center">소제목</Heading>
 *
 * // 크기 오버라이드
 * <Heading as="h3" size="3xl">태그는 h3이지만 크게 보여야 할 때</Heading>
 * ```
 */
export const Heading = React.forwardRef<
  HTMLHeadingElement | HTMLDivElement,
  HeadingProps
>(
  (
    {
      as: Component = "h1",
      size,
      color = "black",
      weight = "bold",
      align = "left",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? TAG_TO_SIZE_MAP[Component];

    const classes = [
      headingStyle({
        size: resolvedSize,
        color,
        weight,
        align,
      }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
