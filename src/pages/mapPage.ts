import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MapPage extends BasePage {



    constructor(page: Page) {
        super(page);
    }

    mapviewlabel= ()=> this.page.locator("//section[@id='master-wrap']//label[1]");
   
    async fetchmappagelabel():Promise<string|null >{
        return this.mapviewlabel().textContent();
    }
}
