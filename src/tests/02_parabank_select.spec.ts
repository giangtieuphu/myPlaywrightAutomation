import {expect, test} from '@playwright/test'

test('Register a new user - Just run one time!', async ({page}) => {
    await page.goto('https://parabank.parasoft.com/')
    const registerLink = page.getByRole('link', { name: 'Register' })

    await registerLink.click()
    await page.waitForFunction("document.readyState === 'complete'")
    await page.locator('[id="customer.firstName"]').fill('Automation')
    await page.locator('[id="customer.lastName"]').fill('Tester')
    await page.locator('[id="customer.address.street"]').fill('123 Testing St')
    await page.locator('[id="customer.address.city"]').fill('Testing City')
    await page.locator('[id="customer.address.state"]').fill('Testing State')
    await page.locator('[id="customer.address.zipCode"]').fill('12345')
    await page.locator('[id="customer.phoneNumber"]').fill('123-456-7890')
    await page.locator('[id="customer.ssn"]').fill('123-45-6789')
    await page.locator('[id="customer.username"]').fill('automationtester')
    await page.locator('[id="customer.password"]').fill('Pwd!@#123')
    await page.locator('[id="repeatedPassword"]').fill('Pwd!@#123')
    await page.getByRole('button', { name: 'Register' }).click()
    await page.waitForFunction("document.readyState === 'complete'")
    
})

test('Playwright select with Parabank app', async ({page}) => {
    await page.goto('https://parabank.parasoft.com/')
    await page.waitForLoadState('networkidle');

    const username = page.locator('input[name="username"]')
    const password = page.locator('input[name="password"]')
    const loginButton = page.locator('input[value="Log In"]')

    const accountOverviewLink = 'a[href="overview.htm"]'
    const accountTable = 'table[id="accountTable"]'
    const accountDetailsLink = '//table[@id="accountTable"]//a'
    const activityTable = 'table[class="form_activity"]'
    const activityPeriod = 'select[id="month"]'
    const activityPeriodOptions = '//select[@id="month"]/option'
    const transactionType = 'select[id="transactionType"]'
    const transactionTypeOptions = '//select[@id="transactionType"]/option'

    await username.fill('automationtester')
    await password.fill('Pwd!@#123')
    await loginButton.click()
    await page.waitForFunction("document.readyState === 'complete'")

    await page.locator(accountOverviewLink).click()

    await page.waitForFunction("document.readyState === 'complete'")
    await page.locator(accountDetailsLink).click()

    await page.waitForFunction("document.readyState === 'complete'")
    await page.locator(activityPeriod).selectOption('December')
    await page.locator(transactionType).selectOption('Debit')

    await expect(page.locator(activityPeriodOptions)).toHaveText(['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
    await expect(page.locator(transactionTypeOptions)).toHaveText(['All', 'Credit', 'Debit'])

    await page.close()
})

