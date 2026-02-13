import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import type { paragraphStyle } from "./paragraph.css";

type ParagraphVariants = RecipeVariants<typeof paragraphStyle>;

export type ParagraphSize = NonNullable<ParagraphVariants>["size"];
export type ParagraphColor = NonNullable<ParagraphVariants>["color"];
export type ParagraphBold = NonNullable<ParagraphVariants>["bold"];

export interface ParagraphContextType {
  size?: ParagraphSize;
  color?: ParagraphColor;
  bold?: ParagraphBold;
}

export interface BaseParagraphProps {
  size?: ParagraphSize;
  color?: ParagraphColor;
  bold?: ParagraphBold;
  children?: React.ReactNode;
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
