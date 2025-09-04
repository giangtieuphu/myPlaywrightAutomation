import {test, expect, Locator} from '@playwright/test';
import { strict } from 'assert';

test.skip('Testing different dotenv data', async ({page}) => {

    await page.goto(process.env.BASE_URL as string);

    let myTitle: String = "My Account"

    const emailField:Locator = page.locator('#input-email');
    const passwordField:Locator = page.locator('#input-password');
    const loginButton:Locator = page.locator('input[value="Login"]');

    await page.locator('#input-email').fill(process.env.EMAIL as string);
    await page.locator('#input-password').fill(process.env.PASSWORD as string);
    await page.locator('input[value="Login"]').click();

    //expect(page).toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
    
    //expect(strict.equal(await page.title(), myTitle));
    
    expect(page).toHaveTitle(myTitle as string);

    await page.screenshot({path: 'screenshot.png'});
    await page.close()
});