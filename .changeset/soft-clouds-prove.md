---
"@harryk-ds/ui": patch
---

Fix `Button` color contrast to meet WCAG AA and align it with `Badge`: `fill` backgrounds move to the `500` step and `weak` text to `600`, and `weak` now layers a translucent color over an opaque `lightGrey` base so it keeps the same contrast on any surface. The `weak` backdrop is also restacked the same way as `Badge` (`isolation` + `z-index: -1`), which removes the inner content `<span>` — children now render directly inside `<button>`. No props changed.
