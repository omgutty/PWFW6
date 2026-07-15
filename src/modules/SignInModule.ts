import { Page, Locator, expect } from '@playwright/test';
import { Logger } from "../utils";
import { SignInPage ,PSOPage} from "../pages";
//import { PSOPage } from '../pages/PSOPage';
//import { SignInPage } from '../pages/SignInPage';

export class SignInModule {
    private page:Page;
    private siginpage:SignInPage;
    //private psopage:PSOPage
    private logger:Logger;

    constructor (page:Page){
        this.page= page;
        this.siginpage= new SignInPage(page);
        //this.psopage= new PSOPage(page);
        this.logger= Logger.create('Login Module')
    }

    async dologin(username:string,password:string):Promise<PSOPage>{
         this.logger.testStart('dologin');

        this.logger.step(1,'Navigate to Sign in page');
        await this.siginpage.navigate()

        this.logger.step(2, `enter username: ${username}`);
        await this.siginpage.enterusername(username);
        
        this.logger.step(3, `enter password: ***`);
        await this.siginpage.enterpassword(password);

        this.logger.step(4, 'Click login button');
        return await this.siginpage.clickonLoginbutton();

        // this.logger.step(5, 'Wait for navigation to PSO Page');
        // const psolabel=await psopage.fetchPSOPageLabel()
        // //expect(psolabel).toContain("Approved Route Overview")

        this.logger.testEnd('doLogin');
        // return psolabel;
        
    }


    async attemptInvalidLogin(username:string , password:string):Promise<string|null>{
        this.logger.testStart('attemptInvalidLogin');

        await this.siginpage.navigate();
        await this.siginpage.enterusername(username);
        await this.siginpage.enterpassword(password);
        await this.siginpage.clickonLoginbutton();

        // Assuming there's a method to get the error message from the SignInPage
        const errorMessage = await this.siginpage.getErrorMessage(); // You need to implement this method in SignInPage
        this.logger.info(`Error message received: ${errorMessage}`);
        this.logger.testEnd('attemptInvalidLogin');
        return errorMessage;
    }   
}