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
        await expect(checkoutPage.thankYouHeaderMessage).toHaveText('Thank you for your order!');
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
        await expect(checkoutPage.thankYouHeaderMessage).toContainText('Thank you for your order');
    });

    test('Verify that the item names and prices are displayed correctly on the checkout page', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');        
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await cartPage.openCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await expect(checkoutPage.itemNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
        await expect(checkoutPage.itemPrices).toHaveText(['$29.99', '$9.99']);
    });
    test('Verify that the items in the checkout page match the items in the cart', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');        
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await cartPage.openCart();
        const cartItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
        const cartPrices = ['$29.99', '$9.99'];
        await expect(cartPage.cartItemName).toHaveText(cartItems);
        await expect(cartPage.cartItemPrice).toHaveText(cartPrices);
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await expect(checkoutPage.itemNames).toHaveText(cartItems);
        await expect(checkoutPage.itemPrices).toHaveText(cartPrices);
    });
});
