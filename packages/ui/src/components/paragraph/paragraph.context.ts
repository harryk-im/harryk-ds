import { createContext, useContext } from "react";
import type {
  ParagraphColor,
  ParagraphContextType,
  ParagraphSize,
  ParagraphWeight,
} from "./paragraph.types";

type _StyleDefaults = Partial<ParagraphContextType>;

const ParagraphContext = createContext<ParagraphContextType>({});

export const useParagraphContext = () => {
  return useContext(ParagraphContext);
};

/**
 * 컴포넌트의 props와 Context 값을 병합하여 최종 스타일을 결정하는 훅이에요.
 *
 * 우선순위:
 * 1. props (직접 전달된 값)
 * 2. defaults (컴포넌트별 기본 오버라이드 값)
 * 3. context (상위 Paragraph에서 전달된 값)
 * 4. fallback (최종 기본값: size="md", color="black", weight="normal")
 *
 * @param props - 컴포넌트가 직접 받은 props
 * @param defaults - 컴포넌트별로 적용할 기본 오버라이드 값 (예: Link의 color="blue")
 */
export const useResolvedParagraphStyle = (
  props: {
    size?: ParagraphSize;
    color?: ParagraphColor;
    weight?: ParagraphWeight;
  },
  defaults?: _StyleDefaults
) => {
  const context = useParagraphContext();

  return {
    size: props.size ?? defaults?.size ?? context.size ?? ("md" as const),
    color:
      props.color ?? defaults?.color ?? context.color ?? ("black" as const),
    weight:
      props.weight ?? defaults?.weight ?? context.weight ?? ("normal" as const),
  };
};

export { ParagraphContext };
