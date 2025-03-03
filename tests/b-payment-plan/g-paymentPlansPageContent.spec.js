import { test, expect } from '@playwright/test';

//Create me a beforeEach method navigating to https://qa.sep.tdtm.cydeo.com/taws

test.beforeEach(async ({ page }) => {let encodedAuthCredentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
  await page.setExtraHTTPHeaders({Authorization: `Basic ${encodedAuthCredentials}`,});
  await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
  await page.waitForTimeout(1000);
});


  test('Payment Plan Page Content', async ({ page }) => {
    let firstNameInput = page.locator("//input[@formcontrolname='firstName']");
    let lastNameInput = page.locator("//input[@formcontrolname='lastName']");
    let emailInput = page.locator("//input[@formcontrolname='email']");
    let phoneInput = page.locator("//input[@formcontrolname='phoneNumber']");
    let nextButton = page.locator("//button[@class='next-button']");

    // Step 1: Fill login credentials
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
    //step 3: validate stepper
    //validate step-1 color
    const paymentPlanPageStep1Circle = page.locator(
      '#stepper1 .step:nth-child(1) .step-circle'
    );
    await expect(paymentPlanPageStep1Circle).toHaveCSS(
      'background-color',
      'rgb(172, 245, 138)'
    );
    //validate step-2 color
    const paymentPlanPageStep2Circle = page.locator(
      '#stepper1 .step:nth-child(2) .step-circle'
    );
    await expect(paymentPlanPageStep2Circle).toHaveCSS(
      'background-color',
      'rgb(1, 201, 255)'
    );
    //validate step-3 color
    const paymentPlanPageStep3Circle = page.locator(
      '#stepper1 .step:nth-child(3) .step-circle'
    );
    // await expect(paymentPlanPageStep3Circle).toHaveCSS('background-color', 'rgb(73, 80, 87)');

    //step 4: payment plan

    let paymentPlanText = page.locator(
      "//p[contains(text(),'Choose a payment plan')]"
    );
    await expect(paymentPlanText).toContainText('Choose a payment plan');

    let page2NextButton = page.locator("//button[contains(@class,'next-button') and text()='Next']" );
    expect(page2NextButton).not.toBeVisible;

    await page.waitForTimeout(500);

    let upFrontPaymentPlan = page.locator("(//mat-expansion-panel-header[@role='button'])[1]");
    await upFrontPaymentPlan.click();

    await page.waitForTimeout(500);

    // Verify that the payment plan option is highlighted with the color #28c9fb
    //await expect(upFrontPaymentPlan).toHaveCSS('border', 'rgb(40, 201, 251)');

    expect(page2NextButton).toBeVisible;

    await page.waitForTimeout(500);

    await page2NextButton.click();

    await page.waitForTimeout(500);

    //step 3: validate stepper
    //validate step-1 color
    const submittingPaymentPageStep1Circle = page.locator('#stepper1 .step:nth-child(1) .step-circle' );
    await expect(submittingPaymentPageStep1Circle).toHaveCSS('background-color', 'rgb(172, 245, 138)' );
    //validate step-2 color
    const submittingPaymentPpagestep2Circle = page.locator( '#stepper1 .step:nth-child(2) .step-circle' );
    await expect(submittingPaymentPpagestep2Circle).toHaveCSS( 'background-color', 'rgb(172, 245, 138)' );

    //validate step-3 color
   // const submittingPaymentPpagestep3Circle = page.locator('#stepper1 .step:nth-child(2) .step-circle');
   // await expect(submittingPaymentPpagestep3Circle).toHaveCSS( 'background-color', 'rgb(1, 201, 255)' );

    await page.waitForTimeout(500);
  });