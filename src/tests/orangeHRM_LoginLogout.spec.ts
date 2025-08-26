import { test, expect, Locator } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';

test('orangeHRM Login & Logout test', async ({ page }) => {
  const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  const homeURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
  const userManagementHeaderLocator = 'xpath=//h6[text()="User Management"]'
  const loginForm = 'form[action="/web/index.php/auth/validate"][method="post"]';

  let loginPage = new LoginPage(page);

  await loginPage.goToLoginPage(baseURL);
  await loginPage.waitForLoginForm();
  await loginPage.login('Admin', 'admin123');

  // Verify that the user is logged in successfully with the presence of the profile picture
  let homePage = new HomePage(page);
  await homePage.waitForHomePageLoad();
  expect(await homePage.isProfilePictureVisible()).toBeTruthy();

  // Verify the URL after login
  await expect(page).toHaveURL(homeURL);

  
  // Verify that the User Management header is visible
  await homePage.goToAdminPage();
  await expect(page.locator(userManagementHeaderLocator)).toBeVisible();

  // Logout from the application
  await homePage.logOut();

  // Verify that the user is logged out successfully with the presence of the login panel
  await expect(page.locator(loginForm)).toBeVisible();

  // Close the browser
  await page.close();
});