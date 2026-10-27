import {Locator, Page} from '@playwright/test';

export class ProductPage{
    page: Page;
    baseUrl : string;
    productPageProductName: Locator;
    productPagePrice: Locator;
    productPageDiscount: Locator;
    productPageDescription: Locator;
    productPageCartButton: Locator;
    productPageSuccessMess: Locator;
    productPageProductImage: Locator;
    reviewTab: Locator;
    reviewFrane: Locator;
    review3Star: Locator;
    reviewAuthor: Locator;
    reviewEmail: Locator;
    reviewContent: Locator;
    reviewCheckbox: Locator;
    reviewSubmitButton: Locator;
    latestComment: Locator;


    constructor(page:Page){
        this.page = page;
        this.baseUrl = "https://e-commerce-dev.betterbytesvn.com/";
        this.productPageProductName = page.locator('h1[class="product_title entry-title"]');
        this.productPagePrice = page.locator('div[class="summary entry-summary"] p.price del span[class="woocommerce-Price-amount amount"] bdi');
        this.productPageDiscount = page.locator('div[class="summary entry-summary"] p.price ins span[class="woocommerce-Price-amount amount"] bdi');
        this.productPageDescription = page.locator('div#tab-description p');
        this.productPageCartButton = page.locator('button[class="single_add_to_cart_button button alt"]');
        this.productPageSuccessMess = page.getByRole("alert");
        this.productPageProductImage = page.locator('div.woocommerce-product-gallery__image--placeholder img');
        this.reviewTab = page.getByRole("tab",{name:"Reviews"}); 
        this.reviewFrane = page.locator("div#tab-reviews");
        this.review3Star = page.locator("p.stars a.star-3");
        this.reviewAuthor = page.getByRole("textbox",{name:"Name *"});
        this.reviewEmail = page.getByRole("textbox",{name:"Email *"})
        this.reviewContent = page.getByRole("textbox",{name:"Your review *"});
        this.reviewCheckbox = page.getByRole("checkbox",{name: "Save my name"});
        this.reviewSubmitButton = page.getByRole("button",{name:"Submit"});
        this.latestComment = page.locator("ol.commentlist > li").last();
    };    

    async go(){
        await this.page.goto(this.baseUrl);
    };
    async openProductDetail(productName: string){
        await this.page.locator('a[data-wp-on--click="woocommerce/product-collection::actions.viewProduct"]').filter({hasText : `${productName}`}).click(); 
    };

    async addCart(){
        await this.productPageCartButton.click();
    }

    async review(authorName: string, authorEmail: string, comment: string ){
        await this.review3Star.click();
        await this.reviewAuthor.fill(authorName);
        await this.reviewEmail.fill(authorEmail);
        await this.reviewContent.fill(comment);
        await this.reviewCheckbox.check();
        await this.reviewSubmitButton.click();
    }
}