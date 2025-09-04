import {expect, test} from '@playwright/test';

test('Playwright select with Parabank app', async ({page}) => {
    await page.goto('https://parabank.parasoft.com/');

    const username = page.locator('input[name="username"]');
    const password = page.locator('input[name="password"]');
    const loginButton = page.locator('input[value="Log In"]');

    const accountOverviewLink = 'a[href="overview.htm"]';
    const accountTable = 'table[id="accountTable"]';
    const accountDetailsLink = '//table[@id="accountTable"]//a';
    const activityTable = 'table[class="form_activity"]';
    const activityPeriod = 'select[id="month"]';
    const activityPeriodOptions = '//select[@id="month"]/option';
    const transactionType = 'select[id="transactionType"]';
    const transactionTypeOptions = '//select[@id="transactionType"]/option';

    await username.fill('giangtieuphu');
    await password.fill('Dkmdkm!@#123');
    await loginButton.click();

    await page.waitForSelector(accountOverviewLink);
    await page.locator(accountOverviewLink).click();

    await page.waitForSelector(accountTable);
    await page.locator(accountDetailsLink).click();

    await page.waitForSelector(activityTable);
    await page.locator(activityPeriod).selectOption('December');
    await page.locator(transactionType).selectOption('Debit');

    await expect(page.locator(activityPeriodOptions)).toHaveText(['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    await expect(page.locator(transactionTypeOptions)).toHaveText(['All', 'Credit', 'Debit']);

});

