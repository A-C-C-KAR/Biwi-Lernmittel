## 2024-05-24 - Semantic HTML for Interactive Accordions
**Learning:** Custom accordion components built with `<div>` elements and `onclick` handlers block keyboard navigation and screen reader support, excluding users who rely on non-mouse inputs. Even if a click works for mouse users, it fails WCAG accessibility standards.
**Action:** Always use semantic `<button>` elements for interactive toggles and dynamically manage `aria-expanded` states via JavaScript to ensure robust keyboard support and accurate screen reader announcements.
