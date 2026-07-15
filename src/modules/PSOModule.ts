import { Page } from "@playwright/test";
import { SignInPage, PSOPage } from '../pages';
import { Logger } from '../utils/Logger';
import { PSDPage } from "../pages/PSDPage";

export class PSOModule {

    private page:Page;
    //private siginpage:SignInPage;
    private psopage:PSOPage
    private logger:Logger;

    constructor(page:Page){
        this.page=page;
        //this.siginpage= new SignInPage(page);
        this.psopage= new PSOPage(page);
        this.logger= Logger.create('PSOModule ')
    }

    async getRunningBusCount():Promise<number>{
        this.logger.testStart('geting the Running Bus count from PSO Page');
        this.logger.step(1,'Fetch the Number of buses running')
        const text= await this.psopage.fetchNumberOfBuses();
        this.logger.info(`Total Running bus count is : ${text}`);
        
         return parseInt(text,10)
    }

    async getTargetBusCount():Promise<number>{
        this.logger.testStart('getting the totalcount of bus from pso page');
        this.logger.step(1, 'Fetch the Total count of buses ');
        const text= await this.psopage.fetchtargetnumber();
        this.logger.info(`Total Target bus count is : ${text}`);
        return parseInt(text,10);
    }

    async navigatetoPSDfromPSO():Promise<PSDPage>{
        this.logger.testStart('Navigating PSD from PSO');
        this.logger.step(1, 'Navigating to PSD');
        return await this.psopage.clickonfirstroute(); 
    }


}
