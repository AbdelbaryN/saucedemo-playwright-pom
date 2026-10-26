import { expect, test } from '../fixtures';

// Add to cart Cases

test.describe('Add to cart cases', () => {

    test("Add product to cart", async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.expectCartCount(1);
    });

    test("Remove product from cart", async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await inventoryPage.removeProductFromCart('Sauce Labs Bike Light');
        await inventoryPage.expectCartCount(0);
    });

    test("Add multiple products to cart", async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
        await inventoryPage.expectCartCount(4);
    });

    test("Verify 'Remove' button appears after adding product to cart", async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.expectRemoveButtonVisible('Sauce Labs Backpack');
    });

});

test.describe('Inventory sorting', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('sorts products by name from A to Z', async ({ inventoryPage }) => {
        await expect(inventoryPage.productNames.first()).toBeVisible();
        const expectedNames = (await inventoryPage.productNames.allTextContents()).sort((a, b) => a.localeCompare(b));

        await inventoryPage.sortProducts('az');

        await expect(inventoryPage.productNames).toHaveText(expectedNames);
    });

    test('sorts products by name from Z to A', async ({ inventoryPage }) => {
        await expect(inventoryPage.productNames.first()).toBeVisible();
        const expectedNames = (await inventoryPage.productNames.allTextContents()).sort((a, b) => b.localeCompare(a));

        await inventoryPage.sortProducts('za');

        await expect(inventoryPage.productNames).toHaveText(expectedNames);
    });

    test('sorts products by price from low to high', async ({ inventoryPage }) => {
        await expect(inventoryPage.productPrices.first()).toBeVisible();
        const expectedPrices = (await inventoryPage.productPrices.allTextContents())
            .sort((a, b) => Number(a.replace('$', '')) - Number(b.replace('$', '')));

        await inventoryPage.sortProducts('lohi');

        await expect(inventoryPage.productPrices).toHaveText(expectedPrices);
    });

    test('sorts products by price from high to low', async ({ inventoryPage }) => {
        await expect(inventoryPage.productPrices.first()).toBeVisible();
        const expectedPrices = (await inventoryPage.productPrices.allTextContents())
            .sort((a, b) => Number(b.replace('$', '')) - Number(a.replace('$', '')));

        await inventoryPage.sortProducts('hilo');

        await expect(inventoryPage.productPrices).toHaveText(expectedPrices);
    });
});
