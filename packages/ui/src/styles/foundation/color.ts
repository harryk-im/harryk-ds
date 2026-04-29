/**
 * oklch 기반의 색상 토큰에 투명도를 적용하는 유틸리티예요.
 *
 * @param color - oklch 형식의 색상 토큰 문자열
 * @param opacity - 적용할 투명도 (0 ~ 1)
 * @returns 투명도가 적용된 color-mix 문자열
 *
 * @example
 * withOpacity(COLORS.black, 0.5) // "color-mix(in oklch, oklch(14% 0 263.18) 50%, transparent)"
 */
export const withOpacity = (color: string, opacity: number) => {
  // oklch(L C H) -> oklch(L C H / opacity) 형태로 변환해요.
  return color.replace(")", ` / ${opacity})`);
};
