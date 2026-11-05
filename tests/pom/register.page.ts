import { Locator, Page } from "@playwright/test";

export class RegisterPage{
    page: Page;
    registerURL: string;

    constructor(page:Page){
        this.page = page;
        this.registerURL = "";
    }
}