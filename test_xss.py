from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # Click on nav-exam
        page.click("#nav-exam")

        # Start exam
        page.click("button:has-text('Klausur jetzt starten')")

        # Inject XSS payload into the first textarea
        page.fill("textarea", "<script>alert('XSS')</script><b>bold</b>")

        # Finish exam
        page.click("button:has-text('Klausur abgeben & Auswerten')")

        # Check if the payload is escaped in the results container
        results = page.inner_html("#exam-results-container")

        # Check if the payload is escaped
        if "&lt;script&gt;alert('XSS')&lt;/script&gt;&lt;b&gt;bold&lt;/b&gt;" in results:
            print("SUCCESS: Payload was correctly escaped.")
        else:
            print("ERROR: Payload was not escaped correctly.")
            print(results)

        browser.close()

if __name__ == "__main__":
    run()
