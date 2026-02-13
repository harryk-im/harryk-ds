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
