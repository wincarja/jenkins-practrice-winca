import { test, expect } from '@playwright/test';

//Create me a beforeEach method navigating to https://qa.sep.tdtm.cydeo.com/taws

test.beforeEach(async ({ page }) => {let encodedAuthCredentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
  await page.setExtraHTTPHeaders({Authorization: `Basic ${encodedAuthCredentials}`,});
  await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
  await page.waitForTimeout(1000);
});


  test('Login with mandatory crdentials', async ({ page }) => {
    let firstNameInput = page.locator("//input[@formcontrolname='firstName']");
    let lastNameInput = page.locator("//input[@formcontrolname='lastName']");
    let emailInput = page.locator("//input[@formcontrolname='email']");
    let phoneInput = page.locator("//input[@formcontrolname='phoneNumber']");
    let nextButton = page.locator("//button[@class='next-button']");

    //Fill login credentials
    firstNameInput.fill('waqar');
    await page.waitForTimeout(500);
    lastNameInput.fill('jan');
    await page.waitForTimeout(500);
    emailInput.fill('waqar@cydeo.com');
    await page.waitForTimeout(500);
    phoneInput.fill('9196199929');

    // Step 2: Click on the "next" button
    await nextButton.click();

    await page.waitForTimeout(1000);
    //step 3: validate user is navigated to page 2.
    //validate step-1 color
    const step1Circle = page.locator(
      '#stepper1 .step:nth-child(1) .step-circle'
    );
    await expect(step1Circle).toHaveCSS('background-color','rgb(172, 245, 138)');
    //validate step-2 color
    const step2Circle = page.locator('#stepper1 .step:nth-child(2) .step-circle' );
    await expect(step2Circle).toHaveCSS('background-color', 'rgb(1, 201, 255)');
    //validate step-3 color
    const step3Circle = page.locator('#stepper1 .step:nth-child(3) .step-circle');
    // await expect(step3Circle).toHaveCSS('background-color', 'rgb(73, 80, 87)');
    //payment plan text is displayed
    let paymentPlanText = page.locator("//p[contains(text(),'Choose a payment plan')]");
    await expect(paymentPlanText).toContainText('Choose a payment plan');
  });