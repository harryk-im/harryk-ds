import { globalStyle } from "@vanilla-extract/css";
import { FONT_FAMILY } from "./fonts.css";

globalStyle(":root, body, button, input, select, textarea", {
  fontFamily: FONT_FAMILY,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});
