## 2024-05-24 - Interactive Elements for Accordions
**Learning:** Using `<div>` elements with `onclick` handlers for accordions makes them completely inaccessible to keyboard users and screen readers. They cannot be focused using the Tab key, and their expanded/collapsed state isn't communicated to assistive technologies.
**Action:** Always use native `<button>` elements for the clickable headers of accordion items. Ensure they have appropriate `aria-expanded` and `aria-controls` attributes, and clearly visible focus styles (`focus-visible`) to support keyboard navigation.
