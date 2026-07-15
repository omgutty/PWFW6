import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { PSOPage } from "./PSOPage";


export class SignInPage extends BasePage{

    // private usernameInput:Locator;
    // private passwordInput:Locator;
    // private Loginbutton:Locator;


    constructor (page:Page){
        super(page);
        // this.usernameInput=  page.locator('#UserName');
        // this.passwordInput= page.locator('#Password');
        // this.Loginbutton=  page.getByRole('button', { name: 'Login' })
    }

    usernameInputA= ()=>this.page.locator('#UserName');
    passwordInputA= ()=>this.page.locator('#Password');
    LoginbuttonA= ()=>this.page.getByRole('button', { name: 'Login' });

     // ─── ACTIONS 
    async navigate(): Promise<void>{
        await this.page.goto('/');// {waitUntil:'domcontentloaded'});
        
    }

     /**
     * Entering user name 
     */
    async enterusername(username:string ):Promise<void>{
        await this.usernameInputA().fill(username);
    }

    /**
     * Entering password
     */
    async enterpassword(password:string){
        await this.passwordInputA().fill(password);
    }

    async clickonLoginbutton(){
        await this.LoginbuttonA().click();
        return new PSOPage(this.page);
    }
    // async login(username:string, password:string):Promise<void>{
        
    //     await this.usernameInput.fill(username);
    //     await this.passwordInput.fill(password);
    //     await this.Loginbutton.click();
    // }


    

}