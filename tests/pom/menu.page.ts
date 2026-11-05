import {Page, Locator} from '@playwright/test';

export class Menu{
    page :Page;
    productMenu: Locator;
    addProductMenu: Locator;

    constructor(page:Page){
        this.page = page;
        this.productMenu = page.locator("div.wp-menu-name", {hasText: "Products"});
        this.addProductMenu = page.locator("div.wp-menu-name > a", {hasText: "Add new product"});

    }

    async openAddNewProduct(){
        await this.productMenu.hover();
        await this.addProductMenu.click();
    };

}