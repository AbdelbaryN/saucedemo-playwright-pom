import {expect, test } from '../fixtures';

test.describe('Cart cases', () => {
    test('Verify that the item is added to the cart successfully', async ({ loginPage, inventoryPage, cartPage }) => {
       await loginPage.login('standard_user', 'secret_sauce');
       await inventoryPage.addProductToCart('Sauce Labs Backpack');
       await cartPage.openCart();
       await expect(cartPage.cartItemName).toHaveText(['Sauce Labs Backpack']);
    });
    test("Verify adding multiple items to the cart and verifying their presence", async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await cartPage.openCart();
        await expect(cartPage.cartItemName).toHaveText([
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
        ]);
    });
    test("Verify removing an item from the cart and ensuring it's no longer present", async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await cartPage.openCart();
        await cartPage.removeItemFromCart('Sauce Labs Backpack');
        await expect(cartPage.cartItemName).toHaveText(['Sauce Labs Bike Light']);
    });
    test ("Verify that the cart badge count updates correctly when items are added and removed", async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.expectCartCount(1);
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await inventoryPage.expectCartCount(2);
        await cartPage.openCart();
        await cartPage.removeItemFromCart('Sauce Labs Backpack');
        await inventoryPage.expectCartCount(1);
    });

    test('Verify that the inventory page appear after clicking the continue shopping button', async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await cartPage.openCart();
        await cartPage.clickContinueShopping();
        await expect(inventoryPage.page).toHaveURL(/inventory.html/);
    });

    test('Verify that the checkout page appear after clicking the checkout button', async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await cartPage.openCart();
        await cartPage.clickCheckout();
        await expect(cartPage.page).toHaveURL(/checkout-step-one.html/);
    });
});
