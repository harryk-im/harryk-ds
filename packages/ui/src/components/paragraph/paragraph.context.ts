import { createContext, useContext } from "react";
import type {
  ParagraphBold,
  ParagraphColor,
  ParagraphContextType,
  ParagraphSize,
} from "./paragraph.types";

type _StyleDefaults = Partial<ParagraphContextType>;

const ParagraphContext = createContext<ParagraphContextType>({});

export const useParagraphContext = () => {
  return useContext(ParagraphContext);
};

export const useResolvedParagraphStyle = (
  props: { size?: ParagraphSize; color?: ParagraphColor; bold?: ParagraphBold },
  defaults?: _StyleDefaults
) => {
  const context = useParagraphContext();

  return {
    size: props.size ?? defaults?.size ?? context.size ?? ("md" as const),
    color:
      props.color ?? defaults?.color ?? context.color ?? ("black" as const),
    bold: props.bold ?? defaults?.bold ?? context.bold ?? (false as const),
  };
};

export { ParagraphContext };
