import { expect, test } from '@playwright/test';

test('jQueryUI SelectMenu Test', async ({ page }) => {
    await page.goto('https://jqueryui.com/selectmenu/');
    
    const frameLocator = page.locator('//iframe[@class="demo-frame"]')
    // const frame = page.frameLocator('//iframe[@class="demo-frame"]');
    // const frame = page.frameLocator('[class="demo-frame"]');
    const frame = page.frameLocator('iframe.demo-frame');

    // const speedMenu = frame.locator('#speed-button');
    // const fileMenu = frame.locator('#files-button');
    // const numberMenu = frame.locator('#number-button');
    // const titleMenu = frame.locator('#salutation-button');

    const speedMenu = frameLocator.contentFrame().locator('#speed-button');
    const fileMenu = frameLocator.contentFrame().locator('#files-button');
    const numberMenu = frameLocator.contentFrame().locator('#number-button');
    const titleMenu = frameLocator.contentFrame().locator('#salutation-button');

    await test.step('Verify the presence of all the select menus', async () => {
        await expect(speedMenu).toBeVisible();
        await expect(fileMenu).toBeVisible();
        await expect(numberMenu).toBeVisible();
        await expect(titleMenu).toBeVisible();
    });

    await speedMenu.click();
    await frame.locator('//div[.="Faster"]').click();

    await fileMenu.click();
    await frame.locator('//div[.="Some unknown file"]').click();

    // Choosing number 18 instead of 19 to make the screenshot comparison failed
    // Select number 19 to make the Screenshot comparison Passed
    await numberMenu.click();
    await frame.locator('//div[.="18"]').click();

    await titleMenu.click();
    await frame.locator('//div[.="Other"]').click();

    //await page.locator('//iframe[@class="demo-frame"]').screenshot({path: 'screenshots/03_jqueryui_selectMeunuFrame.png'})
    
    // Number menu is expected to be selected as 19, actually selected: 18. 
    // This picture compare is going to give a Failed result
    await expect(page.locator('//iframe[@class="demo-frame"]')).toHaveScreenshot('screenshots/03_jqueryui_selectMeunuFrame.png')

    await page.close()
});

