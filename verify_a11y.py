from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:8000")
    page.wait_for_timeout(500)

    # Click "Jetzt lernen starten" to go to the learn view
    page.get_by_text("Jetzt lernen starten").click()
    page.wait_for_timeout(500)

    # Find the first accordion button by inspecting the new DOM element
    # We'll use the id we added: btn-toggle-1 (assuming id 1 exists)
    # Alternatively, focus the first button to show focus-visible styles
    first_btn = page.locator("button[id^='btn-toggle-']").first
    first_btn.focus()
    page.wait_for_timeout(500)

    # Take screenshot of focus state
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")

    # Click it to expand
    first_btn.click()
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
