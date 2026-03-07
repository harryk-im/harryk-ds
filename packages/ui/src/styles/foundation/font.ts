import { FONT_SIZES, LINE_HEIGHTS } from "../tokens";

type FontSizeKey = keyof typeof FONT_SIZES;

/**
 * fontSize와 lineHeight를 함께 반환하는 Typography 유틸 함수예요.
 * styleVariants나 style 함수 내부에서 spread해서 사용할 수 있어요.
 *
 * @param size - 적용할 사이즈 키 (2xs, xs, sm, md, lg, xl, 2xl, 3xl)
 * @returns fontSize와 lineHeight가 포함된 스타일 객체
 *
 * @example
 * // button.css.ts
 * sm: { padding: "8px 16px", ...getTypography("md") }
 */
export const getTypography = (size: FontSizeKey) => ({
  fontSize: FONT_SIZES[size],
  lineHeight: LINE_HEIGHTS[size],
});
