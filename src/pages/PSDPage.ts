import { Page,expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PSDPage extends BasePage{
    
    constructor(page:Page){
        super(page);
    }

    psdpagelabel= ()=>this.page.locator('div.empty-box');
    
    async psdpagelabelloader():Promise<string|null> {
        await expect(this.psdpagelabel()).toBeVisible();
        return this.psdpagelabel().textContent()
    }
}