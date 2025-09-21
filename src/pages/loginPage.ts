import { type Page, type Locator } from "@playwright/test"

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
        this.usernameTextbox = this.page.getByRole('textbox', { name: 'Username' })
        this.passwordTextbox = this.page.getByRole('textbox', { name: 'Password' })
        this.loginButton = this.page.getByRole('button', { name: 'Login' })
    } 
    async goToLoginPage(url: string): Promise<void> {
        await this.page.goto(url) 
    }
    async waitForLoginForm(): Promise<void> {
        await this.page.waitForSelector(this.loginFormLocator)
    }
    async isLoginFormVisible(): Promise<boolean> {
        return this.loginForm.isVisible()
    }
    async fillUsername(username: string): Promise<void> {
        await this.usernameTextbox.focus()
        await this.usernameTextbox.fill(username) 
    }
    async fillPassword(password: string): Promise<void> {
        await this.passwordTextbox.focus()
        await this.passwordTextbox.fill(password) 
    }
    async clickLoginButton(): Promise<void> {
        await this.loginButton.focus() 
        await this.loginButton.click() 
    }
    async login (username: string, password: string): Promise<void> {
        await this.fillUsername(username) 
        await this.fillPassword(password) 
        await this.clickLoginButton()  
    }
    async returnPageObject(): Promise<Page> {
        return this.page 
    }
}