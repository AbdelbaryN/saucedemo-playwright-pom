import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    private getProductCard(productName: string): Locator {
        return this.page.getByTestId('inventory-item').filter({ hasText: productName });
    }

    async expectRemoveButtonVisible(productName: string) {
        const productCard = this.getProductCard(productName);
        await expect(productCard.getByRole('button', { name: 'Remove' })).toBeVisible();
    }

    async addProductToCart(productName: string) {
        const productCard = this.getProductCard(productName);
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeProductFromCart(productName: string) {
        const productCard = this.getProductCard(productName);
        await productCard.getByRole('button', { name: 'Remove' }).click();
    }
    async expectCartCount(expectedCount: number) {
        if (expectedCount === 0) {
            await expect(this.cartBadge).toBeHidden();
            return;
        }

        await expect(this.cartBadge).toHaveText(String(expectedCount));
    }

}
