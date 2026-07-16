import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { PSDPage } from './PSDPage';

export class PSOPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    psolabel = () => this.page.locator('.RunningBoards-header');
    totalnumberofbuses = () => this.page.locator("tr[class='tbl-head-gradient'] td:nth-child(5)");
    totaltargetnumber = () => this.page.locator("tr[class='tbl-head-gradient'] td:nth-child(6)");
    noOfBusfilter = () => this.page.getByRole('link', { name: 'No. of Buses' });

    // ── Scoped data-row locators ───────────────────────────────

    private routeRows = () => this.page.locator('#detail-container table.grid tbody tr');

    /** Map link (1st column) for the first route row */
    firstRouteMapLink = () => this.routeRows().first().locator('td:nth-child(1) a');

    /** Diagrammatic Map link (2nd column) for the first route row */
    firstRouteDiagrammaticMap = () => this.routeRows().first().locator('td:nth-child(2) a');

    /** Approved Route link (3rd column) for the first route row */
    firstRouteLink = () => this.routeRows().first().locator('td:nth-child(3) a');

    /** No. of Buses value (5th column) for the first route row */
    firstRouteBusCount = () => this.routeRows().first().locator('td:nth-child(5)');

    // ── Methods ────────────────────────────────────────────────

    async fetchPSOPageLabel(): Promise<string | null> {
        await expect(this.psolabel()).toBeVisible();
        return await this.psolabel().textContent();
    }

    async fetchNumberOfBuses(): Promise<string> {
        return await this.gettext(this.totalnumberofbuses());
    }

    async fetchtargetnumber(): Promise<string> {
        return await this.gettext(this.totaltargetnumber());
    }

    async fetchFirstRouteBusCount(): Promise<number> {
        const text = await this.gettext(this.firstRouteBusCount());
        return parseInt(text, 10) || 0;
    }

    async fetchFirstRouteName(): Promise<string> {
        return await this.gettext(this.firstRouteLink());
    }

    /** Click No. of Buses column header twice to sort descending (most buses first). */
    async sortByBusCountDescending(): Promise<void> {
        await this.noOfBusfilter().click();
        await expect(this.firstRouteBusCount()).not.toBeAttached({ attached: false });
        await this.noOfBusfilter().click();
        await expect(this.firstRouteBusCount()).toBeVisible();
    }

    /**
     * Pick the first route that has > 0 running buses, capture its name,
     * then click through to PSD. If the first route has 0 buses, sorts the
     * table descending by bus count first.
     */
    async clickOnRouteWithRunningBuses(): Promise<{ routeName: string; psdPage: PSDPage }> {
        const busCount = await this.fetchFirstRouteBusCount();

        if (busCount <= 0) {
            await this.sortByBusCountDescending();
        }

        const routeName = await this.fetchFirstRouteName();
        await this.firstRouteLink().click();
        return { routeName, psdPage: new PSDPage(this.page) };
    }

    // ── Backward-compatible entry point ────────────────────────

    /**
     * Clicks the first available route that has running buses and returns the
     * PSD page. Same logic as clickOnRouteWithRunningBuses but discards the
     * route name for callers that don't need it (legacy tests / modules).
     */
    async clickonfirstroute(): Promise<PSDPage> {
        const { psdPage } = await this.clickOnRouteWithRunningBuses();
        return psdPage;
    }
}