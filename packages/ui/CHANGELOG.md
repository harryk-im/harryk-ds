# @harryk-ds/ui

## 0.3.1

### Patch Changes

- 6191435: Fix `Button` color contrast to meet WCAG AA and align it with `Badge`: `fill` backgrounds move to the `500` step and `weak` text to `600`, and `weak` now layers a translucent color over an opaque `lightGrey` base so it keeps the same contrast on any surface. The `weak` backdrop is also restacked the same way as `Badge` (`isolation` + `z-index: -1`), which removes the inner content `<span>` — children now render directly inside `<button>`. No props changed.

## 0.3.0

### Minor Changes

- 0a0e527: Redesign the `Badge` component to match the updated design system: replace semantic `color` values (`primary`/`secondary`) with primitives (`blue`/`red`/`grey`), remove the `outline` variant, and add an `xs` size. The default `size` changes from `sm` to `md`, so badges without an explicit `size` render larger. `weak` now layers a translucent color over an opaque `lightGrey` base so it looks the same on any surface, and its text uses the `600` step to meet WCAG AA contrast. Borders are removed and every size is fully rounded.
- 3224627: Refine the `Button` styles: shift `fill` backgrounds and `weak` text one step darker (`400` and `300`), replace the white `weak` background with translucent `lightGrey`, and scale the border radius with `size` (`sm` 8px, `md` 12px, `lg` 16px) instead of a fixed 16px. No props changed — expect a visible style shift.

## 0.2.0

### Minor Changes

- 2b63c3f: Redesign the `Button` component to match the updated design system: replace semantic `color` values (`primary`/`secondary`) with primitives (`blue`/`red`/`grey`), swap the `outline` variant for `weak`, remove borders and built-in animation, and add `fullWidth` and `loading` props.
- 5aa6a91: Realign the `COLORS` ramps to a lightness-first scale: `blue`, `red`, and `grey` share one core ramp so the same step has the same lightness across families, and `lightGrey` becomes a background-only surface ramp. No token names changed, but most values did — expect a visible color shift.

## 0.1.7

### Patch Changes

- 2cb8b33: Fixed a size discrepancy between the `fill` and `outline` variants in the `Button` component caused by differences in border styling. All variants now apply consistent border rules to maintain uniform dimensions.
- 2cb8b33: implement Modal component system and associated utility hooks
- 2cb8b33: Add Modal compound component (`Header` / `Body` / `Footer`) with `sm`/`md`/`lg` sizes, portal rendering, overlay dismiss, and companion hooks (`useDisclosure`, `useCloseOnEsc`, `useScrollLock`).

## 0.1.6

### Patch Changes

- 532c7b1: Optimize dependency structure and enhance version compatibility
- 521d033: Rename bold prop to weight in Paragraph component for architectural consistency.
- 6dc4bac: Implement Heading component with polymorphic tag support and refined type architecture.
- 45e01e8: add 2xs, 3xl typography tokens and expand Paragraph component sizes

## 0.1.5

### Patch Changes

- d6cdc35: Introduce getTypography foundation utility to bundle font size and line height tokens, and refactor UI components for consistent typography.
- 11372c0: Add "paragraph" component with compound sub-components and robust style resolution logic via custom hooks.
- d6cdc35: Refactor and expand color tokens with a more granular OKLCH-based scale.

## 0.1.4

### Patch Changes

- 654dcb7: Migrate and enhance color token system to OKLCH
- 9b5246e: Add Pretendard font and optimize style structure for easier global styling and theme support

## 0.1.3

### Patch Changes

- 54ab5e2: Add hover, active, disabled interactions to Button component and refactor styles
- 2be9ba4: Add Badge UI Component

## 0.1.2

### Patch Changes

- @harryk-ds/ui 스타일이 적용되지 않는 문제 해결

## 0.0.0-20251101111514

### Minor Changes

- add vite-config-ts banner options

## 0.0.0-20251101110238

### Patch Changes

- snapshot test

## 0.1.1

### Patch Changes

- force publish

## 0.1.0

### Minor Changes

- Initial release of @harryk-ds/ui
- Button 컴포넌트 추가
