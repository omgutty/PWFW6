import {test, expect} from '../fixtures';
import { config } from '../config';

 const admin = config.testUser;
 const invaliduser = config.invalidUser;


test.describe('@P1 @Smoke  Signin tests',()=>{
    test('login with valid credentials', async ({signinModule})=>{
        await test.step('Login with valid credentials', async ()=>{
        const pasopage =  await signinModule.dologin(admin.username,admin.password);
        const label = await pasopage.fetchPSOPageLabel();
        expect(label).toContain("Approved Route Overview");     
        })
    });

    test('login with invalid credentials', async ({signinModule})=>{
        await test.step('Login with invalid credentials', async ()=>{
        const errorMessage = await signinModule.attemptInvalidLogin(invaliduser.username, invaliduser.password);
            expect(errorMessage).toContain('The user name or password provided is incorrect.');
        })
    });

});

