import{test,expect} from '../fixtures'
import { config } from '../config';

const admin = config.testUser;

test.describe('@P1 @Smoke Running bus count and total bus count test', ()=>{
    test('Fetching the Running bus count and running bus count  from PSO Page',async({signinModule,psomodule})=>{
       await signinModule.dologin(admin.username,admin.password);
        const count=await psomodule.getRunningBusCount();
        expect(count).toBeGreaterThan(0);
        const totalcount=await psomodule.getTargetBusCount();
        expect (totalcount).toBeGreaterThan(0);
    });

    test('Navigate to PSD page from PSO',async ({signinModule,psomodule})=>{
         await signinModule.dologin(admin.username,admin.password);
         const psdpage =await psomodule.navigatetoPSDfromPSO()
         expect (psdpage).toBeDefined()
         //await psdpage.psdpagelabelloader();
    })


    
})