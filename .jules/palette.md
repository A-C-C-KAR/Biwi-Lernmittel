## 2025-02-14 - Keyboard accessibility in custom accordion components
**Learning:** Using `<div>` elements with `onclick` handlers for accordions (like the question catalog) breaks keyboard accessibility because they don't receive focus by default and screen readers don't announce their state.
**Action:** Replace interactive `<div>` wrappers with `<button>` elements, ensuring they include `focus-visible` styling for keyboard navigation, and add correct `aria-expanded` and `aria-controls` attributes that sync with visual state.
