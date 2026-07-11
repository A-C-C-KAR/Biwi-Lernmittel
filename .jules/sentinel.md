## 2024-07-11 - [CRITICAL] XSS via Vanilla JS innerHTML Rendering
**Vulnerability:** Unsanitized user input (`userAnswer` from textarea notes) was inserted directly into the DOM using template literals assigned to `innerHTML`. This exposes the application to DOM-based Cross-Site Scripting (XSS).
**Learning:** This codebase relies entirely on vanilla JavaScript for DOM manipulation. Without a modern templating engine or built-in sanitization, every `.innerHTML` assignment involving user input is a severe risk.
**Prevention:** Always implement and apply an HTML escape utility function (or use `.textContent`/`.innerText`) for any dynamic content that incorporates user-provided text before inserting it into the DOM.
