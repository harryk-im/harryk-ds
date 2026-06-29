/**
 * CSS 변수 및 oklch 토큰에 모던 CSS 기능을 통해 투명도를 입혀요.
 * 브라우저 런타임에서 색상을 해석하므로 CSS 변수도 정상 작동해요.
 */
export const withOpacity = (colorVar: string, opacity: number | string) => {
  // 예: colorVar가 var(--color-blue-500) 또는 oklch(...) 일 때
  // oklch(from var(--color-blue-500) l c h / 0.5) 형태로 빌드돼요.
  return `oklch(from ${colorVar} l c h / ${opacity})`;
};
