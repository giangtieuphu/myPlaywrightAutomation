import {test} from '@playwright/test'

test('Drag drop action +++ 03 levels of screenshot', async ({page}) => {
    await page.goto('https://jqueryui.com/droppable/')
    await page.waitForFunction("document.readyState === 'complete'")
    
    // All the ways work
    const myFrame = page.frameLocator('iframe[src="/resources/demos/droppable/default.html"]')
    // const myFrame = page.frameLocator('iframe')
    // const myFrame = page.frameLocator('//iframe[@class="demo-frame"]')
    // const myFrame = page.frameLocator('iframe.demo-frame')
    // const myFrame = page.frameLocator('[class="demo-frame"]')

    await myFrame.locator('#draggable').dragTo(myFrame.locator('#droppable'))
    
    await page.locator('//iframe[@class="demo-frame"]').screenshot({path: 'screenshots/dragdrop_iframe.png'})
    await page.screenshot({path: 'screenshots/dragdrop_pageview.png'})
    await page.screenshot({path: 'screenshots/dragdrop_fullpage.png', fullPage: true})

    page.close()
})