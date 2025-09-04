import {expect, test} from '@playwright/test';

test('Testing radio & check boxes', async ({page}) => {
    
    await page.goto('https://jqueryui.com/checkboxradio/');  
    
    // All the ways work
    // const myFrame = page.frameLocator('iframe[src="/resources/demos/droppable/default.html"]');
    // const myFrame = page.frameLocator('iframe');
    // const myFrame = page.frameLocator('//iframe[@class="demo-frame"]');
    // const myFrame = page.frameLocator('iframe.demo-frame');
    // const myFrame = page.frameLocator('[class="demo-frame"]');
    
    const myFrame = page.frameLocator('iframe[class="demo-frame"]');

    const radioButton1 = myFrame.locator('label[for="radio-1"]');
    const radioButton2 = myFrame.locator('label[for="radio-2"]');
    const radioButton3 = myFrame.locator('label[for="radio-3"]');

    const checkBox1 = myFrame.locator('label[for="checkbox-1"]');
    const checkBox2 = myFrame.locator('label[for="checkbox-2"]');
    const checkBox3 = myFrame.locator('label[for="checkbox-3"]');
    const checkBox4 = myFrame.locator('label[for="checkbox-4"]');

    const checkBoxNested1 = myFrame.locator('label[for="checkbox-nested-1"]');
    const checkBoxNested2 = myFrame.locator('label[for="checkbox-nested-2"]');
    const checkBoxNested3 = myFrame.locator('label[for="checkbox-nested-3"]');
    const checkBoxNested4 = myFrame.locator('label[for="checkbox-nested-4"]');

    await expect(radioButton1).not.toBeChecked(); 
    await radioButton1.check();
    await expect(radioButton1).toBeChecked();

    await expect(radioButton2).not.toBeChecked();
    await radioButton2.check();
    await expect(radioButton2).toBeChecked();

    await expect(radioButton3).not.toBeChecked();  
    await radioButton3.check();
    await expect(radioButton3).toBeChecked();


    await expect(checkBox1).not.toBeChecked();
    await checkBox1.check();
    await expect(checkBox1).toBeChecked();  

    await expect(checkBox2).not.toBeChecked();
    await checkBox2.check();
    await expect(checkBox2).toBeChecked();  
    
    await expect(checkBox3).not.toBeChecked();
    await checkBox3.check();
    await expect(checkBox3).toBeChecked();  
    
    await expect(checkBox4).not.toBeChecked();
    await checkBox4.check();
    await expect(checkBox4).toBeChecked();
    

    await expect(checkBoxNested1).not.toBeChecked();
    await checkBoxNested1.check();
    await expect(checkBoxNested1).toBeChecked();

    await expect(checkBoxNested2).not.toBeChecked();
    await checkBoxNested2.check();
    await expect(checkBoxNested2).toBeChecked();

    await expect(checkBoxNested3).not.toBeChecked();
    await checkBoxNested3.check();
    await expect(checkBoxNested3).toBeChecked();

    await expect(checkBoxNested4).not.toBeChecked();
    await checkBoxNested4.check();
    await expect(checkBoxNested4).toBeChecked();

    await page.screenshot({path: 'screenshots/radio_checkbox.png'});

    page.close();
});