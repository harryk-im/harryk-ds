---
"@harryk-ds/ui": minor
---

Let `Heading` keep its heading semantics in places where `h1`–`h6` are not allowed. `as` now also accepts `div`, `p` and `span`, and those tags take a new required `level` prop that renders as `role="heading"` + `aria-level`. Previously `as="div"` produced a plain `<div>` that screen readers never announced as a heading, and adding `role="heading"` by hand without `aria-level` is itself an axe violation (`aria-required-attr`) — requiring `level` makes that state unreachable through this API.

`as` and `level` form a discriminated union, so `<Heading as="h3" level={2} />` (tag and level disagreeing) is a type error. `HeadingLevel`, `HeadingNativeTag` and `HeadingRoleTag` are now exported alongside the existing `HeadingTag`.

**Breaking changes**, both at the type level:

- `<Heading as="div" />` no longer compiles without a `level`. Note that `as="div"` previously rendered at the `3xl` size regardless; `level={1}` preserves that, while any other level now takes the size of the matching `h` tag — `level={3}` matches `<Heading as="h3" />`.
- `HeadingProps` is now a union type rather than an interface, so `interface Props extends HeadingProps` no longer compiles. Use an intersection instead: `type Props = HeadingProps & { ... }`.

`h1`–`h6` are untouched — same default sizes, and no ARIA is added on top of the tag. Each tag also keeps its own display: `span` renders inline as a `span` should (so `align` does not apply to it), while `h1`–`h6`, `div` and `p` stay block as before. Headings also gain `overflow-wrap: break-word` so a long word or URL cannot force horizontal scrolling on narrow screens (WCAG 1.4.10).
