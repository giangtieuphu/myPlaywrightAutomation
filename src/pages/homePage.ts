import { Page } from "@playwright/test"
import Logger from "../utils/Logger"

export default class HomePage {
    private readonly page : Page
    private readonly homeURL 
    private readonly homePageHeader
    private readonly headerTitle
    private readonly headerUserArea
    private readonly mainMenu
    private readonly adminMenuLink
    private readonly leaveMenuLink
    private readonly perfomanceMenuLink
    private readonly dashboardMenuLink
    private readonly maintenanceMenuLink
    private readonly userDropdownIcon 
    private readonly logoutLink
    private readonly profilePicture

    constructor (page: Page){
        this.page = page
        this.homeURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
        this.homePageHeader = 'div[class="oxd-topbar-header"]'
        this.headerTitle = 'div[class="oxd-topbar-header-title"]'
        this.headerUserArea = 'span[class="oxd-userdropdown-tab"]'
        this.mainMenu = 'ul[class="oxd-main-menu"]'
        this.adminMenuLink = 'a[href="/web/index.php/admin/viewAdminModule"]'
        this.leaveMenuLink = 'a[href="/web/index.php/leave/viewLeaveModule"]'
        this.perfomanceMenuLink = 'a[href="/web/index.php/performance/viewPerformanceModule"]'
        this.dashboardMenuLink = 'a[href="/web/index.php/dashboard/index"]'
        this.maintenanceMenuLink = 'a[href="/web/index.php/maintenance/viewMaintenanceModule"]'
        this.userDropdownIcon = '//i[contains(@class, "userdropdown-icon")]'
        this.logoutLink = 'a[role="menuitem"][href="/web/index.php/auth/logout"]'
        this.profilePicture = '//span[@class="oxd-userdropdown-tab"]/img[@alt="profile picture"]'
    }
    async navigateToHomePage() : Promise<void> {
        await this.page.goto(this.homeURL)
        Logger.info(`Navigated to ${this.homeURL}`) 
        this.waitForHomePageLoad()
    }
    async waitForHomePageLoad(): Promise<void> {
        await this.page.waitForSelector(this.homePageHeader)
        await this.page.waitForSelector(this.headerTitle)
        await this.page.waitForSelector(this.headerUserArea)
        await this.page.waitForSelector(this.mainMenu)
        Logger.info('Home page is loaded successfully')
    }
    async isProfilePictureVisible(): Promise<boolean> {
        const isVisible = (this.page.locator(this.profilePicture)).isVisible()
        Logger.info('Checked for profile picture visibility')
        return isVisible
    }
    async getProfilePicture(): Promise<string> {
        return this.profilePicture
    }
    async goToAdminPage(): Promise<void> {
        await this.page.locator(this.adminMenuLink).hover()
        await this.page.locator(this.adminMenuLink).focus()
        await this.page.waitForTimeout(1000) // Wait for 1000 milliseconds
        await this.page.locator(this.adminMenuLink).click()
        await this.page.waitForTimeout(1000) // Wait for 1000 milliseconds
    }
    async logOut(): Promise<void> {
        await this.page.locator(this.userDropdownIcon).hover()
        await this.page.locator(this.userDropdownIcon).focus()
        await this.page.waitForTimeout(1000) // Wait for 1000 milliseconds
        await this.page.locator(this.userDropdownIcon).click()
            .catch((error) => {
                Logger.error(`Error clicking user dropdown icon: ${error}`)
                throw error;
            }).then(() => Logger.info('User dropdown icon clicked'))
        await this.page.waitForTimeout(1000) // Wait for 1000 milliseconds

        await this.page.locator(this.logoutLink).hover()
        await this.page.locator(this.logoutLink).focus()
        await this.page.waitForTimeout(1000) // Wait for 1000 milliseconds
        await this.page.locator(this.logoutLink).click()
            .catch((error) => {
                Logger.error(`Error clicking logout link: ${error}`)
                throw error;
            }).then(() => Logger.info('Logout link clicked'))
        await this.page.waitForTimeout(1000) // Wait for 1000 milliseconds
        Logger.info('Logged out from OrangeHRM')
    }
    async returnPageObject(): Promise<Page> {
        return this.page
    }
}