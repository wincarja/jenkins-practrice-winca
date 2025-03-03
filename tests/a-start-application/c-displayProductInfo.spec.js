import { test, expect } from '@playwright/test';

//Create me a beforeEach method navigating to https://qa.sep.tdtm.cydeo.com/taws

test.beforeEach(async ({ page }) => {let encodedAuthCredentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
  await page.setExtraHTTPHeaders({Authorization: `Basic ${encodedAuthCredentials}`,});
  await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
  await page.waitForTimeout(1000);
});


 test('Product Landing Page', async ({ page }) => {
   // Step 1: Verify the text "Secure Checkout" is displayed.
   const secureCheckoutText = page.locator('//div//p[contains(text(),"Secure checkout")]' );
   await expect(secureCheckoutText).toBeVisible();

   // Step 2: Verify the program name "Test Automation with Selenium" is displayed
   const programNameText = page.locator('//a[contains(text()," Test Automation with Selenium")]' );
   await expect(programNameText).toBeVisible();

   // Step 3: Verify footer content on the left side
   const cydeoLogo = page.locator("//a[@href='https://cydeo.com']");
   await expect(cydeoLogo).toBeVisible();

   const termsAndConditionsLink = page.locator("//a[contains(text(),'Terms and conditions')]" );
   await expect(termsAndConditionsLink).toBeVisible();

   const privacyPolicyLink = page.locator("//a[contains(text(),'Privacy Policy')]");
   await expect(privacyPolicyLink).toBeVisible();

   const disclaimerLink = page.locator("//a[contains(text(),'Disclaimer')]");
   await expect(disclaimerLink).toBeVisible();

   const cookiePolicyLink = page.locator("//a[contains(text(),'Cookie Policy')]");
   await expect(cookiePolicyLink).toBeVisible();

 });