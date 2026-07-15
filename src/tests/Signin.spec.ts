import {test, expect} from '../fixtures';
import { UsersData } from '../testdata/type';
import usersRaw from '../testdata/user.json';

 const users = usersRaw as UsersData;
 const admin = users.ptaLive[0];
 const invaliduser= users.invalidUsers[0];


test.describe('@P1 @Smoke  Signin tests',()=>{
    test('login with valid credentials', async ({signinModule})=>{
        await test.step('Login with valid credentials', async ()=>{
        const pasopage =  await signinModule.dologin(admin.username,admin.password);
        expect(pasopage.fetchPSOPageLabel()).toContain("Approved Route Overview");     
        })
    });

    test('login with invalid credentials', async ({signinModule})=>{
        await test.step('Login with invalid credentials', async ()=>{
        const errorMessage = await signinModule.attemptInvalidLogin(invaliduser.username, invaliduser.password);
            expect(errorMessage).toContain('The user name or password provided is incorrect.');
        })
    });

});

