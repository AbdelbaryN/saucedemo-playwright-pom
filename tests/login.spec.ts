import { test, expect } from '../fixtures';

test.describe('Login', () => {


    test('valid credentials logs in', async ({ page, loginPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.getByText('Products')).toBeVisible();
    });

    test('invalid username shows error', async ({ loginPage }) => {
        await loginPage.login('err', 'secret_sauce');

        await loginPage.expectErrorMessage('do not match');
    });

    test('login with lockedout user', async ({ loginPage }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await loginPage.expectErrorMessage('locked out');
    });

    test('login with empty credentials shows error', async ({ loginPage }) => {
        await loginPage.login('', '');

        await loginPage.expectErrorMessage('Username is required');
    });
});