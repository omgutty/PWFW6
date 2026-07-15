import{test,expect} from '../fixtures'
import { config } from '../config';

 const admin = config.testUser;

test.describe('@P1 @Smoke Running bus count test', ()=>{
    test('Fetching the Running bus count from PSO Page',async({signinModule,psomodule})=>{
       await signinModule.dologin(admin.username,admin.password);
        const count=await psomodule.getRunningBusCount();
        expect(count).toBeGreaterThan(0);
    })
})