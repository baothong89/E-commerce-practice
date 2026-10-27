import { test, expect, chromium } from "@playwright/test";
import { HomePage } from "./pom/homePage.page";
import { ProductPage } from "./pom/productPage.page";

// Bỏ chữ async ở đây
test.describe("TC level 1 - homepage tests", async() => {

    test.beforeEach("Đi tới homepage", async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.go();
    });

    test("TC1:Kiểm tra homePage hiển thị thành công", async ({ page }) => {
        const homePage = new HomePage(page);
        // verify heading của site
        await expect(homePage.homeTitleLoc).toContainText("E-commerce site testing");

        // verify search bar có xuất hiện  và có placeholder "Search products..."
        await expect(homePage.searchBarLoc).toBeVisible();
        await expect(homePage.searchBarLoc).toHaveAttribute("placeholder",'Search products...');

        // verify Menu bar có xuất hiện và có 3 item là "Trang chủ", "Danh sách khóa học", "Blog"
        await expect(homePage.homeMenuLoc).toBeVisible();
        await expect(homePage.homeMenuItemLoc.nth(0)).toHaveText("Trang chủ");
        await expect(homePage.homeMenuItemLoc.nth(1)).toHaveText("Danh sách khoá học");
        await expect(homePage.homeMenuItemLoc.nth(2)).toHaveText("Blog");
    });


    test("TC2: Kiểm tra chức năng search", async({page}) => {
        const homePage = new HomePage(page);
        //Thực hiện Search với từ khóa istqb
        const keyword = "istqb"
        await homePage.search(keyword);
        
        //Verify Heading text hiển thị kết quả search
        await expect(homePage.searchResultLoc).toHaveText(`Search results: “${keyword}”`);
        
        // verify tất cả item đều có từ khóa istqb
        const totalItem = await homePage.searchItemLoc.all();
        for (let i = 0; i < totalItem.length; i++){
            await expect(totalItem[i]).toContainText("istqb",{ignoreCase: true});
        }

        // Verify Message tính tổng item
        await expect(homePage.searchMessageCountLoc).toHaveText(`Showing all ${totalItem.length} results`);

    });

    test("TC3-Verify product page hiển thị thông tin đúng với sản phẩm", async({page}) =>{
        const productPage = new ProductPage(page);
        const product = {
            productName: "[Tên bạn][Khoá học] Full-stack Automation QA với Playwright TypeScript",
            price: 1_000,
            discount: 850,
            description: "Sản phẩm tạo từ code automation của học viên",
        };
        //Click để mở trang product detail 
        await productPage.openProductDetail(product.productName);
        //Click Add to Cart button của product 
        await productPage.addCart();

        // Verify thông tin sản phẩm ở trang Product detail
        const formatedPrice = product.price.toLocaleString('vi-VN');
        const formatedDiscount = product.discount.toLocaleString('vi-VN');
        await expect(productPage.productPageProductImage).toBeVisible();
        await expect(productPage.productPageProductName).toHaveText(`${product.productName}`);
        await expect(productPage.productPagePrice).toHaveText(`${formatedPrice} $`);
        await expect(productPage.productPageDescription).toHaveText(`${product.description}`);
        await expect(productPage.productPageDiscount).toHaveText(`${formatedDiscount} $`);

        //Verify Add Cart button enable
        await expect(productPage.productPageCartButton).toBeEnabled();

        // Verify message thành công
        await expect(productPage.productPageSuccessMess).toContainText(`“${product.productName}” has been added to your cart. `)
    });

    test("TC04-Verify tính năng review", async({page}) => {
        const productPage = new ProductPage(page);
        const productName = "[Tên bạn][Khoá học] Full-stack Automation QA với Playwright TypeScript";
        //Click để mở trang product detail 
        await productPage.openProductDetail(productName);
        //Click để chuyển sang tab review
        await productPage.reviewTab.click();

        //Verify chưa có review nào
        await expect(productPage.reviewFrane).toContainText("There are no reviews yet.");

        //Verify các đối tượng trong form submit review
        await productPage.reviewAuthor.isVisible();
        await productPage.reviewCheckbox.isVisible();
        await productPage.reviewContent.isVisible();
        await productPage.reviewEmail.isVisible();
        await productPage.reviewSubmitButton.isVisible();
    });
    
    test("TC05-Verify có thể viết review", async({page}) => {
        const productPage = new ProductPage(page);
        const productName = "[Tên bạn][Khoá học] Full-stack Automation QA với Playwright TypeScript";
        const randomChars = Array.from({ length: 6 }, () => "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]).join('');
        const reviewContent = {
            authorName : "Test",
            authorEmail : "Test@gmail.com",
            comment: `Hello, this is my review : ${randomChars} `
        }
        //Click để mở trang product detail 
        await productPage.openProductDetail(productName);

        //Click để chuyển sang tab review
        await productPage.reviewTab.click();

        //Thực hiện review
        await test.setTimeout(3_000);
        await productPage.review(reviewContent.authorName,reviewContent.authorEmail, reviewContent.comment);

        //Verify lại nội dung review
        await expect(productPage.latestComment).toContainText("Your review is awaiting approval");
        await expect(productPage.latestComment).toContainText(reviewContent.comment);
        await expect(productPage.latestComment).toContainText("Rated 3 out of 5");


    })

    test("TC06-Verify review vẫn còn tồn tại sau khi F5", async({page}) => {
        const productPage = new ProductPage(page);
        const productName = "[Tên bạn][Khoá học] Full-stack Automation QA với Playwright TypeScript";
        const randomChars = Array.from({ length: 6 }, () => "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]).join('');
        const reviewContent = {
            authorName : "Test",
            authorEmail : "Test@gmail.com",
            comment: `Hello, this is my review : ${randomChars} `
        }
        //Click để mở trang product detail 
        await productPage.openProductDetail(productName);

        //Click để chuyển sang tab review
        await productPage.reviewTab.click();

        //Thực hiện review
        await productPage.review(reviewContent.authorName,reviewContent.authorEmail, reviewContent.comment);

        //Thực hiện F5
        await page.reload();

        //Verify lại nội dung review
        await expect(productPage.latestComment).toContainText("Your review is awaiting approval");
        await expect(productPage.latestComment).toContainText(reviewContent.comment);
        await expect(productPage.latestComment).toContainText("Rated 3 out of 5");
    })


    test("TC-07: Open 2nd browser and verify the review is not visible ", async({browser,page}) => {

        const productPage1 = new ProductPage(page);
        const productName = "[Tên bạn][Khoá học] Full-stack Automation QA với Playwright TypeScript";
        const randomChars = Array.from({ length: 6 }, () => "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]).join('');
        const reviewContent = {
            authorName : "Test",
            authorEmail : "Test@gmail.com",
            comment: `Hello, this is my review : ${randomChars} `
        }
        //Click để mở trang product detail 
        await productPage1.openProductDetail(productName);

        //Click để chuyển sang tab review
        await productPage1.reviewTab.click();

        //Thực hiện review
        await productPage1.review(reviewContent.authorName,reviewContent.authorEmail, reviewContent.comment);

        
        //Mở browser mới và đi đến trang product detail
        const newContext = await browser.newContext();
        const newPage = await newContext.newPage();
        const newProductPage = new ProductPage(newPage);
        await newProductPage.go();
        await newProductPage.openProductDetail(productName);

        //Click để chuyển sang tab review
        await newProductPage.reviewTab.click();

        //Verify new review không xuất hiện ở browser khác
        await expect(newProductPage.reviewFrane).toContainText("There are no reviews yet.");
    });

});