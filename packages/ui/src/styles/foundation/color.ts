/**
 * oklch 기반의 색상 토큰에 투명도를 적용하는 유틸리티예요.
 *
 * @param color - oklch 형식의 색상 토큰 문자열 (예: `oklch(14% 0 263.18)`)
 * @param opacity - 적용할 투명도 (0 ~ 1)
 * @returns 알파 채널이 붙은 oklch 문자열 (`oklch(L C H / opacity)` 형태)
 *
 * @example
 * withOpacity(COLORS.black, 0.5) // "oklch(14% 0 263.18 / 0.5)"
 */
export const withOpacity = (color: string, opacity: number) => {
  // oklch(L C H) -> oklch(L C H / opacity) 형태로 변환해요.
  return color.replace(")", ` / ${opacity})`);
};
