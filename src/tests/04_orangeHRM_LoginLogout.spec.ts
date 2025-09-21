import { test, expect, Locator } from '@playwright/test'
import LoginPage from '../pages/loginPage'
import HomePage from '../pages/homePage'

test('orangeHRM Login & Logout test', async ({ page }) => {
  const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  const homeURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'

  let loginPage = new LoginPage(page)
  let homePage = new HomePage(page)

  await test.step('Go to OrangeHRM login page', async () => {
    await loginPage.goToLoginPage(baseURL)
    await loginPage.waitForLoginForm()
  })
  
  await test.step('Login to OrangeHRM with admin account', async() => {
    await loginPage.login('Admin', 'admin123')
  })

  await test.step('Verify the presence of profile picture is displayed ', async() => {
    await homePage.waitForHomePageLoad()
    expect(await homePage.isProfilePictureVisible()).toBeTruthy()
  })

  await test.step('Verify the URL after login', async() => {
    await expect(page).toHaveURL(homeURL)
  })

  await test.step('Logout from OrangeHRM', async() => {
    await homePage.logOut()
    loginPage = new LoginPage(await homePage.returnPageObject())
  })

  await test.step('Verify that the Profile Picture is not displayed', async() => {
    expect(await homePage.isProfilePictureVisible()).toBeFalsy()
  })

  await test.step('Verify that the login form is displayed', async() => {
    expect(await loginPage.isLoginFormVisible()).toBeTruthy()
  })
  
  await test.step('Close the browser', async() => { 
    page = await loginPage.returnPageObject()
    await page.close()
  })
})