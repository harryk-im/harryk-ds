---
"@harryk-ds/ui": minor
---

Redesign the `Badge` component to match the updated design system: replace semantic `color` values (`primary`/`secondary`) with primitives (`blue`/`red`/`grey`), remove the `outline` variant, and add an `xs` size. The default `size` changes from `sm` to `md`, so badges without an explicit `size` render larger. `weak` now layers a translucent color over an opaque `lightGrey` base so it looks the same on any surface, and its text uses the `600` step to meet WCAG AA contrast. Borders are removed and every size is fully rounded.
