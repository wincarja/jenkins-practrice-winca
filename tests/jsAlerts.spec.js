import { expect, test } from '@playwright/test';

test.describe('Test Group', () => {
  //create beforeEach that navigates to https://practice.cydeo.com/
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.cydeo.com/javascript_alerts');
  });

  //create afterEach that waits for 3 seconds after each test
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
  });

  
  test('Regular Alert @regularAlert', async ({ page }) => {
    page.on('dialog', async (alert) => {
      console.log(`Alert Message: ${alert.message()}`);
      // await page.waitForTimeout(2000);
      await alert.accept();
    });

    let regularAlertButton = page.locator("//button[@onclick='jsAlert()']");
    regularAlertButton.click();

    let successMessageElement = page.locator("//p[@id='result']");
    expect(successMessageElement).toHaveText(
      'You successfully clicked an alert'
    );
  });



  test('Confirmation Alert', async ({ page }) => {

    page.on('dialog', async (alert) => {
      console.log(`Alert Message: ${alert.message()}`);
      // await page.waitForTimeout(2000);
      await alert.dismiss();
    });

    let confirmationAlertButton = page.locator("//button[@onclick='jsConfirm()']");
    confirmationAlertButton.click();

    let successMessageElement = page.locator("//p[@id='result']");
    expect(successMessageElement).toHaveText('You clicked: Cancel');

  });
  


  test('Prompt Alert', async ({ page }) => {

  page.on('dialog', async (alert) => {
    console.log(`Alert Message: ${alert.message()}`);
    // await page.waitForTimeout(2000);
    await alert.accept("CYDEO");
  });

    let promptAlertButton = page.locator("//button[@onclick='jsPrompt()']");
    promptAlertButton.click();

    let successMessageElement = page.locator("//p[@id='result']");
    expect(successMessageElement).toHaveText('You entered: CYDEO');
  });
});
