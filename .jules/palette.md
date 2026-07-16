## 2026-07-16 - Make JS-driven accordions accessible
**Learning:** Accordion components built with vanilla JS and `<div>` tags require explicit ARIA attributes (`aria-expanded`, `aria-controls`) and need to use semantic `<button>` elements to ensure keyboard accessibility and proper screen reader announcements.
**Action:** Always use `<button>` for interactive toggle elements, bind standard keyboard events, and actively toggle `aria-expanded` states via JS when building custom disclosure/accordion widgets without a framework.
