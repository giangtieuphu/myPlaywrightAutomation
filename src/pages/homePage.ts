import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { NOTFOUND, promises } from "dns";

export default class HomePage {

    readonly page : Page
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

    constructor (page : Page){
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
        await this.page.goto(this.homeURL);
        this.waitForHomePageLoad();
    }

    async waitForHomePageLoad(): Promise<void> {
        await this.page.waitForSelector(this.homePageHeader);
        await this.page.waitForSelector(this.headerTitle);
        await this.page.waitForSelector(this.headerUserArea);
        await this.page.waitForSelector(this.mainMenu);
    }

    async isProfilePictureVisible(): Promise<boolean> {
        return (this.page.locator(this.profilePicture)).isVisible();
    }

    async getProfilePicture(): Promise<string> {
        return this.profilePicture;
    }

    async goToAdminPage() {
        await this.page.locator(this.adminMenuLink).hover();
        await this.page.locator(this.adminMenuLink).focus();
        await this.page.waitForTimeout(2000); // Wait for 2000 milliseconds
        await this.page.locator(this.adminMenuLink).click();
        await this.page.waitForTimeout(2000); // Wait for 2000 milliseconds
    }

    async logOut(): Promise<void> {
        await this.page.locator(this.userDropdownIcon).hover();
        await this.page.locator(this.userDropdownIcon).focus();
        await this.page.waitForTimeout(2000); // Wait for 2000 milliseconds
        await this.page.locator(this.userDropdownIcon).click();
        await this.page.waitForTimeout(2000); // Wait for 2000 milliseconds

        await this.page.locator(this.logoutLink).hover();
        await this.page.locator(this.logoutLink).focus();
        await this.page.waitForTimeout(2000); // Wait for 2000 milliseconds
        await this.page.locator(this.logoutLink).click();
        await this.page.waitForTimeout(2000); // Wait for 2000 milliseconds
    }

    async returnPageObject(): Promise<Page> {
        return this.page
    }
}