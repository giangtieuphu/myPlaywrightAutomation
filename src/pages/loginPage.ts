import { type Page, type Locator } from "@playwright/test"

export default class LoginPage {
    private readonly page : Page;
    private readonly loginForm : Locator
    private readonly usernameTextbox : Locator
    private readonly passwordTextbox : Locator
    private readonly loginButton : Locator
    private readonly loginFormLocator = 'form[action="/web/index.php/auth/validate"]'

    constructor(page: Page) { 
        this.page = page
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
        this.page.waitForTimeout(2000)  // Wait for 2000 milliseconds
        await this.usernameTextbox.fill(username) 
        this.page.waitForTimeout(2000)  // Wait for 2000 milliseconds
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordTextbox.focus() 
        this.page.waitForTimeout(2000)  // Wait for 2000 milliseconds
        await this.passwordTextbox.fill(password) 
        this.page.waitForTimeout(2000)  // Wait for 2000 milliseconds
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.focus() 
        this.page.waitForTimeout(2000)  // Wait for 2000 milliseconds
        await this.loginButton.click() 
        this.page.waitForTimeout(2000)  // Wait for 2000 milliseconds
    }

    async login (username: string, password: string): Promise<void> {
        await this.waitForLoginForm() 
        await this.fillUsername(username) 
        await this.fillPassword(password) 
        await this.clickLoginButton()  
    }

    async returnPageObject() : Promise<Page> {
        return this.page 
    }
}