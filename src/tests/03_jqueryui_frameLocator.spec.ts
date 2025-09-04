import { expect, test } from '@playwright/test';

test('jQueryUI SelectMenu Test', async ({ page }) => {
    await page.goto('https://jqueryui.com/selectmenu/');
    
    // const frameLocator = page.locator('//iframe[@class="demo-frame"]');
    // const frame = page.frameLocator('//iframe[@class="demo-frame"]');

    const frame = page.frameLocator('iframe.demo-frame');

    const speedMenu = frame.locator('#speed-button');
    const fileMenu = frame.locator('#files-button');
    const numberMenu = frame.locator('#number-button');
    const titleMenu = frame.locator('#salutation-button');

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

    await numberMenu.click();
    await frame.locator('//div[.="19"]').click();

    await titleMenu.click();
    await frame.locator('//div[.="Other"]').click();    
});

