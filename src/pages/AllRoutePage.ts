import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage'

export class AllRoutePage extends BasePage {

    constructor (page:Page){
        super(page);
    }

    allroutetitle= ()=>this.page.locator('.RunningBoards-header');
    allroutegobutton= ()=>this.page.getByRole('button',{name:'Go'})
    //firstviewlink= ()=> this.page.locator('a').filter({ hasText: 'View' }).first()
    
    // Scoped to the table with rows
    private routeRows= ()=> this.page.locator('table tbody tr')
     // First row's View link
    firstViewLink = () => this.routeRows().first().locator('td:nth-child(1) a');

    // First row's Route number (3rd column — "001F")
    firstRouteCode = () => this.routeRows().first().locator('td:nth-child(3)');


    async  getallroutetitile():Promise<string>{
        return await this.gettext(this.allroutetitle())
    }

    async clickFirstViewAndCaptureRoute(): Promise<string> {
        const routeCode = await this.gettext(this.firstRouteCode());
        await this.firstViewLink().click();
        return routeCode;
    }



}