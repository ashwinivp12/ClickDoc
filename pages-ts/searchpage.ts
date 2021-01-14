import { element, by, browser, ElementFinder, WebElement, ElementArrayFinder, $$, $, Key } from "protractor";
import { protractor } from "protractor/built/ptor";
import { ProtractorBase } from "../base/protractorBase";

export class SearchPage extends ProtractorBase {

    private searchPage = element(by.id("search"));
    private searchSection = element(by.css('[class="container-fluid filter-container"]'));
    private deptOrName = element(by.css('[id="search-query-typeahead"]'));
    private location = element(by.css('[id="search-location-typeahead"]'));
    private onlineBooking = element(by.css('[for="onlineBooking"] div'));
    private videoConf = element(by.css('[for="videoCall"]'));
    private accessibility = element(by.css('[for="accessibility"] div'));
    private searchDoctorBtn = element(by.css('[class="btn btn-primary btn-block"]'));
    private nameDropdown = element.all(by.css('[class="dropdown open dropdown-menu"]'));
    private filterSection = element(by.css('[class="container sort-container"]'));
    private bestResults = element(by.id("bestHit"));
    private alphabeticalSort = element.all(by.css('[for="sortAlphabetically"] span')).get(1);
    private distanceSort = element.all(by.css('[for="noLocation"] span')).get(1);
    private distSlider = element(by.css('[angularticsaction="Sort by distance"]'));
    private resultBody = element(by.css('[class="panel default-panel hide-filters"]'));
    private resultBodyelements = element.all(by.tagName("app-physician-card"));
    private emptyCard = element(by.css('[class="card-image"]'));
    private instructions = element(by.css('[translate="search.no.input.given.label"]'));
    private Headline = element.all(by.css('[class="card-header d-flex"]'));
    private physicianPicture = element.all(by.css('[class="physician-picture"]'));
    private physicianName = element.all(by.css('[class="physician-name align-self-center"]'));
    private physicianProfile = element.all(by.css('[class="btn d-sm-none d-md-block see-profile-button"]'));
    private practiceInfo = element.all(by.css('[class="physician-description"]'));
    private AppointmentCalender = element.all(by.css('[class="physician-calendar"]'));
    private physicianCard = element.all(by.css('[class="panel default-panel hide-filters"] app-physician-card'))
    private showMoreResults = element(by.css('[class="load-more-link"]'));
    private locationDropdown = element(by.css('[class="dropdown open dropdown-menu"]'));
    private onlineBookingRow = element(by.css('[class="row onlineBooking no-gutters ng-star-inserted"]'));
    private onlineBookingDay = element(by.css('[class="day dropdown dropdown-select d-block"]'));
    private onlineBookingHour = element(by.css('[class="time dropdown-select d-block dropdown"]'));
    private descending = element(by.css('[for="descending"]'));

    async checkSearchPageContent() {
        await this.visibilityOf(this.searchPage);
        await this.visibilityOf(this.searchSection);
        await this.visibilityOf(this.filterSection);
        await this.visibilityOf(this.resultBody);
    }
    async checkSearchSectionElements() {
        await this.visibilityOf(this.deptOrName);
        await this.visibilityOf(this.location);
        expect(this.onlineBooking.isPresent()).toBeTrue;
        expect(this.videoConf.isPresent()).toBeTrue;
        expect(this.accessibility.isPresent()).toBeTrue;
        await this.visibilityOf(this.searchDoctorBtn);
    }
    async checkSortingSectionElements() {
        expect(this.bestResults.isPresent()).toBeTrue;
        expect(this.alphabeticalSort.isPresent()).toBeTrue;
        expect(this.distanceSort.isPresent()).toBeTrue;
        expect(this.distSlider.isPresent()).toBeTrue;
    }
    async checkInitialResultsSection() {
        await this.visibilityOf(this.emptyCard);
        await this.visibilityOf(this.instructions);
        expect((await this.resultBodyelements).length).toBe(0);
    }
    async enterNameAndVerifyDropdown(testData: string): Promise<number> {
        expect(this.nameDropdown.isPresent()).toBeFalse;
        await this.clearAndType(this.deptOrName, testData);
        expect(this.nameDropdown.isPresent()).toBeTrue;
        return (await this.nameDropdown).length;
    }
    async enterNameForNoDropdown(testData: string) {
        expect(this.nameDropdown.isPresent()).toBeFalse;
        await this.clearAndType(this.deptOrName, testData);
        expect(this.nameDropdown.isPresent()).toBeFalse;
    }
    async ClickSearch() {
        await this.click(this.searchDoctorBtn);
    }
    async verifyResultsSectionElements() {
        let resultLength: number = (await this.resultBodyelements).length;
        expect(resultLength).toBeGreaterThan(0);
        for (var i = 0; i < resultLength; ++i) {
            await this.visibilityOf(this.Headline.get(i));
            await this.visibilityOf(this.physicianCard.get(i));
            await this.visibilityOf(this.physicianName.get(i));
            await this.visibilityOf(this.physicianPicture.get(i));
            await this.visibilityOf(this.physicianProfile.get(i));
            await this.visibilityOf(this.practiceInfo.get(i));
            await this.visibilityOf(this.AppointmentCalender.get(i));
        }
    }

    async clickShowMoreResults() {
        let beforeSize = (await this.resultBodyelements).length;
        await this.click(this.showMoreResults);
        let afterSize = (await this.resultBodyelements).length;
        expect(beforeSize < afterSize).toBeTrue;
    }
    async enterLocAndVerifyDropdown(testData: string) {
        await this.clearAndType(this.location, testData);
        expect(this.locationDropdown.isPresent()).toBeTrue;
    }
    async choseLocFromDropdown(testData: string) {
        var allElements = element.all(by.css('[class="dropdown open dropdown-menu"] button'));
        var i = 0;
        do {
            i++;
        } while (expect((await allElements.get(i).getText()).toString()).toEqual(testData))
        element.all(by.css('[class="dropdown open dropdown-menu"] button')).get(i).click();
    }
    async verifyDistanceAddedToProfile() {
        for (var i = 0; i < this.physicianCard.length; ++i) {
            var distanceAdded = this.physicianCard.get(i).element(by.css('[class="description-text text-alignment-center text-break physician-address"] span span'));
            expect(distanceAdded.isPresent()).toBeTrue;
        }
    }

    async clickOnlinebookableCheckbox() {
        expect(this.onlineBookingRow.isPresent()).toBeFalse;
        expect(this.onlineBookingDay.isPresent()).toBeFalse;
        expect(this.onlineBookingHour.isPresent()).toBeFalse;
        await (this.onlineBooking).click();
        expect(this.onlineBookingRow.isPresent()).toBeTrue;
        expect(this.onlineBookingDay.isPresent()).toBeTrue;
        expect(this.onlineBookingHour.isPresent()).toBeTrue;

    }
    async verifyOnlineBookableResults() {
        for (var i = 0; i < (await this.physicianCard.length); ++i) {
            var onlineBookAdded = this.physicianCard.get(i).element(by.css('[translate="life.partner.badge.text"]'));
            expect(onlineBookAdded.isPresent()).toBeTrue;
            expect((await onlineBookAdded.getText()).toString).toEqual("Online-Termine");
        }
    }

    async clickVideoConfCheckbox() {
        await this.videoConf.click();
    }

    async emptyNameField() {
        await this.deptOrName.sendKeys(protractor.Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE, '', Key.TAB);
    }

    async verifyVideoConfResults() {
        for (var i = 0; i < (await this.physicianCard.length); ++i) {
            var vcAdded = this.physicianCard.get(i).element(by.css('[translate="search.filter.checkbox.video.appointment"]'));
            expect(vcAdded.isPresent()).toBeTrue;
            expect((await vcAdded.getText()).toString).toEqual("Videosprechstunde");
        }
    }

    async clickAccessibilityCheckbox() {
        await this.accessibility.click();
    }

    async verifyBarrierFreeResults() {

        for (var i = 0; i < (await this.physicianCard.length); ++i) {
            var distanceAdded = await this.physicianCard.get(i).element(by.css('[class="btn d-sm-none d-md-block see-profile-button"] span'));
            await distanceAdded.click();
            var barrierFreeOnProfile = await element(by.css('[translate="practice.flags.SG_handicappedAccessible"]'));
            expect(await barrierFreeOnProfile.isPresent()).toBeTrue;
            await browser.navigate().back();
        }
    }

    async clickAlphabeticalSortAndVerifyResults(data: string) {
        browser.sleep(5000);
        await this.clearAndType(this.deptOrName, data);
        await this.click(this.searchDoctorBtn);
        browser.sleep(5000);
        await this.click(this.alphabeticalSort);
        browser.sleep(5000);
        await this.click(this.descending);
        browser.sleep(10000);
        var length: number = (await this.physicianCard).length;
        var temp = "zzz";
        for (var i = 0; i < length; ++i) {
            browser.sleep(3000);
            let result = await element.all(by.css('[class="physician-name align-self-center"]')).get(i).getText();
            let lastname = result.toString().trim().split(" ").pop();
            expect(temp >= lastname).toBeTrue;
            temp = lastname;
        }
        browser.sleep(5000);
    }
    async clickDistanceSortAndverifyResults() {
        await this.click(this.distanceSort);
        browser.sleep(10000);
        var length: number = (await this.physicianCard).length;
        var temp = 0.0;
        for (var i = 0; i < length; ++i) {
            browser.sleep(3000);
            let result = await this.physicianCard.get(i).element(by.css('[class="description-text text-alignment-center text-break physician-address"] span')).getText();
            var dist: string = (result.toString()).trim().replace(" ", "").replace(",", ".");
            var num: number = parseFloat(dist);
            browser.sleep(3000);
            expect(temp).toBeLessThanOrEqual(num);
            temp = num;
        }
    }

    async dragRangeSliderAndVerify() {
        browser.sleep(5000);
        var beforeResults = (await this.physicianCard).length;
        let pointer = await this.distSlider.element(by.css('[class*="ng5-slider-pointer-min"]'));
        var sliderTo100 = await element.all(by.css('[class*="ng5-slider-span ng5-slider-tick-legend ng-star-inserted"]')).get(3);
        await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN);
        browser.sleep(5000);
        await browser.driver.actions().doubleClick(pointer).perform();
        await browser.driver.actions().mouseDown(pointer).perform();
        await browser.driver.actions().mouseMove(sliderTo100.getWebElement(), { x: 200, y: 200 }).perform();
        var midResults = element.all(by.css('[class="card physician-card"]')).count();
        await browser.driver.actions().mouseUp().perform();
        browser.sleep(5000);
        var afterResults = element.all(by.css('[class="card physician-card"]')).count();
        expect(beforeResults).toEqual(await midResults);
        expect(afterResults).toBeGreaterThan(beforeResults);
    }
}