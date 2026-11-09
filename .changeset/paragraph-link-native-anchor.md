---
"@harryk-ds/ui": minor
---

`Paragraph.Link` now behaves like a plain `<a>` element: it no longer adds `target="_blank"` and `rel="noreferrer"` by default, so links open in the same tab unless you say otherwise. To keep opening a link in a new tab, pass the attributes yourself, e.g. `<Paragraph.Link href="…" target="_blank" rel="noopener noreferrer">`.
