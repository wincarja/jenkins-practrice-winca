import { test, expect } from '@playwright/test';

//Create me a beforeEach method navigating to https://qa.sep.tdtm.cydeo.com/taws

test.beforeEach(async ({ page }) => {let encodedAuthCredentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
  await page.setExtraHTTPHeaders({Authorization: `Basic ${encodedAuthCredentials}`,});
  await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
  await page.waitForTimeout(1000);
});


  test('Validate Product Landing page Steppers', async ({ page }) => {
    // Validate the page displays steps
    const stepperLocator = page.locator("//div[@class='stepper']");
    expect(await stepperLocator.isVisible()).toBeTruthy();

    // Validate step titles
    const step1TitleLocator = page.locator(
      "//div[contains(text(),'Start Application')]"
    );
    await expect(step1TitleLocator).toContainText('Start Application');

    const step2TitleLocator = page.locator(
      "//div[contains(text(),'Payment plan')]"
    );
    await expect(step2TitleLocator).toContainText('Payment plan');

    const step3TitleLocator = page.locator("//div[contains(text(),'Review')]");
    await expect(step3TitleLocator).toContainText('Review');

    //validate step-1 color
    const step1Circle = page.locator(
      '#stepper1 .step:nth-child(1) .step-circle'
    );
    await expect(step1Circle).toHaveCSS('background-color', 'rgb(1, 201, 255)');
    //validate step-2 color
    const step2Circle = page.locator(
      '#stepper1 .step:nth-child(2) .step-circle'
    );
    // await expect(step2Circle).toHaveCSS(  'background-color', 'rgb(209, 231, 221)' );
    // validate step-3 color
    const step3Circle = page.locator(
      '#stepper1 .step:nth-child(3) .step-circle'
    );
    // await expect(step3Circle).toHaveCSS('background-color', 'rgb(73, 80, 87)' );

    
  });