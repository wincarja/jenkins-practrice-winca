import { test, expect } from '@playwright/test';

//Create me a beforeEach method navigating to https://qa.sep.tdtm.cydeo.com/taws

test.beforeEach(async ({ page }) => {let encodedAuthCredentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
  await page.setExtraHTTPHeaders({Authorization: `Basic ${encodedAuthCredentials}`,});
  await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
  await page.waitForTimeout(1000);
});

test.describe('Test Group', () => {

  test('Login with blank fields Error', async ({ page }) => {
    let nextButton = page.locator("//button[@class='next-button']");

    let firstNameFieldLabel = page.locator(
      "//label[@id='mat-mdc-form-field-label-0']"
    );
    let lastNameFieldLabel = page.locator(
      "//label[@id='mat-mdc-form-field-label-2']"
    );
    let emailFieldLabel = page.locator(
      "//label[@id='mat-mdc-form-field-label-4']"
    );
    let phoneFieldLabel = page.locator(
      "//label[@id='mat-mdc-form-field-label-6']"
    );

    let expectedColor = 'rgb(255, 0, 0)';

    nextButton.click();

    await page.waitForTimeout(3000);

    await expect(firstNameFieldLabel).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(lastNameFieldLabel).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(emailFieldLabel).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(phoneFieldLabel).toHaveCSS('color', 'rgb(255, 0, 0)');
  });

  test('Field Validations', async ({ page }) => {let firstNameInputField = page.locator("//input[@formcontrolname='firstName']" );
    let lastNameInputField = page.locator(      "//input[@formcontrolname='lastName']"    );
    let emailInputField = page.locator("//input[@formcontrolname='email']");
    let phoneInputField = page.locator(      "//input[@formcontrolname='phoneNumber']"    );
    let dropdownField = page.locator(      "//label[@id='mat-mdc-form-field-label-8']"    );
    let nextButton = page.locator("//button[@class='next-button']");

    let firstNameFieldLabel = page.locator(  "//label[@id='mat-mdc-form-field-label-0']"    );
    let lastNameFieldLabel = page.locator(      "//label[@id='mat-mdc-form-field-label-2']"    );
    let emailFieldLabel = page.locator(      "//label[@id='mat-mdc-form-field-label-4']"    );
    let phoneFieldLabel = page.locator(      "//label[@id='mat-mdc-form-field-label-6']"    );
    let expectedColor = 'rgb(255, 0, 0)';

    //Fill login credentials
    firstNameInputField.fill('waqar');
    await page.waitForTimeout(1000);
    lastNameInputField.fill('jan');

    //email field validation
    await page.waitForTimeout(1000);
    await emailInputField.fill('test@example');
    const emailValue = await emailInputField.inputValue(); // Get the email value
    if (emailValue.includes('@') && emailValue.includes('.com')) {
      console.log('Valid email address');
    } else {
      console.log('Invalid email address');
    }

    //phone field validation
    await page.waitForTimeout(2000);
    await phoneInputField.fill('abc');
    let phoneInput = await phoneInputField.inputValue();
    if (phoneInput.includes('') || phoneInput.includes('abc')) {
      console.log('Invalid phone number');
      await page.keyboard.press('Tab');
      await expect(phoneFieldLabel).toHaveCSS('color', 'rgb(255, 0, 0)');
    }

    // Step 2: Click on the "next" button
    await page.waitForTimeout(3000);
    //await nextButton.click().toBe(false);
  });

  test('Login with all fields filled', async ({ page }) => {
    let firstNameInput = page.locator("//input[@formcontrolname='firstName']");
    let lastNameInput = page.locator("//input[@formcontrolname='lastName']");
    let emailInput = page.locator("//input[@formcontrolname='email']");
    let phoneInput = page.locator("//input[@formcontrolname='phoneNumber']");
    let nextButton = page.locator("//button[@class='next-button']");
    // let dropdownButton = page.locator("//label[@id='mat-mdc-form-field-label-8']");
    let howDidYouHearAboutUsDropdown = page.locator("//mat-label[text()='How did you hear about us?']");

    //Fill login credentials
    firstNameInput.fill('waqar');
    await page.waitForTimeout(500);
    lastNameInput.fill('jan');
    await page.waitForTimeout(500);
    emailInput.fill('waqar@cydeo.com');
    await page.waitForTimeout(500);
    phoneInput.fill('9196199929');

    //select dropdown option
    await howDidYouHearAboutUsDropdown.click();
    let emailOption = page.locator("//span[text()='Email']");
    await emailOption.click();
    await page.waitForTimeout(1000);

    // Step 2: Click on the "next" button
    await nextButton.click();

    await page.waitForTimeout(1000);
    //step 3: validate user is navigated to page 2.
    //validate step-1 color
    const step1Circle = page.locator('#stepper1 .step:nth-child(1) .step-circle');
    await expect(step1Circle).toHaveCSS('background-color','rgb(172, 245, 138)');
    //validate step-2 color
    const step2Circle = page.locator('#stepper1 .step:nth-child(2) .step-circle');
    await expect(step2Circle).toHaveCSS('background-color', 'rgb(1, 201, 255)');
    //validate step-3 color
    const step3Circle = page.locator('#stepper1 .step:nth-child(3) .step-circle' );
    // await expect(step3Circle).toHaveCSS('background-color', 'rgb(73, 80, 87)');
    //payment plan text is displayed
    let paymentPlanText = page.locator("//p[contains(text(),'Choose a payment plan')]");
    await expect(paymentPlanText).toContainText('Choose a payment plan');
  });


});