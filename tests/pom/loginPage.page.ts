import {Locator, Page} from '@playwright/test';

export class LoginPage{
    page: Page;
    loginUrl: string;
    userName: Locator;
    password: Locator;
    loginButton: Locator;
    rememberMeCheckbox: Locator;
    registerLink: Locator;
    forgetPWLink: Locator;
    goToESiteLink: Locator;
    errorSection: Locator;
    errorSectionFogotPW: Locator;

    constructor (page: Page) {
        this.page = page;
        this.loginUrl = "https://e-commerce-dev.betterbytesvn.com/wp-login.php?";
        this.userName = page.getByRole("textbox",{name: "Username or Email Address"});
        this.password = page.getByRole("textbox",{name: "Password"});
        this.rememberMeCheckbox = page.getByRole("checkbox",{name:"Remember Me"});
        this.loginButton = page.getByRole("button",{name:"Log in"});
        this.registerLink = page.getByRole("link",{name:"Register"});
        this.forgetPWLink = page.getByRole("link",{name:"Lost your password?"});
        this.goToESiteLink = page.getByRole("link",{name: "Go to E-commerce site testing"});
        this.errorSection = page.locator("div#login_error");
        this.errorSectionFogotPW = page.locator("div#login_error p > a")
    };

    async loginAsAdmin(){
        const admin = {
            username : "baothong-k25",
            password : "D4FGI508QLBy4AYwnp9%@nTg"
        };
        await this.page.goto(this.loginUrl);
        await this.userName.fill(admin.username);
        await this.password.fill(admin.password);
        await this.loginButton.click();
    };

    async goLoginPage(){
        await this.page.goto(this.loginUrl);
    };

    async fillUsername(username: string){
        await this.userName.fill(username);
    };

    async fillPassword(password: string){
        await this.password.fill(password);
    };

    async checkRememberMe(){
        await this.rememberMeCheckbox.check();
    };

    async clickLoginButton(){
        await this.loginButton.click();
    };

    async navigateRegisterPage(){
        await this.registerLink.click();
    };

    async navigateFogetPWPage(){
        await this.forgetPWLink.click();
    };

    async navigateEComPage(){
        await this.goToESiteLink.click();
    };
}