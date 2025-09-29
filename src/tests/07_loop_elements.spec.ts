import { test } from "@playwright/test"

test("Loop through elements", async ({ page }) => {

    await page.goto("https://github.com/giangtieuphu")

    const repolinks = page.$$('[class="repo"]')

    for (const repoLink of await repolinks) {
        console.log(await repoLink.textContent())
    }
    page.close()
})
