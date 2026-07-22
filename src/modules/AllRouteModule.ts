import {Page} from '@playwright/test';
import { Logger } from '../utils';
import { PSOPage } from '../pages';
import { AllRoutePage } from '../pages/AllRoutePage';

export class AllRouteModule {
     private allroutepage:AllRoutePage
     private logger: Logger;

    constructor (page:Page){
           this.allroutepage = new AllRoutePage(page);
                this.logger = Logger.create('PSOModule ');
    }

    async getAllroutetitle():Promise<string>{
        this.logger.testStart('getting the title of the all route page');
        this.logger.step(1, 'Fetching the title ');
        const title=this.allroutepage.getallroutetitile();
        return title
    }
}