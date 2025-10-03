import { test } from "@playwright/test"

test("Loop through elements", async ({ page }) => {
    await page.goto("https://github.com/giangtieuphu")
    const repolinks = await page.$$('[class="repo"]')
    for (const repoLink of repolinks) {
        let txt: string = (await repoLink.textContent()) ?? ""
        console.log(txt.trim())
    }
    await page.close()
})
