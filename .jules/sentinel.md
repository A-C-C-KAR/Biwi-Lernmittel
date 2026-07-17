## 2026-07-17 - DOM-based XSS in Exam Results
**Vulnerability:** User input from exam notes (`ans_${q.id}`) was directly injected into the DOM via `.innerHTML` in `renderExamResults()` without any sanitization.
**Learning:** The application relies on vanilla JavaScript without a templating engine. Any user input rendered back to the user via `.innerHTML` poses a DOM-based XSS risk if not explicitly escaped.
**Prevention:** Always use a utility like `app.escapeHTML(str)` to sanitize user input before inserting it into `.innerHTML`, or prefer `.textContent` where HTML parsing is not required.