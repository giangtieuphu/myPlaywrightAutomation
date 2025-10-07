import {expect, test} from '@playwright/test'
import {faker} from '@faker-js/faker'

const firstname = faker.person.firstName()
const lastname = faker.person.lastName()
const username = faker.internet.username()
const password = faker.internet.password()
const fakeSSN = `${faker.string.numeric(3)}-${faker.string.numeric(2)}-${faker.string.numeric(4)}`
const streetAddress = faker.location.streetAddress()
const city = faker.location.city()
const state = faker.location.state()
const zipCode = faker.location.zipCode()
const phoneNumber = faker.phone.number()

test('Register a new user - Just run one time!', async ({page}) => {
    await page.goto('https://parabank.parasoft.com/')
    const registerLink = page.getByRole('link', { name: 'Register' })
    await registerLink.click()
    await page.waitForLoadState('networkidle')

    await page.locator('[id="customer.firstName"]').fill(firstname)
    await page.locator('[id="customer.lastName"]').fill(lastname)
    await page.locator('[id="customer.address.street"]').fill(streetAddress)
    await page.locator('[id="customer.address.city"]').fill(city)
    await page.locator('[id="customer.address.state"]').fill(state)
    await page.locator('[id="customer.address.zipCode"]').fill(zipCode)
    await page.locator('[id="customer.phoneNumber"]').fill(phoneNumber)
    await page.locator('[id="customer.ssn"]').fill(fakeSSN)
    await page.locator('[id="customer.username"]').fill(username)
    await page.locator('[id="customer.password"]').fill(password)
    await page.locator('[id="repeatedPassword"]').fill(password)

    await page.getByRole('button', { name: 'Register' }).click()
    await page.waitForLoadState('networkidle')

    console.log(await page.locator('h1[class="title"]').innerText())
    expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible()
})

test('Playwright select with Parabank app', async ({page}) => {
    await page.goto('https://parabank.parasoft.com/')
    await page.waitForLoadState('networkidle')

    const usernameTextbox = page.locator('input[name="username"]')
    const passwordTextbox = page.locator('input[name="password"]')
    const loginButton = page.locator('input[value="Log In"]')

    const accountOverviewLink = 'a[href="overview.htm"]'
    const accountDetailsLink = '//table[@id="accountTable"]//a'
    const activityPeriod = 'select[id="month"]'
    const activityPeriodOptions = '//select[@id="month"]/option'
    const transactionType = 'select[id="transactionType"]'
    const transactionTypeOptions = '//select[@id="transactionType"]/option'

    await usernameTextbox.fill(username)
    await passwordTextbox.fill(password)
    await loginButton.click()
    await page.waitForLoadState('networkidle')
    await page.locator(accountOverviewLink).click()
    await page.waitForLoadState('networkidle')
    await page.locator(accountDetailsLink).click()
    await page.waitForLoadState('networkidle')

    await page.locator(activityPeriod).selectOption('December')
    await page.locator(transactionType).selectOption('Debit')

    const months = ['All','January','February','March','April',
                    'May','June','July','August','September',
                    'October','November','December']
    await expect(page.locator(activityPeriodOptions)).toHaveText(months)
    await expect(page.locator(transactionTypeOptions)).toHaveText(['All', 'Credit', 'Debit'])

    await page.close()
})

