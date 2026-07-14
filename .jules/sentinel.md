## 2026-07-14 - Fix DOM-based XSS in Exam Results
**Vulnerability:** Exam results (`userAnswer` derived from user notes) were injected into the DOM unsanitized via `.innerHTML` in `renderExamResults()`, allowing Cross-Site Scripting (XSS).
**Learning:** The application lacks a templating engine and relies on vanilla JavaScript, requiring manual sanitization for all user-provided strings before `.innerHTML` assignment.
**Prevention:** Always use a custom `escapeHTML()` utility to sanitize untrusted strings before appending them to the DOM, or use `textContent` where applicable.