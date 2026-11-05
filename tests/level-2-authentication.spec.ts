//import {test} from '@playwright/test';
import { expect } from '@playwright/test';
import {test} from '../src/fixture/level-2.fixture.ts';

test.describe("TC Level-2 Authentication",async() => {
    test("TC-01:Verify UI trang authentication", async({lPage,registerPage,homePage,}) => {

        // Verify các element
       await expect(lPage.userName).toBeEnabled();
       await expect(lPage.password).toBeEnabled();
       await expect(lPage.rememberMeCheckbox).toBeEnabled();
       await expect(lPage.loginButton).toBeEnabled();
       await expect(lPage.goToESiteLink).toContainText("Go to E-commerce site testing");
       await expect(lPage.forgetPWLink).toContainText("Lost your password?");
       await expect(lPage.registerLink).toContainText("Register");

       //Verify URL
       await expect(lPage.registerLink).toHaveAttribute("href",/\/wp-login\.php\?action=register$/);
       await expect(lPage.forgetPWLink).toHaveAttribute("href",/\/wp-login\.php\?action=lostpassword$/);
       await expect(lPage.goToESiteLink).toHaveAttribute("href",/betterbytesvn\.com/);
    });

    test("TC-02:Verify đăng nhập thành công", async({lPage,adminDashBoardPage}) => {
        const userInfo = {
            username : "baothong-k25",
            password : "D4FGI508QLBy4AYwnp9%@nTg"
        };
        await lPage.fillUsername(userInfo.username);
        await lPage.fillPassword(userInfo.password);
        await lPage.clickLoginButton();

        await expect(adminDashBoardPage.activitySection).toBeVisible();
        await expect(adminDashBoardPage.atAGlanceSection).toBeVisible();
        await expect(adminDashBoardPage.newsSection).toBeVisible();

    });

    test("TC-03:Verify đăng nhập thất bại với user không tồn tại", async({lPage}) => {
        const nonExistedUserInfo = {
            username: "nonExisted",
            password: "D4FGI508QLBy4AYwnp9%@nTg"
        };

        await lPage.fillUsername(nonExistedUserInfo.username);
        await lPage.fillPassword(nonExistedUserInfo.password);
        await lPage.clickLoginButton();

        //Verify thông báo lỗi
        await expect(lPage.errorSection).toHaveText(`Error: The username ${nonExistedUserInfo.username} is not registered on this site. If you are unsure of your username, try your email address instead.`);
    });

    test("TC-03:Verify đăng nhập thất bại với khi sai mật khẩu", async({lPage}) => {
        const wrongPassWordUser = {
            username: "baothong-k25",
            password: "randomPassword"
        };

        await lPage.fillUsername(wrongPassWordUser.username);
        await lPage.fillPassword(wrongPassWordUser.password);
        await lPage.clickLoginButton();

        //Verify thông báo lỗi:
        await expect(lPage.errorSection).toContainText(`Error: The password you entered for the username ${wrongPassWordUser.username} is incorrect.`);

        await expect(lPage.errorSectionFogotPW).toHaveAttribute("href",/\/wp-login\.php\?action=lostpassword$/);
    });


});