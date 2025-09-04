import {test} from '@playwright/test';

test('Testing drag drop mouse actions', async ({page}) => {
    
    await page.goto('https://jqueryui.com/droppable/');  
    
    // All the ways work
    const myFrame = page.frameLocator('iframe[src="/resources/demos/droppable/default.html"]');
    // const myFrame = page.frameLocator('iframe');
    // const myFrame = page.frameLocator('//iframe[@class="demo-frame"]');
    // const myFrame = page.frameLocator('iframe.demo-frame');
    // const myFrame = page.frameLocator('[class="demo-frame"]');


    // const dragMe = myFrame.locator('#draggable');
    // const dropHere = myFrame.locator('#droppable');

    // await dragMe.dragTo(dropHere);
    // await page.waitForTimeout(3000);

    await myFrame.locator('#draggable').dragTo(myFrame.locator('#droppable'));
    
    await page.locator('//iframe[@class="demo-frame"]').screenshot({path: 'screenshots/dragdrop_iframe.png'});
    await page.screenshot({path: 'screenshots/dragdrop_pageview.png'});
    await page.screenshot({path: 'screenshots/dragdrop_fullpage.png', fullPage: true});

    page.close();
});