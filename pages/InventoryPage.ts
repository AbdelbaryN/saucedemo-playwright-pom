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
    async getCartCount(): Promise<number> {
        if (await this.cartBadge.count() === 0) return 0;
        return Number(await this.cartBadge.textContent());
    }

}