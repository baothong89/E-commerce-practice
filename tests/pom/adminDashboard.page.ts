import {Locator, Page} from "@playwright/test";

export class AdminDashBoard {
    page :Page;
    atAGlanceSection: Locator;
    activitySection: Locator;
    newsSection: Locator;

    constructor(page :Page){
        this.page = page;
        this.atAGlanceSection = page.locator("h2#dashboard_right_now-title");
        this.activitySection = page.locator("h2#dashboard_activity-title");
        this.newsSection = page.locator("h2#dashboard_primary-title")
    };
}