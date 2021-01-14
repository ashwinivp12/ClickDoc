import { browser, element, by } from "protractor";
import { protractor } from "protractor/built/ptor";

import { SignIn } from "../pages-ts/loginpage";
import { Home } from "../pages-ts/homepage";
import * as testData from "../test-data/userInfo.json";

const home = new Home();
const signin = new SignIn();
declare const allure: any

describe("LoginScenario", () => {

    beforeAll(async () => {
        // window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
        await browser.manage().window().maximize();
        await browser.manage().timeouts().implicitlyWait(30000);
        browser.waitForAngularEnabled(false);
        await browser.driver.get(testData.login.url);
        await browser.sleep(3000);
        await home.clickAcceptCookies();
        await home.clickProfileButton();
    })

    it("TC_001	To verify that login dialog is opened with all elements", async () => {

        await allure.createStep("verify elements", async () => {
            await signin.verifyCloseButton();
            await browser.sleep(5000);
            await browser.switchTo().frame(element(by.id("iframeDialog")).getWebElement());
            await signin.verifyElementsOnPage();
            await attachScreenshot('Login page elements');
        })();
    });

    it("TC_002	To verify that login fails with error message for empty email & password", async () => {

        await allure.createStep("Sign in with empty fields", async () => {
            await signin.validEmailfield();
            await signin.validPasswordfield();
            await signin.clickSignIn();
            let emailError = await signin.InvalidEmailAndErrorText();
            await expect(emailError.trim()).toBe(testData.login.EmailErrorText);
            let passwordError = await signin.InvalidPasswordAndErrorText();
            await expect(passwordError.trim()).toBe(testData.login.PasswordErrorText);
            await attachScreenshot('Warning for empty email & password fields.\n email warning: ' + emailError + '\n password warning: ' + passwordError);
        })();
    });

    it("TC_003	To verify that login fails for invalid email and password", async () => {

        await allure.createStep("Enter valid email", async () => {
            await signin.enterEmail(testData.login.valid_email);
            await signin.validEmailfield();
            await attachScreenshot('No warning when Email field is not empty');
        })();

        await allure.createStep("Enter wrong password", async () => {
            await signin.enterPassword(testData.login.wrong_password);
            await signin.validPasswordfield();
            await attachScreenshot('No warning when password field is not empty');
        })();

        await allure.createStep("click signin and verify error", async () => {
            await signin.clickSignIn();
            let mismatchtext = await signin.getMismatchErrortext();
            expect(mismatchtext.trim()).toBe(testData.login.MismatchErrorText);
            await attachScreenshot('Error when we give correct email & wrong password: \n' + mismatchtext);
        })();

        await allure.createStep("Enter wrong email", async () => {
            await signin.enterEmail(testData.login.wrong_email);
            await signin.validEmailfield();
            await attachScreenshot('wrong email provided');
        })();

        await allure.createStep("click signin and verify error", async () => {
            await signin.clickSignIn();
            let mismatchtext = await signin.getMismatchErrortext();
            expect(mismatchtext.trim()).toBe(testData.login.MismatchErrorText);
            await attachScreenshot('Error when we give wrong email & wrong password: \n' + mismatchtext);
        })();
    });

    it("TC_004	To verify that user can sign in successfully", async () => {
        await allure.createStep("Enter valid email", async () => {
            await signin.enterEmail(testData.login.valid_email);
            await attachScreenshot('Valid email');
        })();

        await allure.createStep("Enter password", async () => {
            await signin.enterPassword(testData.login.valid_password);
            await attachScreenshot('Valid password');
        })();

        await allure.createStep("click sign in", async () => {
            await signin.clickSignIn();
            await attachScreenshot('Signing in...');
            await browser.sleep(10000);
        })();

        await allure.createStep("HomePage with user icon", async () => {
            await browser.getTitle();
            await browser.getCurrentUrl();
            await home.verifyProfileButtonNotPresent();
            await home.userIconPresent();
            await attachScreenshot('HomePage with user icon');
        })();

        await allure.createStep("User icon dropdown options", async () => {
            await home.clickUserIconDropdown();
            await home.verifyUserIconOptions();
            await attachScreenshot('User icon dropdown options');
        })();

        await allure.createStep("Logged out to homepage", async () => {
            await home.clickLogOut();
            await home.logOutHomePageDisplay();
            browser.sleep(3000);
            await attachScreenshot('HomePage displays');
        })();
    })

})

async function attachScreenshot(filename: string) {
    let png = await browser.takeScreenshot();
    await allure.createAttachment(filename, Buffer.from(png, 'base64'), 'image/png');
}