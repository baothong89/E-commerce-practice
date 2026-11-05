import {test as base } from "@playwright/test";
import { LoginPage } from "../../tests/pom/loginPage.page";
import { RegisterPage } from "../../tests/pom/register.page";
import { ForgetPWPage } from "../../tests/pom/forgetPW.page";
import { HomePage } from "../../tests/pom/homePage.page";
import { ProductPage } from "../../tests/pom/productPage.page";
import { AdminDashBoard } from "../../tests/pom/adminDashboard.page";
import { Menu } from "../../tests/pom/menu.page";
import { AdminAddProductPage } from "../../tests/pom/adminAddProduct.page";
import {AdminProductsPage} from "../../tests/pom/adminProducts.page"

type MyFixtures = {
    lPage: LoginPage;
    registerPage: RegisterPage;
    homePage: HomePage;
    productPage: ProductPage;
    forgetPWPage: ForgetPWPage;
    adminDashBoardPage: AdminDashBoard;
    menu: Menu;
    adminAddProductPage : AdminAddProductPage;
    lPageSuccessByAdmin : LoginPage;
    adminProductsPage : AdminProductsPage;
    newProductDetailPage: ProductPage;
};

export const test = base.extend<MyFixtures>({

    lPage: async ({page}, use) => {

        //Before
        const loginPage = new LoginPage(page);
        await loginPage.goLoginPage();

        //Test run
        await use(loginPage);
        //After
    },

    adminAddProductPage: async({page},use) => {
        const lpage = new LoginPage(page);
        const menu = new Menu(page);
        const adminProductsPage = new AdminProductsPage(page);
        const adminAddProductPage = new AdminAddProductPage(page);

        await lpage.loginAsAdmin();
        await menu.productMenu.click();
        await adminProductsPage.addNewProductButton.click();

        await use(adminAddProductPage);
    },
    productPage: async({page},use) => {
        const productPage = new ProductPage(page);

        await use(productPage);

    },
    menu: async({page},use) => {
        const menu = new Menu(page);
        await use(menu);
    },

    adminProductsPage: async({page},use) => {
        const adminProductsPage = new AdminProductsPage(page);
        await use(adminProductsPage);
    }

});


