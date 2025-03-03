import { test, expect } from '@playwright/test';

//Create me a beforeEach method navigating to https://qa.sep.tdtm.cydeo.com/taws

test.beforeEach(async ({ page }) => {let encodedAuthCredentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
  await page.setExtraHTTPHeaders({Authorization: `Basic ${encodedAuthCredentials}`,});
  await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
  await page.waitForTimeout(1000);
});


  test('Error message for Card number', async ({ page }) => {
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

    //step 3: validate stepper
    //start application circle color
    const paymentPlanPageStep1Circle = page.locator('#stepper1 .step:nth-child(1) .step-circle');
    await expect(paymentPlanPageStep1Circle).toHaveCSS('background-color','rgb(172, 245, 138)' );
    //payment plan circle color
    const paymentPlanPageStep2Circle = page.locator('#stepper1 .step:nth-child(2) .step-circle');
    await expect(paymentPlanPageStep2Circle).toHaveCSS('background-color','rgb(1, 201, 255)');
    //review circle color
    const paymentPlanPageStep3Circle = page.locator('#stepper1 .step:nth-child(3) .step-circle');
    // await expect(paymentPlanPageStep3Circle).toHaveCSS('background-color', 'rgb(73, 80, 87)');

    //step 4: payment plan

    let paymentPlanText = page.locator("//p[contains(text(),'Choose a payment plan')]");
    await expect(paymentPlanText).toContainText('Choose a payment plan');

    let page2NextButton = page.locator("//button[contains(@class,'next-button') and text()='Next']");
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

    //step 3: Review page stepper
    //start application circle color
    const reviewPageStep1Circle = page.locator('#stepper1 .step:nth-child(1) .step-circle');
    await expect(reviewPageStep1Circle).toHaveCSS('background-color','rgb(172, 245, 138)');
    //payment plan circle color
    const reviewPageStep2Circle = page.locator('#stepper1 .step:nth-child(2) .step-circle');
    await expect(reviewPageStep2Circle).toHaveCSS('background-color','rgb(172, 245, 138)');
    //review circle color
    const reviewPageStep3Circle = page.locator('#stepper1 .step:nth-child(3) .step-circle');
    await expect(reviewPageStep3Circle).toHaveCSS('background-color','rgb(1, 201, 255)');

    //step 5: locate iframe field
    let paymentFrame = page.frameLocator("//iframe[@title='Secure payment input frame']");
    let cardNumberField = paymentFrame.locator("//input[@id='Field-numberInput']");
    let expirateDateField = paymentFrame.locator("//input[@id='Field-expiryInput']");
    let cvcField = paymentFrame.locator("//input[@id='Field-cvcInput']");
    let countryDropdown = paymentFrame.locator("//button[@id='Field-countryInput']");
    let zipCodeField = paymentFrame.locator("//input[@id='Field-postalCodeInput']");

    //step 6: select checkbox
    let termsAndConditionsCheckbox = page.locator("//input[@id='defaultCheck2']");
    await termsAndConditionsCheckbox.check();

    //step 7: click on Pay button
    let payButton = page.locator("//button[contains(@class, 'next-button') and contains(., 'Pay')]");
    await payButton.click();

    //step 8: validate payment field Error messages
    let cardNumberErrorMessage = paymentFrame.locator("//p[contains(text(), 'Your card number is incomplete.')]");
    await expect(cardNumberErrorMessage).toContainText('Your card number is incomplete.');

    let expirateDateFieldErrorMessage = paymentFrame.locator("//p[contains(text(), 'expiration date is incomplete.')]");
    await expect(expirateDateFieldErrorMessage).toContainText('expiration date is incomplete.');

    let cvcFieldErrorMessage = paymentFrame.locator("//p[contains(text(),'security code is incomplete.')]");
    await expect(cvcFieldErrorMessage).toContainText('security code is incomplete.');

    let zipCodeFieldErrorMessage = paymentFrame.locator("//p[contains(text(),'Your ZIP is invalid.')]");
    await expect(zipCodeFieldErrorMessage).toContainText('Your ZIP is invalid.');

    await page.waitForTimeout(3000);

    //step 9: fill iframe field
    await cardNumberField.fill('4242424242424242');
    await expirateDateField.fill('12/25');
    await cvcField.fill('123');
    await zipCodeField.fill('49508');

    //step 10: card frame error messages disappear
     expect(cardNumberErrorMessage).not.toBeVisible;
     expect(expirateDateFieldErrorMessage).not.toBeVisible;
     expect(cvcFieldErrorMessage).not.toBeVisible;
     expect(zipCodeFieldErrorMessage).not.toBeVisible;

    //step 11:
    await payButton.click();

    await page.waitForTimeout(5000);
  });