import {test} from '../src/fixture/level-2.fixture.ts';
import { expect } from '@playwright/test';

test.describe("TC Level 3 Product", async() => {
    test("Verify UI tạo sản phẩm", async({adminAddProductPage}) => {

        //verify Url trang đích
        await expect(adminAddProductPage.page).toHaveURL(/\/wp-admin\/post-new\.php\?post_type=product$/);

        //Verify các khối UI có hiển thị
        await expect(adminAddProductPage.productNameField).toBeVisible();
        await expect(adminAddProductPage.productDesSec).toBeVisible();
        await expect(adminAddProductPage.productPubSec).toBeVisible();
        await expect(adminAddProductPage.productImageSec).toBeVisible();
        await expect(adminAddProductPage.productTagsSec).toBeVisible();
        await expect(adminAddProductPage.productBrandsSec).toBeVisible();
        await expect(adminAddProductPage.productDataSec).toBeVisible();
        await expect(adminAddProductPage.productShortDesSec).toBeVisible();
        
    });

    test("Verify collapsible của 8 khối", async({adminAddProductPage}) => {

        const arr = [
            {
                div: adminAddProductPage.productDataSec,
                toggBut: adminAddProductPage.productDataSecTogBut
            },
            {
                div: adminAddProductPage.productShortDesSec,
                toggBut: adminAddProductPage.productShortDesSecTogBut
            },
            {
                div: adminAddProductPage.productPubSec,
                toggBut: adminAddProductPage.productPubSecTogBut
            },
            {
                div: adminAddProductPage.productImageSec,
                toggBut: adminAddProductPage.productImageSecTogBut
            },
            {
                div: adminAddProductPage.productGallerySec,
                toggBut: adminAddProductPage.productGallerySecTogBut
            },
            {
                div: adminAddProductPage.productCateSec,
                toggBut: adminAddProductPage.productCateSecTogBut
            },
            {
                div: adminAddProductPage.productTagsSec,
                toggBut: adminAddProductPage.productTagsSec
            },
            {
                div: adminAddProductPage.productBrandsSec,
                toggBut: adminAddProductPage.productBrandsSecTogBut
            }
         ]; 
        // Verify collapsible của 8 khối

            for(const item of arr){
                let status = await item.div.getAttribute("class");
                //console.log(status);
                await adminAddProductPage.collapedSection(item.toggBut);
                let currentStatus = await item.div.getAttribute("class");
                //console.log(currentStatus);
                await expect(currentStatus).not.toEqual(status);
            }
    });

    test("Verify visibility của các field quan trọng", async({adminAddProductPage}) => {

        // Produce name visible và enable
        await expect(adminAddProductPage.productNameField).toBeVisible();
        await adminAddProductPage.productNameField.fill("Tên sản phẩm mới");


        // Product des iframe visible và enable
        await expect(adminAddProductPage.productDesIframe).toBeVisible();
        await adminAddProductPage.productDesIframe.fill("Mô tả sên sản phẩm mới");

        // Product data dropdonwn có 4 options
        await expect(adminAddProductPage.productDataSecDropdown).toBeVisible();
        await expect(adminAddProductPage.productDataSecDropdown.locator("option")).toHaveText([
            'Simple product',
            'Grouped product',
            'External/Affiliate product',
            'Variable product'
        ]);

        // Product data section có 2 checkbox là Vitual và Downloadable
        await expect(adminAddProductPage.productDataSecDwlable).toBeEnabled();
        await expect(adminAddProductPage.productDataSecVirtual).toBeEnabled();

        //Verify Product data có 6 tab
        await expect(adminAddProductPage.productDataLinkedTab).toBeVisible();
        await expect(adminAddProductPage.productDataGeneralTab).toBeVisible();
        await expect(adminAddProductPage.productDataInvetoryTab).toBeVisible();
        await expect(adminAddProductPage.productDataShippingTab).toBeVisible();
        await expect(adminAddProductPage.productDataAttributeTab).toBeVisible();
        await expect(adminAddProductPage.productDataVariationTab).toBeVisible();

        //Verify chi tiết các field của Productdata general tab
        await adminAddProductPage.productDataGeneralTab.click();
        await expect(adminAddProductPage.generalTabRegularPrice).toBeVisible();
        await expect(adminAddProductPage.generalTabSalePrice).toBeVisible();
        await expect(adminAddProductPage.generalTabTaxClass).toBeVisible();
        await expect(adminAddProductPage.generalTabTaxStatus).toBeVisible();

        //Verify chi tiết các field của Productdata linked tab
        await adminAddProductPage.productDataLinkedTab.click();
        await expect(adminAddProductPage.linkedTabCrossSell).toBeVisible();
        await expect(adminAddProductPage.linkedTabUpsells).toBeVisible();

        //Verify chi tiết các field của Productdata inventory tab
        await adminAddProductPage.productDataInvetoryTab.click();
        await expect(adminAddProductPage.inventoryTabGlobal).toBeVisible();
        await expect(adminAddProductPage.inventoryTabMgStock).toBeVisible();
        await expect(adminAddProductPage.inventoryTabSku).toBeVisible();
        await expect(adminAddProductPage.inventoryTabSoldInvi).toBeVisible();
        await expect(adminAddProductPage.inventoryTabStockStatus_1).toBeVisible();
        await expect(adminAddProductPage.inventoryTabStockStatus_2).toBeVisible();
        await expect(adminAddProductPage.inventoryTabStockStatus_3).toBeVisible();

        //Verify chi tiết các field của Productdata Attribute tab
        await adminAddProductPage.productDataAttributeTab.click();
        await expect(adminAddProductPage.attributeTabName).toBeVisible();
        await expect(adminAddProductPage.attributeTabValue).toBeVisible();
        await expect(adminAddProductPage.attributeTabVisible).toBeVisible();

        //Verify chi tiết các field của Productdata Variation tab
        await adminAddProductPage.productDataVariationTab.click();
        await expect(adminAddProductPage.variationTabMenuOrder).toBeVisible();
        await expect(adminAddProductPage.variationTabNote).toBeVisible();
        await expect(adminAddProductPage.variationTabPos).toBeVisible();
        await expect(adminAddProductPage.variationTabReview).toBeVisible();

        //Verify chi tiết các field của Productdata shipping tab
        await adminAddProductPage.productDataShippingTab.click();
        await expect(adminAddProductPage.shippingTabClass).toBeVisible();
        await expect(adminAddProductPage.shippingTabHeight).toBeVisible();
        await expect(adminAddProductPage.shippingTabLenght).toBeVisible();
        await expect(adminAddProductPage.shippingTabWeight).toBeVisible();
        await expect(adminAddProductPage.shippingTabWidth).toBeVisible();
    });

    test("verify tạo new product thành công", async({adminAddProductPage}) => {
        const productData = {
            name: "BaoThong-K25-Playwright",
            des: "Sản phẩm tạo từ code automation",
            type: "Simple product, virtual",
            regularPrice: "1000",
            salePrice: "850"
        }

        //Create the new product
        await adminAddProductPage.productNameField.fill(productData.name);
        await adminAddProductPage.productDesIframe.fill(productData.des);
        await adminAddProductPage.productDataSecVirtual.check();
        await adminAddProductPage.productDataSecDropdown.selectOption("Simple product");
        
        let dataStatusTog = await adminAddProductPage.productDataSec.getAttribute("class");
        if (dataStatusTog && dataStatusTog.includes("closed")){
            await adminAddProductPage.productDataSecTogBut.click();
        }

        await adminAddProductPage.generalTabRegularPrice.fill(productData.regularPrice);
        await adminAddProductPage.generalTabSalePrice.fill(productData.salePrice);

        let dataPubStatusTog = await adminAddProductPage.productPubSec.getAttribute("class");
        if (dataPubStatusTog && dataPubStatusTog.includes("closed")){
            await adminAddProductPage.productPubSecTogBut.click();
        }

        await adminAddProductPage.publicBut.click();

        await expect(adminAddProductPage.notiSec).toContainText("Product published");
    });

test("verify thông tin của Product đã tạo thành công", async({adminAddProductPage,productPage}) => {
        const productData = {
            name: "BaoThong-K25-Playwright",
            des: "Sản phẩm tạo từ code automation",
            type: "Simple product, virtual",
            regularPrice: "500",
            salePrice: "333"
        }

        //Create the new product
        await adminAddProductPage.productNameField.fill(productData.name);
        await adminAddProductPage.productDesIframe.fill(productData.des);
        await adminAddProductPage.productDataSecVirtual.check();
        await adminAddProductPage.productDataSecDropdown.selectOption("Simple product");
        
        let dataStatusTog = await adminAddProductPage.productDataSec.getAttribute("class");
        if (dataStatusTog && dataStatusTog.includes("closed")){
            await adminAddProductPage.productDataSecTogBut.click();
        }

        await adminAddProductPage.generalTabRegularPrice.fill(productData.regularPrice);
        await adminAddProductPage.generalTabSalePrice.fill(productData.salePrice);

        let dataPubStatusTog = await adminAddProductPage.productPubSec.getAttribute("class");
        if (dataPubStatusTog && dataPubStatusTog.includes("closed")){
            await adminAddProductPage.productPubSecTogBut.click();
        }

        await adminAddProductPage.publicBut.click();
        await adminAddProductPage.notiSecViewProduct.click();

        await expect(productPage.productPageProductName).toHaveText(productData.name);
        await expect(productPage.productPagePrice).toContainText(productData.regularPrice);
        await expect(productPage.productPageDiscount).toContainText(productData.salePrice);
        await expect(productPage.productPageDescription).toContainText(productData.des);

    });

    test("verify Product đã tạo thành công trên product list page", async({menu,adminAddProductPage,adminProductsPage}) => {
        const productData = {
            name: "BaoThong-K25-Playwright",
            des: "Sản phẩm tạo từ code automation",
            type: "Simple product, virtual",
            regularPrice: "500",
            salePrice: "333"
        }

        //Create the new product
        await adminAddProductPage.productNameField.fill(productData.name);
        await adminAddProductPage.productDesIframe.fill(productData.des);
        await adminAddProductPage.productDataSecVirtual.check();
        await adminAddProductPage.productDataSecDropdown.selectOption("Simple product");
        
        let dataStatusTog = await adminAddProductPage.productDataSec.getAttribute("class");
        if (dataStatusTog && dataStatusTog.includes("closed")){
            await adminAddProductPage.productDataSecTogBut.click();
        }

        await adminAddProductPage.generalTabRegularPrice.fill(productData.regularPrice);
        await adminAddProductPage.generalTabSalePrice.fill(productData.salePrice);

        let dataPubStatusTog = await adminAddProductPage.productPubSec.getAttribute("class");
        if (dataPubStatusTog && dataPubStatusTog.includes("closed")){
            await adminAddProductPage.productPubSecTogBut.click();
        }

        await adminAddProductPage.publicBut.click();
        await menu.productMenu.click();

        const newProduct = await adminProductsPage.page.locator("tbody tr").filter({hasText:productData.name})
        
        await expect(newProduct).toBeVisible();
    });     

})