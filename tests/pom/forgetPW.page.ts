import { Locator, Page } from "@playwright/test";

export class ForgetPWPage{
    page: Page;

    constructor(page:Page){
        this.page = page;
    };

}