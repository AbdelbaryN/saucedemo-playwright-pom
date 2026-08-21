import { expect, test } from '../fixtures';

// Add to cart Cases

test.describe('Add to cart cases', () => {

    test("Add product to cart", async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        expect(await inventoryPage.getCartCount()).toBe(1);
    });

    test("Remove product from cart", async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await inventoryPage.removeProductFromCart('Sauce Labs Bike Light');
        expect(await inventoryPage.getCartCount()).toBe(0);
    });

    test("Add multiple products to cart", async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
        expect(await inventoryPage.getCartCount()).toBe(4);
    });

    test("Verify 'Remove' button appears after adding product to cart", async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.expectRemoveButtonVisible('Sauce Labs Backpack');
    });

});