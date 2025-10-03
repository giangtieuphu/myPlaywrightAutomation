import {test, expect} from '@playwright/test' 
import users from '../data/vercel.json'

test('Read Test Data from JSON file', async ({page})=>{
    await page.goto('https://freelance-learn-automation.vercel.app/login')
    await page.getByRole('textbox', { name: 'Enter Email' }).fill(users[0].username)
    await page.getByRole('textbox', { name: 'Enter Password' }).fill(users[0].password)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await page.waitForFunction("document.readyState === 'complete'")

    expect(page).toHaveURL('https://freelance-learn-automation.vercel.app/')
    await page.close()
}) 

test.describe('Data Driven Login Logout Tests', () => {
    for (const user of users) {   
        test.describe(`Login Logout with user: ${user.username}`, () => {
            test(`Login Logout with user: ${user.username}`, async ({page}) => {
            await page.goto('https://freelance-learn-automation.vercel.app/login')
            await page.getByRole('textbox', { name: 'Enter Email' }).fill(user.username)
            await page.getByRole('textbox', { name: 'Enter Password' }).fill(user.password)
            await page.getByRole('button', { name: 'Sign in' }).click()
            
            await page.waitForLoadState('networkidle');
            expect(page).toHaveURL('https://freelance-learn-automation.vercel.app/')

            await page.getByRole('img', { name: 'menu' }).click()
            await page.getByRole('button', { name: 'Sign out' }).click()
            await page.waitForLoadState('networkidle');
            
            expect(page.locator('form[class="login-form"]')).toBeVisible()
            })
        })
    }

    
})