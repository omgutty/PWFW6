import { Page } from "@playwright/test";

    export class Header {
        
        constructor(private page:Page) {   }
    private mainMenuItem = (name: string) =>
            this.page.locator(`#menu-nav > li > a[title="${name}"]`);
    private logoutButton = () =>this.page.locator('.header-logout');
    private subMenuItem = (name: string) =>
             this.page.locator('#menu-nav ul[data-sort] li a', { hasText:name });

    //Hover over a main menu item to reveal its sub-menu
    async hoverMainMenu(mainmenuName:string):Promise <void>{
        await this.mainMenuItem(mainmenuName).hover();
    }

    //click a sub-mnu link by its visible text
    async clickSubMenu(subMenuName:string): Promise<void> {
        await this.subMenuItem(subMenuName).click();
    }

    /** Convenience: hover main menu, then click sub-menu item */
        async navigateToSubModule(mainMenuName: string, subModuleName:string): Promise<void> {
            await this.hoverMainMenu(mainMenuName);
            await this.page.waitForTimeout(300);
            await this.clickSubMenu(subModuleName);
            await this.page.waitForLoadState();
        }

    async logout(): Promise<void>{
        await  this.logoutButton().click();
    }


}