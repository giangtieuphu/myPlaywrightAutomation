import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export default class LoginPage {

    private readonly usernameTextbox = 'input[placeholder="Username"]';
    private readonly passwordTextbox = 'input[placeholder="Password"]';
    private readonly loginButton = 'button[type="submit"]';
    private readonly loginForm = 'form[action="/web/index.php/auth/validate"][method="post"]';

    constructor(public page: Page) { 
    }

    async goToLoginPage(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForLoginForm(): Promise<void> {
        await this.page.waitForSelector(this.loginForm);
        await this.page.waitForSelector(this.usernameTextbox);
        await this.page.waitForSelector(this.passwordTextbox);
        await this.page.waitForSelector(this.loginButton);
    }

    async isLoginFormVisible(): Promise<boolean> {
        return (this.page.locator(this.loginForm)).isVisible();
    }       

    async getLoginFormLocator(): Promise<Locator> {
        return this.page.locator(this.loginForm);
    }

    async fillUsername(username: string): Promise<void> {
        await this.page.dblclick(this.usernameTextbox);
        await this.page.locator(this.usernameTextbox).clear();
        await this.page.locator(this.usernameTextbox).focus();
        this.page.waitForTimeout(1000); // Wait for 1000 milliseconds
        await this.page.fill(this.usernameTextbox, username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.page.dblclick(this.passwordTextbox);
        await this.page.locator(this.passwordTextbox).clear();
        await this.page.locator(this.passwordTextbox).focus();
        this.page.waitForTimeout(1000); // Wait for 1000 milliseconds
        await this.page.fill(this.passwordTextbox, password);
    }

    async clickLoginButton(): Promise<void> {
        await this.page.locator(this.loginButton).hover();
        await this.page.locator(this.loginButton).focus();
        this.page.waitForTimeout(1000); // Wait for 1000 milliseconds
        await this.page.click(this.loginButton);
    }

    async login (username: string, password: string): Promise<void> {
        await this.waitForLoginForm();
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton(); 
    }

    async returnPageObject(): Promise<Page> {
        return this.page;
    }
}