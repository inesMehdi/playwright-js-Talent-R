const config = require('../playwright.config');
const {test, expect} = require('@playwright/test');
require('dotenv').config();

test('Login test', async ({page}) => {
    await page.goto(config.use.baseURL);
    await expect(page.getByTestId('session-tab-login')).toBeVisible();
    await page.getByTestId('login-field-email').fill(process.env.LOGIN_USERNAME);
    await page.getByTestId('login-field-password').fill(process.env.LOGIN_PASSWORD);
    const loginButton = page.locator('button[data-testid="login-button-submit"]');
    await expect(loginButton).toBeEnabled();
    await loginButton.click();
    await page.waitForURL(config.use.baseURL);
    await expect(page.getByText('Mes informations')).toBeVisible();
    await page.locator('button[id="axeptio_btn_acceptAll"]').click();

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator('svg[alt="Edit"]').click(),
    ])

    await fileChooser.setFiles(['./data/profile.jpg'])
    await page.locator('button[data-testid="account-edit-button-submit"]').click();
    await page.waitForSelector('[class = "sc-cwSeag sc-dkKxlM dKuxmH sc-iWOQzb jqwbJB"]');
    await page.close();
});

