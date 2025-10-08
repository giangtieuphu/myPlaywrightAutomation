import {test, expect} from '@playwright/test' 
import users from '../data/vercel.json'

test.describe('Data Driven Sign-Up Test', () => {
    for (const user of users) {
        test(`Sign-up for user: ${user.username}`, async ({ page }) => {
            await page.goto('https://freelance-learn-automation.vercel.app/signup')
            await page.waitForLoadState("networkidle")
            await page.getByRole('textbox', { name: 'Name' }).fill(user.fullname)
            await page.getByRole('textbox', { name: 'Email' }).fill(user.username)
            await page.getByPlaceholder('Password').fill(user.password)
            await page.getByRole('checkbox', { name: 'Cypress' }).check()
            await page.getByRole('checkbox', { name: 'SQL' }).check()
            await page.getByRole('checkbox', { name: 'AWS' }).check()
            await page.getByRole('checkbox', { name: 'WDIO' }).check()      
            await page.locator('#gender2').check()
            await page.locator('#state').selectOption('Andaman and Nicobar Islands')
            await page.locator('#hobbies').selectOption("Dancing")
            await page.getByRole('button', { name: 'Sign up' }).click()
            await page.waitForLoadState("networkidle")       

            expect(page.getByRole('heading', { name: 'Email already registered!' })).toBeVisible()
            
            await page.waitForTimeout(1000)
            await page.close()
        })
    }
})

test.describe('Data Driven Login-Logout Test', () => {
    for (const user of users) {
        test(`Login-Logout as: ${user.username}`, async ({ page }) => {
            await page.goto('https://freelance-learn-automation.vercel.app/login')
            await page.waitForLoadState("networkidle")

            await page.getByRole('textbox', { name: 'Enter Email' }).fill(user.username)
            await page.getByRole('textbox', { name: 'Enter Password' }).fill(user.password)
            await page.getByRole('button', { name: 'Sign in' }).click()
            await page.waitForLoadState('networkidle');
            
            expect.soft(page).toHaveURL('https://freelance-learn-automation.vercel.app')

            await page.getByRole('img', { name: 'menu' }).click()
            await page.getByRole('button', { name: 'Sign out' }).click()
            await page.waitForLoadState('networkidle');
            
            expect.soft(page.locator('form[class="login-form"]')).toBeVisible()
            
            await page.waitForTimeout(1000)
            await page.close()
        })
    }
})