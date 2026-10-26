import {Page, Locator} from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartItemName: Locator;
    readonly cartItemPrice: Locator;
    readonly cartBadge: Locator;
    readonly cartIcon: Locator;
    readonly cartItem: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.cartItemName = page.getByTestId('inventory-item-name');
        this.cartItemPrice = page.getByTestId('inventory-item-price');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartIcon = page.getByTestId('shopping-cart-link');
        this.cartItem = page.getByTestId('inventory-item');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByTestId('checkout');
    }

    async openCart(){
        await this.cartIcon.click();
    }
    async removeItemFromCart(productName: string) {
        const productCard =  this.cartItem.filter({ hasText: productName });
        await productCard.getByRole('button', { name: 'Remove' }).click();
    }
    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }
    async clickCheckout() {
        await this.checkoutButton.click();
    }
}
