import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export default class HomePage {
    private readonly homeURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

    private readonly homePageHeader = 'div[class="oxd-topbar-header"]';
    private readonly headerTitle = 'div[class="oxd-topbar-header-title"]';
    private readonly headerUserArea = 'span[class="oxd-userdropdown-tab"]';
    private readonly mainMenu = 'ul[class="oxd-main-menu"]';

    private readonly adminMenuLink = 'a[href="/web/index.php/admin/viewAdminModule"]';
    private readonly leaveMenuLink = 'a[href="/web/index.php/leave/viewLeaveModule"]';
    private readonly perfomanceMenuLink = 'a[href="/web/index.php/performance/viewPerformanceModule"]';
    private readonly dashboardMenuLink = 'a[href="/web/index.php/dashboard/index"]';
    private readonly maintenanceMenuLink = 'a[href="/web/index.php/maintenance/viewMaintenanceModule"]';
    private readonly userDropdownIcon = 'xpath=//i[contains(@class, "userdropdown-icon")]';

    private readonly logoutLink = 'a[role="menuitem"][href="/web/index.php/auth/logout"]';
    private readonly profilePicture = 'xpath=//span[@class="oxd-userdropdown-tab"]/img[@alt="profile picture"]'

    constructor ( public page : Page){

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

    async getProfilePictureLocator(): Promise<Locator> {
        return this.page.locator(this.profilePicture);
    }

    async goToAdminPage() {
        await this.page.locator(this.adminMenuLink).hover();
        await this.page.locator(this.adminMenuLink).focus();
        this.page.waitForTimeout(1000); // Wait for 1000 milliseconds
        await this.page.locator(this.adminMenuLink).click();
    }

    async logOut(): Promise<void> {
        await this.page.locator(this.userDropdownIcon).hover();
        await this.page.locator(this.userDropdownIcon).focus();
        await this.page.waitForTimeout(1000); // Wait for 1000 milliseconds
        await this.page.locator(this.userDropdownIcon).click();

        await this.page.locator(this.logoutLink).hover();
        await this.page.locator(this.logoutLink).focus();
        await this.page.waitForTimeout(1000); // Wait for 1000 milliseconds
        await this.page.locator(this.logoutLink).click();
    }
}