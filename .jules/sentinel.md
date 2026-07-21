## 2024-11-20 - Cross-Site Scripting (XSS) in Exam Results
**Vulnerability:** User input from exam notes textareas was directly interpolated into an HTML string assigned to `.innerHTML` during `renderExamResults()`, allowing for execution of malicious scripts.
**Learning:** Vanilla JavaScript applications without templating engines are highly susceptible to DOM-based XSS when injecting dynamic content, as the developer must manually handle sanitization.
**Prevention:** Always sanitize or escape user-provided input before using `.innerHTML`, or prefer safer alternatives like `.textContent` or `.innerText` where appropriate. A reusable `escapeHTML` utility should be standardized.
