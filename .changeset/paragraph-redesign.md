---
"@harryk-ds/ui": minor
---

Redesign the `Paragraph` component to match the updated design: the `color` values are now `black` / `dark` / `grey` / `blue`. `lightGrey` is removed, and `grey` now maps to the lighter `grey[600]` step, while the new `dark` takes over the previous `grey[900]` shade — replace `color="grey"` with `color="dark"` and `color="lightGrey"` with `color="grey"` to keep a similar look. `blue` moves from `blue[300]` to `blue[500]` to meet WCAG AA contrast. `Paragraph.Link` hover now shows a light background in the link's own color at 15% opacity (e.g. `blueAlpha15[500]` for `blue`) instead of a fixed grey background with lowered opacity, so the text keeps its full contrast.
