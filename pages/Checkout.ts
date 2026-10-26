import { Page, Locator, expect } from "@playwright/test";

export class Checkout {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly finishButton: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly cancelButton: Locator;
    readonly thankYouHeaderMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        // The checkout overview uses the cart item markup, whose stable app classes
        // are present even though these nodes do not expose the data-test ids used
        // on the inventory and cart pages.
        this.itemNames = page.locator('.cart_item .inventory_item_name');
        this.itemPrices = page.locator('.cart_item .inventory_item_price');
        this.finishButton = page.getByTestId('finish');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');
        this.cancelButton = page.getByTestId('cancel');
        this.thankYouHeaderMessage = page.getByTestId('complete-header');
        this.errorMessage = page.getByTestId('error');
    }

    // Complete checkout step one and continue to the order overview.
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async expectErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toContainText(expectedMessage);
    }
}
