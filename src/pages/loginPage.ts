import { type Page, type Locator } from "@playwright/test"
import Logger from "../utils/Logger";

export default class LoginPage {
    readonly page: Page;
    readonly loginForm: Locator
    readonly usernameTextbox: Locator
    readonly passwordTextbox: Locator
    readonly loginButton: Locator
    readonly loginFormLocator: string

    constructor(page: Page) { 
        this.page = page
        this.loginFormLocator = 'form[action="/web/index.php/auth/validate"]'
        this.loginForm = this.page.locator(this.loginFormLocator)
        this.usernameTextbox = this.page.locator('input[name="username"]')
        this.passwordTextbox = this.page.locator('input[name="password"]')
        this.loginButton = this.page.locator('button[type="submit"]')
    } 
    async goToLoginPage(): Promise<void> {
        await this.page.goto(process.env.ORANGEHRM_BASE_URL as string)

        // await this.page.waitForFunction("document.readyState === 'complete'")
        await this.page.waitForLoadState('networkidle')

        Logger.info(`Navigated to ${process.env.ORANGEHRM_BASE_URL as string})`)
    }
    async waitForLoginForm(): Promise<void> {
        await this.page.waitForFunction("document.readyState === 'complete'")
        Logger.info('Login form is now visible')
    }
    async isLoginFormVisible(): Promise<boolean> {
        const isVisible = this.loginForm.isVisible()
        Logger.info('Checked for login form visibility')
        return isVisible
    }
    async fillUsername(username: string): Promise<void> {
        await this.usernameTextbox.focus()
        await this.usernameTextbox.pressSequentially(username, {delay: 100})
        Logger.info(`Username entered`)
    }
    async fillPassword(password: string): Promise<void> {
        await this.passwordTextbox.focus()
        await this.passwordTextbox.pressSequentially(password, {delay: 100})
                .catch((error) => {
                Logger.error(`Error entering password: ${error}`)
                throw error; 
                }).then(() => {Logger.info(`Password entered`)})
    }
    async clickLoginButton(): Promise<void> {
        await this.loginButton.focus() 
        await this.loginButton
            .click()
            .catch((error) => {
                Logger.error(`Error clicking login button: ${error}`)
                throw error; 
            }).then(() => Logger.info('Login button clicked'))
    }
    async login (username: string, password: string): Promise<void> {
        await this.fillUsername(username) 
        await this.fillPassword(password) 
        await this.clickLoginButton()
        await this.page.waitForFunction("document.readyState === 'complete'")
        Logger.info(`Logged in to orangeHRM with username: ${username}`)
    }
    async returnPageObject(): Promise<Page> {
        return this.page 
    }
}