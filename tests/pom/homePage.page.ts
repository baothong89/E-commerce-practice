import {Locator, Page} from '@playwright/test';

export class HomePage{
    page: Page;
    baseUrl : string;
    homeTitleLoc: Locator;
    homeMenuLoc: Locator;
    searchBarLoc: Locator;
    homeMenuItemLoc: Locator;
    searchButtonLoc: Locator;
    searchResultLoc: Locator;
    searchMessageCountLoc: Locator;
    searchItemLoc: Locator;



    constructor(page:Page){
        this.page = page;
        this.baseUrl = "https://e-commerce-dev.betterbytesvn.com/";
        this.homeTitleLoc = page.locator("//a[@rel='home']");
        this.homeMenuLoc = page.getByRole("navigation",).first();
        this.homeMenuItemLoc = page.locator("//a[@class='nav-link']");
        this.searchBarLoc = page.getByRole("textbox",{name:'s'});
        //this.searchButtonLoc = page.locator("//button[@type='submit']");
        this.searchButtonLoc = page.locator("button.header-search-button");
        this.searchResultLoc = page.locator("h1.woocommerce-products-header__title");
        this.searchMessageCountLoc = page.locator("p.woocommerce-result-count");
        this.searchItemLoc = page.locator("h2.woocommerce-loop-product__title");
    };    

    async go(){
        await this.page.goto(this.baseUrl);
    };

    async search(keyword: string){
        await this.searchBarLoc.fill(keyword);
        await this.searchButtonLoc.click();        
    };

    async openProductDetail(productName: string){
        await this.page.locator('a[data-wp-on--click="woocommerce/product-collection::actions.viewProduct"]').filter({hasText : `${productName}`}).click(); 
    };

    async openNewBrowser(){

        
        await this.page.goto();
    }

}