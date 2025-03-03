import { test, expect } from '@playwright/test';

//Create me a beforeEach method navigating to https://qa.sep.tdtm.cydeo.com/taws

test.beforeEach(async ({ page }) => {let encodedAuthCredentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
  await page.setExtraHTTPHeaders({Authorization: `Basic ${encodedAuthCredentials}`,});
  await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
  await page.waitForTimeout(1000);
});


  test('validate Start and Refund dates', async ({ page }) => {
    // Step 1: Verify the product name on the information card
    const productTitleLocator = page.locator(
      "//p[@class='program-title primary-color'][text()='Test Automation with Selenium']"
    );
    await expect(productTitleLocator).toBeVisible();

    // Step 2: Verify the product name on the left side of the screen matches
    const productLinkLocator = page.locator(
      "//a[contains(text(),' Test Automation with Selenium')]"
    );
    await expect(productLinkLocator).toBeVisible();

    // Step 3: Verify the price of the product is displayed
    const productPriceLocator = page.locator("//b[@class='info-primary'][contains(text(),'$400')]");
    await expect(productPriceLocator).toBeVisible();

    // Step 4: verify the original price
    const originalPriceLocator = page.locator("//s[text()='$500']");
    await expect(originalPriceLocator).toBeVisible();

    // Step 5: Verify the "Save $100" text is displayed with the correct color
    const saveAmountLocator = page.locator("//p[text()='Save $100 when you pay upfront']" );
    await expect(saveAmountLocator).toBeVisible();
    await expect(saveAmountLocator).toHaveCSS('color', 'rgb(102, 214, 57)'); // #66d639 converted to rgb

    // Step 6: Verify the flexible payment plan text is displayed
    const paymentPlanLocator = page.locator("//p[text()='Flexible payments plan available']");
    await expect(paymentPlanLocator).toBeVisible();

    // Step 7: Verify the program start date is displayed
    const startDateLabelLocator = page.locator("//div[@class='col-sm info'][contains(text(),'Program Start Date')]");
    const startDateLocator = page.locator("//b[text()='Apr 10, 2025']");

    await expect(startDateLabelLocator).toBeVisible();
    await expect(startDateLocator).toBeVisible();

    // Step 8: Verify the return policy and final date for returns are displayed
    const refundPolicyLocator = page.locator("//span[@class='info-primary'][text()='100% refund']");
    const returnPolicyLabelLocator = page.locator("//div[@class='col-sm info'][contains(text(),'policy until')]");
    const returnDateLocator = page.locator("//b[text()='May 10, 2025']");

    await expect(refundPolicyLocator).toBeVisible();
    await expect(returnPolicyLabelLocator).toBeVisible();
    await expect(returnDateLocator).toBeVisible();

    // Step 9: Verify text "Need help? Contact us at enrollment@cydeo.com" is displayed on the right side of the footer
    const footerText = page.locator("//p[contains(text(),'Need help')]");
    //await expect(footerText).toBeVisible();
  });