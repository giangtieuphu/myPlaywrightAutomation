import {test, expect, Locator} from '@playwright/test'

test('Getting information from .env file', async ({page}) => {
    const myTitle = "My Account"
    const emailField: Locator = page.locator('#input-email')
    const passwordField: Locator = page.locator('#input-password')
    const loginButton: Locator = page.locator('input[value="Login"]')

    await page.goto(process.env.OPENCART_BASE_URL as string)
    await emailField.pressSequentially(process.env.OPENCART_EMAIL as string, {delay: 100})
    await passwordField.pressSequentially(process.env.OPENCART_PASSWORD as string, {delay: 100})
    await loginButton.click()

    await expect(page).toHaveURL(process.env.OPENCART_HOME_URL as string)
    await expect(page).toHaveTitle(myTitle)

    await page.screenshot({path: 'screenshots/naveenautomationlabs.png'})
    await page.close()
})