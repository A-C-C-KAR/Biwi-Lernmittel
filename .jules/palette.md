## 2024-07-23 - Accordion Accessibility
**Learning:** Interactive accordion headers were implemented using `<div>` elements instead of semantic `<button>` elements, lacking keyboard support, focus states, and ARIA attributes for screen readers.
**Action:** Always use semantic `<button>` elements for interactive UI components like accordions and manually manage ARIA states (e.g., toggling `aria-expanded`) via JavaScript to ensure full accessibility.
