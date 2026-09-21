import React from "react";
import { headingStyle } from "./heading.css";
import type {
  HeadingLevel,
  HeadingProps,
  HeadingSize,
  HeadingTag,
} from "./heading.types";

/**
 * 제목 레벨에 맞는 기본 크기표예요.
 *
 * `h1`~`h6`은 태그의 숫자가, `div`·`p`·`span`은 `level`이 같은 표를 참조해요.
 * 덕분에 `<Heading as="div" level={3} />`은 `<Heading as="h3" />`과 같은 크기로 보여요.
 */
const LEVEL_TO_SIZE: Record<HeadingLevel, HeadingSize> = {
  1: "3xl",
  2: "2xl",
  3: "xl",
  4: "lg",
  5: "md",
  6: "sm",
};

const NATIVE_HEADING_PATTERN = /^h[1-6]$/;
const isNativeHeading = (tag: HeadingTag) => NATIVE_HEADING_PATTERN.test(tag);

/**
 * 페이지나 섹션의 제목을 렌더링하는 컴포넌트예요.
 *
 * `as`는 **의미 계층**을, `size`는 **보이는 크기**를 따로 담당해요.
 * 그래서 문서 구조를 흐트러뜨리지 않고도 원하는 크기로 보여줄 수 있어요.
 *
 * `h1`~`h6` 중첩이 허용되지 않는 자리(`<button>`·`<label>` 안 등)에는
 * `div`·`p`·`span`을 쓸 수 있고, 이때는 `level`을 반드시 받아
 * `role="heading"`과 `aria-level`로 제목 의미를 지켜줘요.
 *
 * @example
 * ```tsx
 * // 기본 사용법 (h1 · 3xl)
 * <Heading>메인 제목</Heading>
 *
 * // 색상과 정렬 지정
 * <Heading as="h2" color="grey" align="center">소제목</Heading>
 *
 * // 계층은 h3 그대로 두고 크기만 키우기
 * <Heading as="h3" size="3xl">크게 보여야 하는 h3</Heading>
 *
 * // h 태그를 넣을 수 없는 자리에서 제목 의미 지키기
 * <button>
 *   <Heading as="span" level={3}>버튼 안 제목</Heading>
 * </button>
 * ```
 */
export const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  (
    {
      as: tag = "h1",
      level,
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
    const Component = tag as React.ElementType;

    const resolvedLevel = (level ?? Number(tag.slice(1))) as HeadingLevel;
    const resolvedSize = size ?? LEVEL_TO_SIZE[resolvedLevel];

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

    // h1 - h6은 태그 자체가 제목이라 ARIA를 덧붙이지 않아요.
    // div·p·span은 role과 aria-level이 반드시 짝이어야 해요.
    const semantics = isNativeHeading(tag)
      ? {}
      : ({ role: "heading", "aria-level": resolvedLevel } as const);

    return (
      <Component {...props} {...semantics} ref={ref} className={classes}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
