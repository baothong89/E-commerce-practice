import { Locator, Page } from "@playwright/test";

export class AdminAddProductPage {
    page : Page;
    productNameField : Locator;
    productDesSec : Locator;
    productDesIframe : Locator;
    productDataSec : Locator;
    productDataSecTogBut : Locator;
    productDataSecDropdown : Locator;
    productDataSecVirtual: Locator;
    productDataSecDwlable: Locator;
    
    productShortDesSec : Locator;
    productShortDesSecTogBut : Locator;
    productPubSec : Locator;
    productPubSecTogBut : Locator;
    productImageSec : Locator;
    productImageSecTogBut : Locator;
    productGallerySec : Locator;
    productGallerySecTogBut : Locator;
    productCateSec : Locator;
    productCateSecTogBut : Locator;
    productTagsSec : Locator;
    productTagsSecTogBut : Locator;
    productBrandsSec : Locator;
    productBrandsSecTogBut : Locator;

    productDataGeneralTab: Locator
    productDataInvetoryTab: Locator;
    productDataShippingTab: Locator;
    productDataLinkedTab: Locator;
    productDataAttributeTab: Locator;
    productDataVariationTab: Locator;

    generalTabRegularPrice: Locator;
    generalTabSalePrice: Locator;
    generalTabTaxStatus: Locator;
    generalTabTaxClass: Locator;

    inventoryTabSku: Locator;
    inventoryTabGlobal: Locator;
    inventoryTabMgStock: Locator;
    inventoryTabStockStatus_1: Locator;
    inventoryTabStockStatus_2: Locator;
    inventoryTabStockStatus_3: Locator;
    inventoryTabThreshold: Locator;
    inventoryTabSoldInvi: Locator;

    shippingTabWeight: Locator;
    shippingTabLenght: Locator;
    shippingTabWidth: Locator;
    shippingTabHeight: Locator;
    shippingTabClass: Locator;

    linkedTabUpsells: Locator;
    linkedTabCrossSell: Locator;

    attributeTabName: Locator;
    attributeTabValue: Locator;
    attributeTabVisible: Locator;

    variationTabNote: Locator;
    variationTabMenuOrder: Locator;
    variationTabReview: Locator;
    variationTabPos: Locator;

    //publicSec: Locator;
    publicBut: Locator;
    notiSec: Locator;
    notiSecViewProduct: Locator;

    constructor(page:Page){
        this.page = page;

        this.publicBut = page.locator("input#publish");
        this.notiSec = page.locator("div#message.notice.notice-success.is-dismissible.updated");
        this.notiSecViewProduct = page.locator("a#woocommerce-product-updated-message-view-product__link");

        this.productNameField = page.locator("input#title");

        this.productDesSec = page.locator("div#postdivrich");
        this.productDesIframe = page.frameLocator('iframe#content_ifr').locator('body#tinymce');

        this.productPubSec = page.locator("div#submitdiv");
        this.productPubSecTogBut = page.locator("div#submitdiv >> button[class='handlediv wp-tooltip__toggle']");

        this.productImageSec = page.locator("div#postimagediv");
        this.productImageSecTogBut = page.locator("div#postimagediv >> button[class='handlediv wp-tooltip__toggle']");

        this.productGallerySec = page.locator("div#woocommerce-product-images");
        this.productGallerySecTogBut = page.locator("div#woocommerce-product-images >> button[class='handlediv wp-tooltip__toggle']");

        this.productCateSec = page.locator("div#product_catdiv");
        this.productCateSecTogBut = page.locator("div#product_catdiv >> button[class='handlediv wp-tooltip__toggle']");

        this.productTagsSec = page.locator("div#tagsdiv-product_tag");
        this.productTagsSecTogBut = page.locator("div#tagsdiv-product_tag >> button[class='handlediv wp-tooltip__toggle']");

        this.productBrandsSec = page.locator("div#product_branddiv");
        this.productBrandsSecTogBut = page.locator("div#product_branddiv >> button[class='handlediv wp-tooltip__toggle']");

        this.productDataSec = page.locator("div#woocommerce-product-data");
        this.productDataSecTogBut = page.locator("div#woocommerce-product-data >> button[class='handlediv wp-tooltip__toggle']");
        this.productDataSecDropdown = page.locator("select#product-type");
        this.productDataSecDwlable = page.getByRole("checkbox",{name: "Downloadable"});
        this.productDataSecVirtual = page.getByRole("checkbox",{name: "Virtual"});

        this.productDataGeneralTab = page.locator('a[href="#general_product_data"]');
        this.productDataAttributeTab = page.locator('li[class="attribute_options attribute_tab"] a[href="#product_attributes"]');
        this.productDataInvetoryTab = page.locator('a[href="#inventory_product_data"]');
        this.productDataLinkedTab = page.locator('a[href="#linked_product_data"]');
        this.productDataVariationTab = page.locator('a[href="#advanced_product_data"]');
        this.productDataShippingTab = page.locator('a[href="#shipping_product_data"]');

        this.productShortDesSec = page.locator("div#postexcerpt");
        this.productShortDesSecTogBut = page.locator("div#postexcerpt >> button[class='handlediv wp-tooltip__toggle']");

        this.generalTabRegularPrice = page.getByRole("textbox",{name: "Regular price"});
        this.generalTabSalePrice = page.getByRole("textbox",{name: "Sale price"});
        this.generalTabTaxStatus = page.getByRole("combobox",{name: "Tax status" });
        this.generalTabTaxClass = page.getByRole("combobox",{name:"Tax class"});

        this.inventoryTabSku = page.getByRole("textbox",{name: "SKU"});
        this.inventoryTabGlobal = page.getByRole("textbox",{name: "GTIN, UPC, EAN, or ISBN"});
        this.inventoryTabMgStock = page.getByRole("checkbox",{name:"Stock management"});
        this.inventoryTabStockStatus_1 = page.getByRole("radio", { name: "In stock" });
        this.inventoryTabStockStatus_2 = page.getByRole("radio", { name: "Out of stock" });
        this.inventoryTabStockStatus_3 = page.getByRole("radio", { name: "On backorder" });
        this.inventoryTabThreshold = page.getByRole("textbox",{name: "Low stock threshold"});
        this.inventoryTabSoldInvi = page.getByRole("checkbox",{name:"Sold individually"});

        this.shippingTabClass = page.getByRole("combobox",{name:"Shipping class"});
        this.shippingTabHeight = page.locator("input#product_height");
        this.shippingTabLenght = page.locator("input#product_length");
        this.shippingTabWidth = page.locator("input#product_width");
        this.shippingTabWeight = page.getByRole("textbox",{name: "Weight (kg)"});


        this.linkedTabCrossSell = page.locator("select#upsell_ids")
        this.linkedTabUpsells = page.locator("select#crosssell_ids");

        this.attributeTabName = page.locator("input.attribute_name");
        this.attributeTabValue = page.getByPlaceholder("Enter some descriptive text. Use “|” to separate different values.");
        this.attributeTabVisible = page.getByRole("checkbox",{name:"Visible on the product page"});
        
        this.variationTabNote = page.locator("textarea#_purchase_note");
        this.variationTabMenuOrder = page.locator("input#menu_order");
        this.variationTabReview = page.getByRole("checkbox",{name:"Enable reviews"});
        this.variationTabPos = page.getByRole("checkbox",{name:"Available for POS"});

    }
    
    async collapedSection(toggleBut : Locator){
        await toggleBut.click();
    }
}