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
        this.userDropdownIcon = '//i[contains(@class,"userdropdown-icon")]'
        this.logoutLink = 'a[role="menuitem"][href="/web/index.php/auth/logout"]'
        this.profilePicture = 'img[class="oxd-userdropdown-img"]'
    }
    async navigateToHomePage() : Promise<void> {
        await this.page.goto(this.homeURL)
        Logger.info(`Navigated to ${this.homeURL}`) 
        await this.page.waitForFunction("document.readyState === 'complete'")
        await this.page.waitForLoadState('networkidle')
    }
    async waitForHomePageLoad(): Promise<void> {
        await this.page.waitForSelector(this.homePageHeader)
        await this.page.waitForSelector(this.headerTitle)
        await this.page.waitForSelector(this.headerUserArea)
        await this.page.waitForSelector(this.mainMenu)
        await this.page.waitForSelector(this.adminMenuLink)
        await this.page.waitForSelector(this.leaveMenuLink)
        await this.page.waitForSelector(this.perfomanceMenuLink)
        await this.page.waitForSelector(this.dashboardMenuLink)
        await this.page.waitForSelector(this.maintenanceMenuLink)
        await this.page.waitForFunction("document.readyState === 'complete'")
        await this.page.waitForLoadState('networkidle')
        Logger.info('Home page is loaded successfully')
    }
    async isProfilePictureVisible(): Promise<boolean> {
        const profilePics = await this.page.locator(this.profilePicture)
        const count = await profilePics.count()
        if (count > 0) {
            Logger.info('Profile picture is present in the DOM')
            return true
        } else {
            Logger.info('Profile picture is NOT present in the DOM')
            return false
        }
    }

    async getProfilePicture(): Promise<string> {
        return this.profilePicture
    }
    async goToAdminPage(): Promise<void> {
        await this.page.waitForSelector(this.adminMenuLink, { timeout: 3000 })
        await this.page.locator(this.adminMenuLink).hover()
        await this.page.locator(this.adminMenuLink).focus()
        await this.page.locator(this.adminMenuLink).click()
        await this.page.waitForFunction("document.readyState === 'complete'")
    }
    async logOut(): Promise<void> {
        await this.page.waitForSelector(this.userDropdownIcon, { timeout: 3000 })
        await this.page.locator(this.userDropdownIcon).hover()
        await this.page.locator(this.userDropdownIcon).focus()
        await this.page.locator(this.userDropdownIcon).click()
            .catch((error) => {
                Logger.error(`Error clicking user dropdown icon: ${error}`)
                throw error;
            }).then(() => Logger.info('User dropdown icon clicked'))
        
        await this.page.waitForSelector(this.logoutLink, { timeout: 3000 })
        await this.page.locator(this.logoutLink).hover()
        await this.page.locator(this.logoutLink).focus() 
        await this.page.locator(this.logoutLink).click()
            .catch((error) => {
                Logger.error(`Error clicking logout link: ${error}`)
                throw error;
            }).then(() => Logger.info('Logout link clicked'))

        await this.page.waitForFunction("document.readyState === 'complete'")
        await this.page.waitForLoadState('networkidle')
        Logger.info('Logged out from OrangeHRM')
    }
    async returnPageObject(): Promise<Page> {
        return this.page
    }
}