import { Page } from "@playwright/test";
import { SignInPage, PSOPage } from '../pages';
import { Logger } from "../utils";

export class PSOModule {

    private page:Page;
    private siginpage:SignInPage;
    private psopage:PSOPage
    private logger:Logger;

    constructor(page:Page){
        this.page=page;
        this.siginpage= new SignInPage(page);
        this.psopage= new PSOPage(page);
        this.logger= Logger.create('PSOModule ')
    }

    async verifyTotalBusRunning(){
        this.psopage.fetchNumberOfBuses();
    }

    async verifytargetcount(){
        this.psopage.totaltargetnumber();
    }

}
