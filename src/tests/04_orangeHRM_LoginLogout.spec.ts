import { test, expect, Locator } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';

test('orangeHRM Login & Logout test', async ({ page }) => {
  const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  const homeURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
  const userManagementHeaderLocator = '//h6[text()="User Management"]'
  const loginForm = 'form[action="/web/index.php/auth/validate"][method="post"]';

  let loginPage = new LoginPage(page);

  await test.step('Go to OrangeHRM login page', async () => {
    await loginPage.goToLoginPage(baseURL);
    await loginPage.waitForLoginForm();
  });
  
  await test.step('Login to OrangeHRM with admin account', async() => {
    await loginPage.login('Admin', 'admin123');
  });

  let homePage = new HomePage(page);

  await test.step('Verify the presence of profile picture is displayed ', async() => {
    await homePage.waitForHomePageLoad();
    expect(await homePage.isProfilePictureVisible()).toBeTruthy();
  });

  await test.step('Verify the URL after login', async() => {
    await expect(page).toHaveURL(homeURL);
  });

  await test.step('Going to Admin page', async() => {
    await homePage.goToAdminPage();
  });

  await test.step('Verify the User Management header is visible', async() => {
    await expect(page.locator(userManagementHeaderLocator)).toBeVisible();
  });

  await test.step('Logout from OrangeHRM', async() => {
    await homePage.logOut();
  });

  await test.step('Verify that the user is logged out successfully with the presence of the login panel', async() => {
    await expect(page.locator(loginForm)).toBeVisible();
  });

  // Close the browser
  await page.close();
});