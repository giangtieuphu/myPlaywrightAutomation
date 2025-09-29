import { test, expect } from '@playwright/test'
import LoginPage from '../pages/loginPage'
import HomePage from '../pages/homePage'

test('orangeHRM Login Logout test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)
  await test.step('Go to OrangeHRM login page', async () => {
    await loginPage.goToLoginPage()
  })
  await test.step('Wait for the Login form', async () => {
    await loginPage.waitForLoginForm()
  })
  await test.step('Login to OrangeHRM with admin account', async() => {
    await loginPage.login('Admin', 'admin123')
  })
  await test.step('Wait for the Home page to load', async() => {
    await homePage.waitForHomePageLoad()
  })
  await test.step('Verify that the profile picture is displayed ', async() => {
    expect(await homePage.isProfilePictureVisible()).toBeTruthy()
  })
  await test.step('Verify the URL after login', async() => {
    await expect(page).toHaveURL(process.env.ORANGEHRM_HOME_URL as string)
  })
  await test.step('Logout from OrangeHRM', async() => {
    await homePage.logOut()
  })
  await test.step('Verify that the Profile Picture is not displayed anymore', async() => {
    expect(await homePage.isProfilePictureVisible()).toBeFalsy()
  })
  await test.step('Verify that the login form is displayed', async() => {
    expect(await loginPage.isLoginFormVisible()).toBeTruthy()
  })
  await page.close()
})