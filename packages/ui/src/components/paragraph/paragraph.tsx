import React, { createContext, useContext } from "react";
import { paragraphLinkStyle, paragraphStyle } from "./paragraph.css";
import type {
  ParagraphContextType,
  ParagraphLinkProps,
  ParagraphProps,
  ParagraphTextProps,
} from "./paragraph.types";

const ParagraphContext = createContext<ParagraphContextType>({});

const useParagraphContext = () => {
  return useContext(ParagraphContext);
};

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
  const context = useParagraphContext();
  const fontSize = size ?? context.size ?? "md";
  const fontColor = color ?? context.color ?? "black";
  const fontWeight = bold ?? context.bold ?? false;

  const classes = [
    paragraphStyle({
      size: fontSize,
      color: fontColor,
      bold: fontWeight,
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
  const context = useParagraphContext();
  const fontSize = size ?? context.size ?? "md";
  const fontColor = color ?? "blue";
  const fontWeight = bold ?? context.bold ?? false;

  const classes = [
    paragraphStyle({
      size: fontSize,
      color: fontColor,
      bold: fontWeight,
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
