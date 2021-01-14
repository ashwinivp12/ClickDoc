import { browser, element, by } from "protractor";
import { Home } from "../pages-ts/homepage";
import { SearchPage } from "../pages-ts/searchpage";
import { protractor } from "protractor/built/ptor";

import * as testData from "../test-data/userInfo.json";

const home = new Home();
const searchPage = new SearchPage();

declare const allure: any

describe("PhysicianSearchScenario", () => {

    beforeAll(async () => {
        
        browser.waitForAngularEnabled(false);
        await browser.driver.get(testData.login.url);
        await home.clickSearchButton();
    })
   
    it("TC_001	To verify that search page is opened with all elements", async () => {

        await allure.createStep("verify search page sections and elements", async () => {
            await browser.sleep(3000);
            await searchPage.checkSearchPageContent();
            await searchPage.checkSearchSectionElements();
            await searchPage.checkSortingSectionElements();
            await searchPage.checkInitialResultsSection();
            await attachScreenshot('Search page elements');
        })();
    });

    it("TC_002	To enter different doctor names & fetch suggestion dropdown", async () => {
        let CountOfInput1: number;
        await allure.createStep("Enter doctor name for suggestions", async () => {
            CountOfInput1 = await searchPage.enterNameAndVerifyDropdown(testData.physicianSearch.name_input1);
            await attachScreenshot('Suggestions for entered name:' + testData.physicianSearch.name_input1);
        })();
        await allure.createStep("Enter more specific name for less suggestions", async () => {
            let CountOfInput2 = await searchPage.enterNameAndVerifyDropdown(testData.physicianSearch.name_input2);
            expect(CountOfInput1 > CountOfInput2).toBeTrue;
            await attachScreenshot('Suggestions for entered name:' + testData.physicianSearch.name_input1);
        })();
        await allure.createStep("Enter doctor name for no suggestions", async () => {
            await searchPage.enterNameForNoDropdown(testData.physicianSearch.name_input3);
            await attachScreenshot('No suggestions for entered name:' + testData.physicianSearch.name_input1);
        })();
    });

    it("TC_003	To enter doctor name,search and verify from results section", async () => {
        await allure.createStep("Enter doctor Name", async () => {
            await searchPage.enterNameAndVerifyDropdown(testData.physicianSearch.name_input1);
            await attachScreenshot('Suggestions for entered name:' + testData.physicianSearch.name_input1);
        })();
        await allure.createStep("Click search to list doctor results", async () => {
            await searchPage.ClickSearch();
            await searchPage.verifyResultsSectionElements();
            await attachScreenshot('Results section with list of doctors');
        })();
        await allure.createStep("verify show more results at bottom", async () => {
            await browser.actions().sendKeys(protractor.Key.END).perform();
            await attachScreenshot('show more present at bottom');
        })();
        await allure.createStep("click show more for additional results", async () => {
            await searchPage.clickShowMoreResults();
            await attachScreenshot('Additional results on clicking show more');
            await browser.actions().sendKeys(protractor.Key.HOME).perform();
        })();
    });

    it("TC_004	To enter location,search and verify from results section", async () => {

        await allure.createStep("scroll up and enter location field input", async () => {
            await searchPage.enterLocAndVerifyDropdown(testData.physicianSearch.loc_input1);
            await attachScreenshot('Suggestions for entered location:' + testData.physicianSearch.name_input1);
        })();
        await allure.createStep("select a location field from dropdown", async () => {
            await searchPage.choseLocFromDropdown(testData.physicianSearch.loc_input2);
            await attachScreenshot('desired location is selected');
            await browser.sleep(3000);
            await searchPage.ClickSearch();
        })();
        await allure.createStep("verify that results have distance field", async () => {
            await searchPage.verifyDistanceAddedToProfile();
            await attachScreenshot('results with distance field');
        })();
    });
    it("TC_005  Verify Online bookable results", async () => {
        await allure.createStep("click on online bookable checkbox and search", async () => {
            await searchPage.clickOnlinebookableCheckbox();
            await searchPage.ClickSearch();
            await attachScreenshot('results with online bookable option displayed');
        })();
        await allure.createStep("verify the results and match with desired output", async () => {
            await searchPage.verifyOnlineBookableResults();
            await attachScreenshot('desired result with online bookable option verified');
        })();
    });

    it("TC_006	Verify video conference available results", async () => {
        await allure.createStep("click on video conference checkbox and search", async () => {
            await searchPage.emptyNameField();
            browser.sleep(10000);
            await searchPage.clickVideoConfCheckbox();
            browser.sleep(5000);
            await searchPage.ClickSearch();
            browser.sleep(5000);
            await attachScreenshot('results with video conference option displayed');
        })();
        await allure.createStep("verify the results and match with desired output", async () => {
            await searchPage.verifyVideoConfResults();
            await attachScreenshot('desired result with video conference option verified');
        })();
    });

    it("TC_007	Verify barrier free accessibility results", async () => {
        await allure.createStep("click on barrier free accessibility checkbox and search", async () => {
            await searchPage.clickVideoConfCheckbox();
            browser.sleep(2000);
            await searchPage.clickAccessibilityCheckbox();
            browser.sleep(2000);
            await searchPage.ClickSearch();
            browser.sleep(4000);
            await attachScreenshot('results with barrier free accessibility option displayed');
        })();
        await allure.createStep("verify the results and match with desired output", async () => {
            await searchPage.verifyBarrierFreeResults();
            browser.sleep(5000);
            await attachScreenshot('desired result with barrier free accessibility option verified');
        })();
    });

    it("TC_008	Click and verify alphabetical & distance sort", async () => {
        await allure.createStep("click on alphabetical sort, choose Z-A and verify", async () => {
            await searchPage.clickAlphabeticalSortAndVerifyResults(testData.physicianSearch.name_input4);
            browser.sleep(4000);
            await attachScreenshot('results are alphabetically sorted');
        })();
        await allure.createStep("click on distance sort and verify", async () => {
            await searchPage.clickDistanceSortAndverifyResults();
            browser.sleep(4000);
            await attachScreenshot('results are sorted by distance');
        })();
    });

    it("TC_009	Slide and verify distance slider", async () => {
        await allure.createStep("slide the distance slider and verify", async () => {
            await searchPage.dragRangeSliderAndVerify();
            await attachScreenshot('results are increased after sliding');
        })();
    });
    
})
async function attachScreenshot(filename: string) {
    let png = await browser.takeScreenshot();
    await allure.createAttachment(filename, Buffer.from(png, 'base64'), 'image/png');
}