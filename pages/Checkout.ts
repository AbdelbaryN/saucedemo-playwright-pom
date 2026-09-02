import { Page, Locator } from "@playwright/test";

export class Checkout {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly itemsNames: Locator;
    readonly itemPrice: Locator;
    readonly finishButton: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly cancelButton: Locator;
    readonly thankYouHeaderMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.itemsNames = page.getByTestId('inventory-item-name');
        this.itemPrice = page.getByTestId('inventory-item-price');
        this.finishButton = page.getByTestId('finish');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');
        this.cancelButton = page.getByTestId('cancel');
        this.thankYouHeaderMessage = page.getByTestId('complete-header');
    }

    //Complete step 1 pf the checkoiut process by filling in the checkout information and clicking the continue button
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }

    async getItemNames(): Promise<string[]> {
        return await this.itemsNames.allTextContents();
    }

    async getItemPrices(): Promise<string[]> {
        return await this.itemPrice.allTextContents();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async successMessage(): Promise<string | null> {
        return await this.thankYouHeaderMessage.textContent();
    }
}