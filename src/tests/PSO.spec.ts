import{test,expect} from '../fixtures'
import { config } from '../config';

const admin = config.testUser;

test.describe('@P1 @Smoke Public service overview tests', ()=>{
    
    test('Fetching the Running bus count and running bus count  from PSO Page',async({authenticatedPSOModule})=>{
        const count=await authenticatedPSOModule.getRunningBusCount();
        expect(count).toBeGreaterThan(0);
        const totalcount=await authenticatedPSOModule.getTargetBusCount();
        expect (totalcount).toBeGreaterThan(0);
    });

    test('Navigate to PSD page from PSO',async ({authenticatedPSOModule})=>{
        const { psdPage } = await authenticatedPSOModule.navigateToPSD();
        await expect(psdPage.psdpagelabel()).toBeVisible();
    })

    test('Navigate to MapView Page from PSO by click on Map', async ({authenticatedPSOModule})=>{
        const { mapPage: mappage } = await authenticatedPSOModule.navigateToMapView();
        await expect(mappage.mapviewlabel()).toBeVisible();
        expect(await mappage.fetchmappagelabel()).toContain('Timetable Adherence')
    })


    
})