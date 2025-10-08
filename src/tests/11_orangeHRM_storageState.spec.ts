import {test, expect} from '@playwright/test'
import LoginPage from '../pages/loginPage'
import HomePage from '../pages/homePage'

const authFile = 'src/config/auth.json'

test('Saving OrangeHRM login session', async ({page}) => {
    const loginPage = new LoginPage(page)  
    await loginPage.goToLoginPage()
    await loginPage.login('Admin', 'admin123')
    const homePage = new HomePage(page) 
    await page.context().storageState({path: authFile})
    await page.close()
})

test('Opening orangeHRM with authentication file', async ({browser}) => {
    const context = await browser.newContext({ storageState: authFile })
    const page = await context.newPage()
    const homePage = new HomePage(page)
    await homePage.navigateToHomePage()
    expect.soft(await homePage.isProfilePictureVisible()).toBeTruthy()
    await page.close() 
})