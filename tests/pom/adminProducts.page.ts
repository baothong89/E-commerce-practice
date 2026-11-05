import { Locator, Page } from "@playwright/test";

export class AdminProductsPage {
    page : Page;
    addNewProductButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.addNewProductButton = page.locator("a.page-title-action",{hasText:"Add new product"});
        

    }

 
}