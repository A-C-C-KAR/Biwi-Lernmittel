## 2026-07-21 - Custom Accordion Accessibility
**Learning:** Found interactive accordion headers implemented using `<div>` elements without ARIA states, making them inaccessible to screen readers and difficult to navigate via keyboard.
**Action:** When implementing or modifying custom interactive elements like accordions in this vanilla JS app, always use semantic `<button>` elements and manually manage ARIA states (e.g., `aria-expanded`, `aria-controls`) via JavaScript.
