## 2026-07-18 - XSS in Exam Results
**Vulnerability:** User-entered concept notes were directly interpolated into HTML strings using template literals and assigned to `.innerHTML` in `renderExamResults()`, allowing unauthenticated Stored/Reflected XSS on the local device.
**Learning:** The application heavily relies on vanilla JS `.innerHTML` without a templating engine to sanitize strings. Unsanitized data flow from `textarea` to `localStorage`/state and straight back to the DOM is highly risky.
**Prevention:** Always wrap dynamically inserted user input in a sanitization function like `escapeHTML` before inserting it into `.innerHTML`. Never trust local input.
