import { globalFontFace, globalStyle } from "@vanilla-extract/css";

export const FONT_FAMILY = "Pretendard";

globalFontFace(FONT_FAMILY, {
  src: 'local("Pretendard Regular"), url("../../assets/Pretendard-Regular.woff2") format("woff2")',
  fontWeight: 400,
  fontDisplay: "swap",
});

globalFontFace(FONT_FAMILY, {
  src: 'local("Pretendard SemiBold"), url("../../assets/Pretendard-SemiBold.woff2") format("woff2")',
  fontWeight: 600,
  fontDisplay: "swap",
});

globalStyle(":root, body, button, input, select, textarea", {
  fontFamily: FONT_FAMILY,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});
