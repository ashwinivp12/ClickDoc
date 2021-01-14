import { element, by } from "protractor";
import { ProtractorBase } from "../base/protractorBase";

export class Home extends ProtractorBase {

    private profileButton = element(by.css('[class="bold-menu-text ng-tns-c119-0"]'));
    private searchButton = element(by.css('[class="menu-desktop d-lg-block d-md-none d-sm-none ng-tns-c119-0"]')).element(by.css('[class="icon icon-M_search menu-icon ng-tns-c119-0"]'));
    private usericon = element(by.css('[class="icon icon-G3_thirdLevelPointer ng-tns-c119-0"]'));
    private myProfile = element(by.css('[class="dropdown-container ng-tns-c119-0"]')).element(by.partialLinkText('my-profile'));
    private logOut = element(by.css('[class="dropdown-container ng-tns-c119-0"]')).element(by.css('[angularticsaction="Open log-out iframe"]'));
    private acceptCookies = element(by.buttonText('Alle akzeptieren'));

    async clickAcceptCookies() {
        await this.click(this.acceptCookies);
    }
    async clickProfileButton() {
        await this.assertTrue(this.profileButton);
        await this.click(this.profileButton);
    }
    async clickSearchButton() {
        await this.assertTrue(this.searchButton);
        await this.click(this.searchButton);
    }
    async verifyProfileButtonNotPresent() {
        expect(this.profileButton.isPresent()).toBeFalse;
    }
    async userIconPresent() {
        expect(this.usericon.isPresent()).toBeTrue;
    }
    async clickUserIconDropdown() {
        await this.mouseHoverAndClick(this.usericon);
    }
    async verifyUserIconOptions() {
        expect(this.myProfile.isPresent()).toBeTrue;
        expect(this.logOut.isPresent()).toBeTrue;
    }
    async logOutHomePageDisplay() {
        expect(this.profileButton.isPresent()).toBeTrue;
        expect(this.usericon.isPresent()).toBeFalse;
    }
    async clickLogOut() {
        await this.click(this.logOut);
    }

}