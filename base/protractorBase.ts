import { browser, element, ElementFinder, ProtractorExpectedConditions } from "protractor";

export class ProtractorBase {

    private ec: ProtractorExpectedConditions = browser.ExpectedConditions;
    private timeout = 100000;

    public async click(element: ElementFinder) {
        await this.visibilityOf(element);
        //  await browser.wait(this.ec.elementToBeClickable(element), this.timeout, "Failed to click the element");
        await element.click();
    }
    public async getText(element: ElementFinder): Promise<string> {
        await this.visibilityOf(element);
        return await element.getText();
    }

    public async clearAndType(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.clear();
        await element.sendKeys(testData);
    }
    public async mouseHoverAndClick(element: ElementFinder) {
        await browser.actions().mouseMove(await element.getWebElement()).click().perform();
    }
    public async assertTrue(element: ElementFinder) {
        await this.visibilityOf(element);
        expect(await element.isDisplayed()).toBe(true);
    }

    public async assertFalse(element: ElementFinder) {
        expect(await element.isDisplayed()).toBe(false);
    }

    protected async visibilityOf(element: ElementFinder) {
        await browser.wait(this.ec.visibilityOf(element), this.timeout, "Element is not visible");
    }

}