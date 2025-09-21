import {test, expect, Locator} from '@playwright/test';
import { strict } from 'assert';

test('Testing different dotenv data', async ({page}) => {

    await page.goto(process.env.BASE_URL as string);

    const myTitle = "My Account";
    const emailField:Locator = page.locator('#input-email');
    const passwordField:Locator = page.locator('#input-password');
    const loginButton:Locator = page.locator('input[value="Login"]');

    await emailField.fill(process.env.MYEMAIL as string);
    await passwordField.fill(process.env.MYPASSWORD as string);
    await loginButton.click();

    await expect(page).toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account');

    await expect(page).toHaveTitle(myTitle);

    await page.screenshot({path: 'screenshots/naveenautomationlabs.png'});
    await page.close()
});