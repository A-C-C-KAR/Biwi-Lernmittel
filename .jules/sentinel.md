## 2024-05-24 - Fix DOM-based XSS in Exam Results
**Vulnerability:** DOM-based XSS was possible in `renderExamResults` due to unsanitized user input being inserted directly into the DOM using `.innerHTML`.
**Learning:** The application heavily relies on vanilla JavaScript and `.innerHTML` for rendering views dynamically. Because there is no templating engine that automatically escapes output, all user-provided data must be manually sanitized.
**Prevention:** Always use a utility function like `escapeHTML` to sanitize any user input before inserting it into the DOM via `.innerHTML`, or use safer alternatives like `.textContent` where appropriate.
