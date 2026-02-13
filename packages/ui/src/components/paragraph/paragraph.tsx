import React from "react";
import {
  ParagraphContext,
  useResolvedParagraphStyle,
} from "./paragraph.context";
import { paragraphLinkStyle, paragraphStyle } from "./paragraph.css";
import type {
  ParagraphLinkProps,
  ParagraphProps,
  ParagraphTextProps,
} from "./paragraph.types";

/**
 * 문단 단위의 텍스트를 렌더링하는 컴포넌트예요.
 * `<p>` 태그로 렌더링되며, 하위 컴포넌트(`Text`, `Link`)들에게 스타일을 공유하는 컨텍스트를 제공해요.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Paragraph size="md" color="black">
 *   안녕하세요! <Paragraph.Text bold>Harryk 디자인 시스템</Paragraph.Text>입니다.
 * </Paragraph>
 * ```
 */
export const ParagraphRoot = React.forwardRef<
  HTMLParagraphElement,
  ParagraphProps
>(
  (
    {
      size = "md",
      color = "black",
      bold = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      paragraphStyle({
        size,
        color,
        bold,
      }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const contextValue = React.useMemo(
      () => ({ size, color, bold }),
      [size, color, bold]
    );

    return (
      <ParagraphContext.Provider value={contextValue}>
        <p ref={ref} className={classes} {...props}>
          {children}
        </p>
      </ParagraphContext.Provider>
    );
  }
);

ParagraphRoot.displayName = "Paragraph";

/**
 * 문단 내에서 특정 텍스트의 스타일을 변경할 때 사용하는 컴포넌트예요.
 * `<span>` 태그로 렌더링되며, 부모 `Paragraph`의 스타일을 상속받지만 필요한 경우 오버라이드할 수 있어요.
 *
 * @example
 * ```tsx
 * <Paragraph.Text color="blue" bold>강조된 텍스트</Paragraph.Text>
 * ```
 */
export const ParagraphText = React.forwardRef<
  HTMLSpanElement,
  ParagraphTextProps
>(({ size, color, bold, className, children, ...props }, ref) => {
  const resolvedStyle = useResolvedParagraphStyle({ size, color, bold });

  const classes = [
    paragraphStyle({
      size: resolvedStyle.size,
      color: resolvedStyle.color,
      bold: resolvedStyle.bold,
    }),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span ref={ref} className={classes} {...props}>
      {children}
    </span>
  );
});

ParagraphText.displayName = "Paragraph.Text";

/**
 * 문단 내에서 하이퍼링크를 표현할 때 사용하는 컴포넌트예요.
 * `<a>` 태그로 렌더링되며, 부모의 색상 설정과 무관하게 기본적으로 파란색(`blue`)으로 표시돼요.
 *
 * @example
 * ```tsx
 * <Paragraph.Link href="https://github.com/harryk-im/harryk-ds/">harryk-ds 깃허브 바로가기</Paragraph.Link>
 * ```
 */
export const ParagraphLink = React.forwardRef<
  HTMLAnchorElement,
  ParagraphLinkProps
>(({ size, color, bold, className, children, ...props }, ref) => {
  const resolvedStyle = useResolvedParagraphStyle(
    { size, color, bold },
    { color: "blue" }
  );

  const classes = [
    paragraphStyle({
      size: resolvedStyle.size,
      color: resolvedStyle.color,
      bold: resolvedStyle.bold,
    }),
    paragraphLinkStyle(),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a ref={ref} className={classes} {...props}>
      {children}
    </a>
  );
});

ParagraphLink.displayName = "Paragraph.Link";

export const Paragraph = Object.assign(ParagraphRoot, {
  Text: ParagraphText,
  Link: ParagraphLink,
});
