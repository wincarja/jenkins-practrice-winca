import { test } from '@playwright/test';

test.describe('Test Group', () => {
  //create beforeEach that navigates to https://practice.cydeo.com/
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.cydeo.com/');
  });
  //create afterEach that waits for 3 seconds after each test
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
  });

  test('innerText()', async ({ page }) => {
    let pageHeaderElement = page.locator("//h1/span[@class='h1y']");
    let pageHeaderText = await pageHeaderElement.innerText();
    console.log(pageHeaderText);
  });

  test('inputValue(): only works with <input>, <textarea>, <select>, retrives the input value', async ({
    page,
  }) => {
    let inputElement = page.locator("//a[@href='/inputs']");
    await inputElement.click();

    let inputField = page.locator("//input[@type='number']");
    await inputField.fill('123');

    let actualInputValue = await inputField.inputValue();
    console.log(actualInputValue);
  });

  test('getAttribute(): retrieves the attribute value', async ({ page }) => {
    let webElement = page.locator("//a[@href='/abtest']");
    let hrefLink = await webElement.getAttribute('href');
    console.log(hrefLink);
  });
});
