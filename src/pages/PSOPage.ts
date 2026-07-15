import { Page,expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { PSDPage } from './PSDPage';


export class PSOPage extends BasePage{
    
    constructor(page:Page){
        super(page);
    }

    psolabel= ()=>this.page.locator('.RunningBoards-header');
    totalnumberofbuses= ()=>this.page.locator("tr[class='tbl-head-gradient'] td:nth-child(5)")
    totaltargetnumber = ()=>this.page.locator("tr[class='tbl-head-gradient'] td:nth-child(6)");
    noOfBusfilter=()=>this.page.getByRole('link', {name: 'No. of Buses'});
    firstroute= ()=>this.page.locator('tr').locator('td').nth(2);

    

    async fetchPSOPageLabel():Promise<string|null>{
        //return await this.psolabel().textContent();
        await expect(this.psolabel()).toBeVisible();
        return await this.psolabel().textContent()
    }

    async fetchNumberOfBuses():Promise<string>{
       return  await this.gettext(this.totalnumberofbuses())
    }

    async fetchtargetnumber():Promise<string>{
       return  await this.gettext(this.totaltargetnumber())
    }

    async clickonfirstroute():Promise<PSDPage>{
        await this.firstroute().click();
        return new PSDPage(this.page);
    }
}