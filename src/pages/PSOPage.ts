import { Page,expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PSOPage extends BasePage{
    
    constructor(page:Page){
        super(page);
    }

    psolabel= ()=>this.page.locator('.RunningBoards-header');


    async fetchPSOPageLabel():Promise<void>{
        //return await this.psolabel().textContent();
        await expect(this.psolabel()).toBeVisible();
    }
}