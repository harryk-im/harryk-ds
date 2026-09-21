import type { RecipeVariants } from "@vanilla-extract/recipes";
import type React from "react";
import type {
  headingAlign,
  headingColor,
  headingSize,
  headingStyle,
  headingWeight,
} from "./heading.css";

/**
 * Heading 컴포넌트의 스타일 Props예요.
 * 렌더링되는 HTML 요소의 속성도 함께 지원해요.
 */
interface HeadingStyleProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  /**
   * 제목의 크기를 설정해요.
   * 생략하면 제목 레벨에 맞는 크기가 적용돼요. (레벨 1 → `3xl` … 레벨 6 → `sm`)
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
   *
   * `as="span"`은 인라인으로 그려져서 정렬이 적용되지 않아요.
   * 정렬이 필요하면 `div`나 `p`를 쓰거나, 감싸는 블록 요소에 정렬을 주세요.
   *
   * @default "left"
   */
  align?: HeadingAlign;
}

/**
 * Heading 컴포넌트의 Props예요.
 *
 * `as`에 따라 `level`의 필요 여부가 갈려요.
 * - `h1`~`h6`: 레벨이 태그에 이미 담겨 있어서 `level`을 받지 않아요.
 * - `div`·`p`·`span`: 태그만으로는 제목인지 알 수 없어서 `level`을 **반드시** 받아요.
 *   이 값이 `role="heading"`과 `aria-level`로 이어져요.
 *
 * 두 경우를 판별 유니온으로 나눠서, `<Heading as="h3" level={2} />`처럼
 * 태그와 레벨이 서로 다른 계층을 말하는 조합은 타입 단계에서 막혀요.
 */
export type HeadingProps = HeadingStyleProps &
  (
    | { as?: HeadingNativeTag; level?: never }
    | { as: HeadingRoleTag; level: HeadingLevel }
  );

/**
 * Heading 컴포넌트의 모든 스타일 옵션을 포함하는 타입이에요.
 * recipe에서 자동으로 추론돼요.
 */
export type HeadingToken = RecipeVariants<typeof headingStyle>;

/**
 * 제목 의미를 태그 자체가 갖는 HTML 태그예요.
 * 별도의 ARIA 속성 없이 그대로 제목으로 읽혀요.
 */
export type HeadingNativeTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * 제목 의미가 없어서 `role="heading"`으로 승격시키는 HTML 태그예요.
 * `<button>`이나 `<label>` 안처럼 `h1`~`h6` 중첩이 허용되지 않는 자리에 써요.
 * - `div`: 블록 자리에 쓰는 기본 선택지예요.
 * - `p`: 문단 흐름 안에서 제목을 표현할 때 써요.
 * - `span`: 인라인 자리에만 넣을 수 있을 때 써요. 태그 그대로 인라인으로 그려져서 `align`은 적용되지 않아요.
 */
export type HeadingRoleTag = "div" | "p" | "span";

/**
 * Heading 컴포넌트에서 지원하는 HTML 태그 목록이에요.
 */
export type HeadingTag = HeadingNativeTag | HeadingRoleTag;

/**
 * 제목의 계층 레벨이에요. `h1`~`h6`의 숫자와 같은 의미예요.
 * `as`가 `div`·`p`·`span`일 때 `aria-level`로 전달돼요.
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Heading 컴포넌트의 가용한 크기예요.
 * - `2xs`, `xs`, `sm`: 작은 제목 크기예요.
 * - `md`: 중간 크기의 제목이에요.
 * - `lg`, `xl`, `2xl`, `3xl`: 강조를 위한 큰 제목 크기예요.
 */
export type HeadingSize = keyof typeof headingSize;

/**
 * Heading 컴포넌트의 가용한 색상이에요.
 * - `black`: 기본 검정색이에요.
 * - `grey`: 짙은 회색이에요.
 * - `lightGrey`: 연한 회색이에요.
 */
export type HeadingColor = keyof typeof headingColor;

/**
 * Heading 컴포넌트의 가용한 굵기예요.
 * - `bold`: 굵은 텍스트(600)예요.
 * - `normal`: 일반 텍스트(400)예요.
 */
export type HeadingWeight = keyof typeof headingWeight;

/**
 * Heading 컴포넌트의 가용한 정렬 방식이에요.
 * - `left`: 왼쪽 정렬이에요.
 * - `center`: 가운데 정렬이에요.
 * - `right`: 오른쪽 정렬이에요.
 */
export type HeadingAlign = keyof typeof headingAlign;
