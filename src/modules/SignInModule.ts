import { Page } from '@playwright/test';
import { Logger } from "../utils";
import { SignInPage ,PSOPage} from "../pages";

export class SignInModule {
    private page:Page;
    private siginpage:SignInPage;
    private logger:Logger;

    constructor (page:Page){
        this.page= page;
        this.siginpage= new SignInPage(page);
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
        const psopage = await this.siginpage.clickonLoginbutton();

        this.logger.testEnd('doLogin');
        return psopage;
    }


    async attemptInvalidLogin(username:string , password:string):Promise<string|null>{
        this.logger.testStart('attemptInvalidLogin');

        await this.siginpage.navigate();
        await this.siginpage.enterusername(username);
        await this.siginpage.enterpassword(password);
        await this.siginpage.clickonLoginbutton();

        const errorMessage = await this.siginpage.getErrorMessage();
        this.logger.info(`Error message received: ${errorMessage}`);
        this.logger.testEnd('attemptInvalidLogin');
        return errorMessage;
    }   
}