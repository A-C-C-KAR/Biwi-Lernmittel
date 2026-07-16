import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(record_video_dir="videos/")
        page = await context.new_page()

        await page.goto("http://localhost:8000")

        # Go to 'Fragenkatalog' tab
        await page.click("text=Fragenkatalog")
        await page.wait_for_selector("#categories-container")

        # Press Tab to navigate to the first accordion button
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")

        # Verify the button is focused
        focused = await page.evaluate("document.activeElement.tagName")
        print(f"Focused element: {focused}")

        is_expanded = await page.evaluate("document.activeElement.getAttribute('aria-expanded')")
        print(f"Aria-expanded before click: {is_expanded}")

        # Press Enter to open
        await page.keyboard.press("Enter")
        await page.wait_for_timeout(500)

        is_expanded_after = await page.evaluate("document.activeElement.getAttribute('aria-expanded')")
        print(f"Aria-expanded after click: {is_expanded_after}")

        # Take screenshot of open state with focus
        await page.screenshot(path="screenshot_accordion_open.png")

        # Press Enter to close
        await page.keyboard.press("Enter")
        await page.wait_for_timeout(500)

        is_expanded_closed = await page.evaluate("document.activeElement.getAttribute('aria-expanded')")
        print(f"Aria-expanded after second click: {is_expanded_closed}")

        # Click expand all
        await page.click("text=Alle öffnen")
        await page.wait_for_timeout(500)

        first_btn_expanded = await page.evaluate("document.querySelector('[id^=\"trigger-\"]').getAttribute('aria-expanded')")
        print(f"Aria-expanded after expand all: {first_btn_expanded}")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
