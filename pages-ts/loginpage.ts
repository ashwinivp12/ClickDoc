import { element, by, browser } from "protractor";
import { ProtractorBase } from "../base/protractorBase";

export class SignIn extends ProtractorBase {

    private emailInput = element(by.id("mat-input-1"));
    private passwordInput = element(by.id("mat-input-2"));
    private loginButton = element(by.css('[class="life-primary-btn"]'));
    private closeButton = element(by.css('[class="login-iframe"]')).element(by.tagName('span'));
    private forgotPassword = element(by.css('[data-web-test="login_forgot_password"]'));
    private registerButton = element(by.css('[data-web-test="login_register_btn"]'));
    private wrongEmailError = element(by.id("mat-error-0"));
    private wrongPasswordError = element(by.id("mat-error-1"));
    private mismatchFieldsError = element(by.css('[class="mt-0"]'));

    async verifyCloseButton() {
        await this.visibilityOf(this.closeButton);
    }
    async verifyElementsOnPage() {
        await this.visibilityOf(this.emailInput);
        await this.visibilityOf(this.passwordInput);
        await this.visibilityOf(this.forgotPassword);
        await this.visibilityOf(this.registerButton);
        await this.visibilityOf(this.loginButton);
    }
    async enterEmail(email: string) {
        await this.clearAndType(this.emailInput, email);
    }
    async enterPassword(password: string) {
        await this.clearAndType(this.passwordInput, password);
    }
    async clickSignIn() {
        await this.mouseHoverAndClick(this.loginButton);
    }
    async validEmailfield() {
        expect(this.emailInput.getAttribute('aria-invalid')).toMatch('false');
    }
    async validPasswordfield() {
        expect(this.passwordInput.getAttribute('aria-invalid')).toMatch('false');
    }
    async InvalidEmailAndErrorText(): Promise<string> {
        expect(this.emailInput.getAttribute('aria-invalid')).toMatch('true');
        return await this.getText(this.wrongEmailError);
    }
    async InvalidPasswordAndErrorText(): Promise<string> {
        expect(this.passwordInput.getAttribute('aria-invalid')).toMatch('true');
        return await this.getText(this.wrongPasswordError);
    }
    async getMismatchErrortext(): Promise<string> {
        return await this.getText(this.mismatchFieldsError);
    }
}