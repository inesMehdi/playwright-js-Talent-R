// @ts-check
const {test, expect} = require('@playwright/test');

test('Login test', async ({page}) => {
    await page.goto('https://www.welcometothejungle.com/fr/me/settings/account');
    await page.locator('input[data-testid="login-field-email"]').type("inqom.qaautomationapplicant@gmail.com");
    await page.locator('input[data-testid="login-field-password"]').fill("o5N,d5ZR@R7^");
    await page.waitForSelector('button[data-testid="login-button-submit"]');
    await page.locator('button[data-testid="login-button-submit"]').click();
    await page.waitForURL('https://www.welcometothejungle.com/fr/me/settings/account');
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

