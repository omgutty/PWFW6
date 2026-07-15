import {test, expect} from '../fixtures';
import { UsersData } from '../testdata/type';
import usersRaw from '../testdata/user.json';

 const users = usersRaw as UsersData;
 const admin = users.ptaLive[0];


test.describe('@P1 @Regression Signin tests',()=>{
    test('should login with valid credentials', async ({signinModule})=>{
        await test.step('Login with valid credentials', async ()=>{
           await signinModule.dologin(admin.username,admin.password);
        })
    })
})
