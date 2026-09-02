import {expect, test} from '../fixtures';

test.describe('Checkout cases', () => {
    test('Verify that the checkout page appear after clicking the checkout button', async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await cartPage.openCart();
        await cartPage.clickCheckout();
        await expect(cartPage.page).toHaveURL(/checkout-step-one.html/);
    });
    test('Verify that the checkout information can be filled and continue to the next step', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await cartPage.openCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await expect(checkoutPage.page).toHaveURL(/checkout-step-two.html/);
    });
    test('Verify that the checkout can be completed successfully', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await cartPage.openCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();
        await expect(checkoutPage.page).toHaveURL(/checkout-complete.html/);
    });
    test('Verify that the checkout can be canceled and return to the inventory page', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await cartPage.openCart();
        await cartPage.clickCheckout();
        await checkoutPage.cancelCheckout();
        await expect(checkoutPage.page).toHaveURL(/cart.html/);
    });

    test('Verify that the success message is displayed after completing the checkout', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await cartPage.openCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();
        const successMessage = await checkoutPage.successMessage();
        await expect(successMessage).toContain('Thank you for your order');
    });

    test('Verify that the item names and prices are displayed correctly on the checkout page', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');        
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await cartPage.openCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        const itemNames = await checkoutPage.getItemNames();
        const itemPrices = await checkoutPage.getItemPrices();
        expect(itemNames).toContain('Sauce Labs Backpack');
        expect(itemNames).toContain('Sauce Labs Bike Light');
        expect(itemPrices).toContain('$29.99');
        expect(itemPrices).toContain('$9.99');
    });
    test('Verify that the items in the checkout page match the items in the cart', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');        
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await cartPage.openCart();
        const cartItems = await cartPage.getCartItems();
        const cartPrices = await cartPage.getCartPrices();
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        const checkoutItems = await checkoutPage.getItemNames();
        const checkoutPrices = await checkoutPage.getItemPrices();
        expect(checkoutItems).toEqual(cartItems);
        expect(checkoutPrices).toEqual(cartPrices);
    });
});