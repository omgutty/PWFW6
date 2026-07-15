import { Page, Locator } from "@playwright/test";

    export class Header {
        
        constructor(private page:Page) {
        
        }

    private menuItem = (name:string) =>this.page.locator(`.icarus-header a:has-text("${name}")`);
    private logoutButton = () =>this.page.locator('.header-logout');


    async navigateTo(section:string): Promise<void> {
        await this.menuItem(section).click();
    }

    async logout(): Promise<void>{
        await  this.logoutButton().click();
    }


}